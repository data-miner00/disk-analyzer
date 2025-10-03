use serde::{Deserialize, Serialize};
use sysinfo::{Disks, System};
use std::sync::Mutex;
use std::{error::Error, io};
use std::fs;
use std::ops::{Add, Sub, Mul};
use std::convert::Into;
use std::collections::{HashMap, HashSet};
use serde_json::json;
use tauri::{Builder, Manager, State};
use tauri::{
  menu::{Menu, MenuItem},
  tray::TrayIconBuilder,
};

#[derive(Default)]
struct AppState {
    counter: u32,
    disks: Vec<DiskInfo>,
}

impl AppState {
    fn new(counter: u32, disks: Vec<DiskInfo>) -> Self {
        Self {
            counter,
            disks,
        }
    }
}

#[derive(Debug, Serialize, Deserialize, Clone)]
enum ReportType {
    AvailableSpace,
    UsedSpace,
    UsedSpacePct,
    ChangeInUsedSpace,
    ChangeInUsedSpacePct,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct Report<T>
where T: Add<Output = T> + Mul<Output = T> + Copy, {
    report_type: ReportType,
    data: Vec<LayerChartReportData<T>>,
    container_config: HashMap<String, LayerChartContainerConfigItem>,
    chart_config: Vec<LayerChartConfigItem>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct LayerChartReportData<T>
where T: Add<Output = T> + Mul<Output = T> + Copy, {
    date: String,
    values: HashMap<String, T>
}

impl<T> LayerChartReportData<T>
where T: Add<Output = T> + Mul<Output = T> + Copy, {
    pub fn empty(date: String) -> Self {
        Self::new(date, HashMap::new())
    }

    pub fn new(date: String, values: HashMap<String, T>) -> Self {
        Self {
            date,
            values,
        }
    }
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct LayerChartConfigItem {
    key: String,
    label: String,
    color: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct LayerChartContainerConfigItem {
    label: String,
    color: String,
}

trait DiskInfoRepository {
    fn get_all_disks(&self) -> Result<Vec<DiskDto>, Box<dyn Error>>;
    fn add_disk(&mut self, disk: DiskDto) -> Result<(), Box<dyn Error>>;
    fn add_disks(&mut self, disks: Vec<DiskDto>) -> Result<(), Box<dyn Error>>;
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct DiskInfo {
    name: String,
    total_space: u64,
    available_space: u64,
    file_system: String,
    is_removable: bool,
    is_read_only: bool,
    kind: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct DiskDto {
    id: u32,
    name: String,
    available_space: u64,
    date: String,
}

struct CsvDiskInfoRepository {
    disks: Vec<DiskDto>,
    file_path: String,
}

impl CsvDiskInfoRepository {
    fn new(file_path: String) -> Self {
        Self {
            disks: Vec::new(),
            file_path,
        }
    }

    fn init(&self) -> Result<(), io::Error> {
        if !std::path::Path::new(&self.file_path).exists() {
            fs::File::create(&self.file_path)?;
        }
        Ok(())
    }
}

impl DiskInfoRepository for CsvDiskInfoRepository {
    fn get_all_disks(&self) -> Result<Vec<DiskDto>, Box<dyn Error>> {
        let mut results: Vec<DiskDto> = Vec::new();
        let mut rdr = csv::Reader::from_reader(fs::File::open(&self.file_path)?);
        for result in rdr.deserialize() {
            let record: DiskDto = result?;
            results.push(record);
        }

        Ok(results)
    }

    fn add_disk(&mut self, disk: DiskDto) -> Result<(), Box<dyn Error>> {
        self.disks.append(&mut self.get_all_disks()?);
        self.disks.push(disk);
        let mut wtr = csv::Writer::from_writer(fs::File::create(&self.file_path)?);
        for disk in &self.disks {
            wtr.serialize(disk)?;
        }
        wtr.flush()?;
        Ok(())
    }

    fn add_disks(&mut self, disks: Vec<DiskDto>) -> Result<(), Box<dyn Error>> {
        self.disks.append(&mut self.get_all_disks()?);
        self.disks.extend(disks);
        let mut wtr = csv::Writer::from_writer(fs::File::create(&self.file_path)?);
        for disk in &self.disks {
            wtr.serialize(disk)?;
        }
        wtr.flush()?;
        Ok(())
    }
}

impl DiskInfo {
    fn from_disk(disk: &sysinfo::Disk) -> Self {
        let name = if disk.name().to_string_lossy().is_empty() {
            "Unnamed".to_string()
        } else {
            disk.name().to_string_lossy().into_owned()
        };

        Self {
            name: name,
            total_space: disk.total_space(),
            available_space: disk.available_space(),
            file_system: disk.file_system().to_str().unwrap_or_default().to_string(),
            is_removable: disk.is_removable(),
            is_read_only: disk.is_read_only(),
            kind: disk.kind().to_string(),
        }
    }
}

#[tauri::command]
fn aggregate_disk_available_space_history() -> Report<u64> {
    let disk_history = read_disk_dtos(Some(20));
    let distinct_disks: HashSet<_> = disk_history.iter().map(|record| record.name.clone()).collect();
    let distinct_disks: Vec<String> = distinct_disks.into_iter().collect();
    let mut aggregated_data: Vec<LayerChartReportData<u64>> = vec![];
    let mut container_config: HashMap<String, LayerChartContainerConfigItem> = HashMap::new();
    let mut chart_config: Vec<LayerChartConfigItem> = Vec::new();
    let mut counter = 1; // Start with 1 because the CSS starts with 1

    for disk_name in distinct_disks {
        let relevant_history: Vec<DiskDto> = disk_history.iter().filter(|record| record.name == disk_name).cloned().collect();
        let id_disk_name = disk_name.to_lowercase().replace(" ", "_");
        let distinct_days: HashSet<_> = relevant_history.iter().map(|record| record.date.clone()).collect();
        let distinct_days: Vec<String> = distinct_days.into_iter().collect();

        for day in distinct_days {
            if let Some(current_agg) = aggregated_data.iter_mut().find(|data| data.date == day) {
                if let Some(history) = relevant_history.iter().find(|data| data.date == day) {
                    current_agg.values.insert(id_disk_name.clone(), history.available_space);
                }
            } else {
                let mut new_entry = LayerChartReportData::empty(day.clone());
                if let Some(history) = relevant_history.iter().find(|data| data.date == day) {
                    new_entry.values.insert(id_disk_name.clone(), history.available_space);
                }
                aggregated_data.push(new_entry)
            }
        }

        container_config.insert(id_disk_name.clone(), LayerChartContainerConfigItem {
            label: disk_name.clone(),
            color: format!("var(--chart-{})", counter),
        });

        chart_config.push(LayerChartConfigItem {
            key: id_disk_name,
            label: disk_name,
            color: format!("var(--chart-{})", counter),
        });

        counter += 1;
    }

    Report::<u64> {
        report_type: ReportType::AvailableSpace,
        data: aggregated_data,
        container_config,
        chart_config,
    }
}

#[tauri::command]
fn aggregate_disk_usage_history(state: State<'_, Mutex<AppState>>) -> Report<u64> {
    let state = state.lock().unwrap();
    let disk_history = read_disk_dtos(Some(20));
    let distinct_disks: HashSet<_> = disk_history.iter().map(|record| record.name.clone()).collect();
    let distinct_disks: Vec<String> = distinct_disks.into_iter().collect();
    let mut aggregated_data: Vec<LayerChartReportData<u64>> = vec![];
    let mut container_config: HashMap<String, LayerChartContainerConfigItem> = HashMap::new();
    let mut chart_config: Vec<LayerChartConfigItem> = Vec::new();
    let mut counter = 1; // Start with 1 because the CSS starts with 1

    for disk_name in distinct_disks {
        let relevant_history: Vec<DiskDto> = disk_history.iter().filter(|record| record.name == disk_name).cloned().collect();
        let id_disk_name = disk_name.to_lowercase().replace(" ", "_");
        let distinct_days: HashSet<_> = relevant_history.iter().map(|record| record.date.clone()).collect();
        let distinct_days: Vec<String> = distinct_days.into_iter().collect();
        let disk_general_info: Option<&DiskInfo> = state.disks.iter().find(|info| disk_name.starts_with(&info.name));

        for day in distinct_days {
            if let Some(current_agg) = aggregated_data.iter_mut().find(|data| data.date == day) {
                if let Some(history) = relevant_history.iter().find(|data| data.date == day) {
                    if let Some(info) = disk_general_info {
                        current_agg.values.insert(id_disk_name.clone(), info.total_space - history.available_space);
                    }
                }
            } else {
                let mut new_entry = LayerChartReportData::empty(day.clone());
                if let Some(history) = relevant_history.iter().find(|data| data.date == day) {
                    if let Some(info) = disk_general_info {
                        new_entry.values.insert(id_disk_name.clone(), info.total_space - history.available_space);
                    }
                }
                aggregated_data.push(new_entry)
            }
        }

        container_config.insert(id_disk_name.clone(), LayerChartContainerConfigItem {
            label: disk_name.clone(),
            color: format!("var(--chart-{})", counter),
        });

        chart_config.push(LayerChartConfigItem {
            key: id_disk_name,
            label: disk_name,
            color: format!("var(--chart-{})", counter),
        });

        counter += 1;
    }

    Report::<u64> {
        report_type: ReportType::UsedSpace,
        data: aggregated_data,
        container_config,
        chart_config,
    }
}

#[tauri::command]
fn aggregate_disk_usage_pct_history(state: State<'_, Mutex<AppState>>) -> Report<f64> {
    let state = state.lock().unwrap();
    let disk_history = read_disk_dtos(Some(20));
    let distinct_disks: HashSet<_> = disk_history.iter().map(|record| record.name.clone()).collect();
    let distinct_disks: Vec<String> = distinct_disks.into_iter().collect();
    let mut aggregated_data: Vec<LayerChartReportData<f64>> = vec![];
    let mut container_config: HashMap<String, LayerChartContainerConfigItem> = HashMap::new();
    let mut chart_config: Vec<LayerChartConfigItem> = Vec::new();
    let mut counter = 1; // Start with 1 because the CSS starts with 1

    for disk_name in distinct_disks {
        let relevant_history: Vec<DiskDto> = disk_history.iter().filter(|record| record.name == disk_name).cloned().collect();
        let id_disk_name = disk_name.to_lowercase().replace(" ", "_");
        let distinct_days: HashSet<_> = relevant_history.iter().map(|record| record.date.clone()).collect();
        let distinct_days: Vec<String> = distinct_days.into_iter().collect();
        let disk_general_info: Option<&DiskInfo> = state.disks.iter().find(|info| disk_name.starts_with(&info.name));

        for day in distinct_days {
            if let Some(current_agg) = aggregated_data.iter_mut().find(|data| data.date == day) {
                if let Some(history) = relevant_history.iter().find(|data| data.date == day) {
                    if let Some(info) = disk_general_info {
                        current_agg.values.insert(id_disk_name.clone(), ((info.total_space - history.available_space) as f64) / (info.total_space as f64) * 100f64);
                    }
                }
            } else {
                let mut new_entry = LayerChartReportData::empty(day.clone());
                if let Some(history) = relevant_history.iter().find(|data| data.date == day) {
                    if let Some(info) = disk_general_info {
                        new_entry.values.insert(id_disk_name.clone(), ((info.total_space - history.available_space) as f64) / (info.total_space as f64) * 100f64);
                    }
                }
                aggregated_data.push(new_entry)
            }
        }

        container_config.insert(id_disk_name.clone(), LayerChartContainerConfigItem {
            label: disk_name.clone(),
            color: format!("var(--chart-{})", counter),
        });

        chart_config.push(LayerChartConfigItem {
            key: id_disk_name,
            label: disk_name,
            color: format!("var(--chart-{})", counter),
        });

        counter += 1;
    }

    Report::<f64> {
        report_type: ReportType::UsedSpacePct,
        data: aggregated_data,
        container_config,
        chart_config,
    }
}

#[tauri::command]
fn read_disk_dtos(count: Option<i32>) -> Vec<DiskDto> {
    let repo = CsvDiskInfoRepository::new("disks.csv".to_string());

    if let Err(_) = repo.init() {
        return vec![];
    }

    if let Ok(disks) = repo.get_all_disks() {
        let size = disks.len();

        return match count {
            Some(n) if n > 0 => disks.into_iter().rev().take(n as usize).rev().collect(),
            Some(n) if n < 0 => disks.into_iter().skip(size.saturating_sub((-n) as usize)).collect(),
            _ => disks,
        };
    }

    vec![]
}

#[tauri::command]
fn add_disk_dto(disk: DiskDto) {
    let mut repo = CsvDiskInfoRepository::new("disks.csv".to_string());
    if let Err(_) = repo.init() {
        return;
    }

    if let Err(_) = repo.add_disk(disk) {
        return;
    }
}

#[tauri::command]
fn add_disk_dtos(disks: Vec<DiskDto>) {
    let mut repo = CsvDiskInfoRepository::new("disks.csv".to_string());
    if let Err(_) = repo.init() {
        return;
    }

    if let Err(_) = repo.add_disks(disks) {
        return;
    }
}

#[tauri::command]
fn get_disks() -> Vec<DiskInfo> {
    let mut sys = System::new_all();

    sys.refresh_all();

    Disks::new_with_refreshed_list()
        .iter()
        .map(|disk| DiskInfo::from_disk(disk))
        .collect()
}

#[tauri::command]
fn get_disks_rust(state: State<'_, Mutex<AppState>>) -> Vec<DiskInfo> {
    let state = state.lock().unwrap();

    state.disks.clone()
}

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn hostname() -> String {
    match System::host_name() {
        Some(name) => name,
        None => "Unknown".to_string(),
    }
}

#[tauri::command]
fn folder_size(path: &str) -> u64 {
    let mut size = 0;
    if let Ok(entries) = std::fs::read_dir(path) {
        for entry in entries.flatten() {
            let path = entry.path();
            if path.is_file() {
                if let Ok(metadata) = std::fs::metadata(&path) {
                    size += metadata.len();
                }
            } else if path.is_dir() {
                size += folder_size(&path.to_string_lossy());
            }
        }
    }
    size
}

#[tauri::command]
fn exit(code: i32) {
    std::process::exit(code);
}

#[tauri::command]
fn open_file_explorer(path: &str) {
    let res = tauri_plugin_opener::open_path(path, None::<&str>);

    if let Err(e) = res {
        eprintln!("Failed to open path {}: {}", path, e);
    }
}

#[tauri::command]
fn increment_counter(state: State<'_, Mutex<AppState>>) -> u32 {
    let mut state = state.lock().unwrap();
    state.counter += 1;
    state.counter
}

#[tauri::command]
fn get_counter(state: State<'_, Mutex<AppState>>) -> u32 {
    let state = state.lock().unwrap();
    state.counter
}

#[tauri::command]
fn calculate_size_by_file_type(folder_path: String) -> HashMap<String, u64> {
    let mut store = HashMap::<String, u64>::new();
    let read_dir = std::fs::read_dir(folder_path);

    if let Ok(entries) = read_dir {
        for entry in entries.flatten() {
            let path = entry.path();
            if path.is_file() {
                let size = match fs::metadata(&path) {
                    Ok(metadata) => metadata.len(),
                    Err(_) => continue,
                };

                let ext = path.extension()
                    .and_then(|n| n.to_str())
                    .unwrap_or("others")
                    .to_string();

                *store.entry(ext).or_insert(0) += size;
            }
        }
    }

    store
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    Builder::default()
        .setup(|app| {
            app.manage(Mutex::new(AppState::new(0, get_disks())));

            let quit_i = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
            let menu = Menu::with_items(app, &[&quit_i])?;

            let tray = TrayIconBuilder::new()
                .menu(&menu)
                .menu_on_left_click(false)
                .icon(app.default_window_icon().unwrap().clone())
                .on_menu_event(|app, event| match event.id.as_ref() {
                    "quit" => {
                        println!("quit menu item was clicked");
                        app.exit(0);
                    }
                    _ => {
                        println!("menu item {:?} not handled", event.id);
                    }
                })
                .build(app)?;

            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            get_disks,
            get_disks_rust,
            hostname,
            folder_size,
            read_disk_dtos,
            add_disk_dto,
            add_disk_dtos,
            exit,
            open_file_explorer,
            increment_counter,
            get_counter,
            aggregate_disk_available_space_history,
            aggregate_disk_usage_history,
            aggregate_disk_usage_pct_history,
            calculate_size_by_file_type,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn to_percentage<T>(amount: T, total: T) -> f64
where T: Add<Output = T> + Mul<Output = T> + Copy + Into<f64> {
    amount.clone().into() / total.clone().into() * 100f64
}

fn read_msg() {
    let mut message: String = String::new();
    println!("Enter message: ");

    let _ = std::fs::OpenOptions::new().read(true).open(message.clone());

    std::io::stdin().read_line(&mut message).unwrap();

    println!("Your message is: {message}");
}

/// Adds two numbers
/// 
/// # Arguments
/// 
/// * `a` - A 32 bit integer
/// * `b` - A 32 bit integer
/// 
/// Examples
/// ```
/// use disk_analyzer_lib::add;
/// let ans = add(1, 2);
/// assert_eq!(ans, 3);
/// ```
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

mod tests {
    #[test]
    fn test_greet() {
        let greeting = super::greet("World");
        assert_eq!(greeting, "Hello, World! You've been greeted from Rust!");
    }

    #[test]
    fn test_hostname() {
        let name = super::hostname();
        assert!(!name.is_empty());
    }

    #[test]
    fn test_to_percentage() {
        let actual = super::to_percentage(45, 73);
        let expected = 61.64383561643836f64;
        assert_eq!(actual, expected);
    }
}