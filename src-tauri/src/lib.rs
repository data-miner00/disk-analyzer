use serde::{Deserialize, Serialize};
use sysinfo::{Disks, System};
use std::sync::Mutex;
use std::{error::Error, io};
use std::fs;
use std::ops::{Add, Sub, Mul};
use std::collections::HashMap;
use serde_json::json;
use tauri::{Builder, Manager, State};

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

enum ReportType {
    AvailableSpace,
    UsedSpace,
    UsedSpacePct,
    ChangeInUsedSpace,
    ChangeInUsedSpacePct,
}

struct Stat<T>
where T: Add<Output = T> + Mul<Output = T> + Copy, {
    date_or_range: String,
    value: T,
}

struct Report {
    report_type: ReportType,
    data: Vec<LayerChartReportData<f64>>,
    average: Stat<f64>,
    median: Stat<f64>,
    min: Stat<u64>,
    max: Stat<u64>,
    container_config: HashMap<String, LayerChartContainerConfigItem>,
    chart_config: Vec<LayerChartConfigItem>,
}

struct LayerChartReportData<T>
where T: Add<Output = T> + Mul<Output = T> + Copy, {
    date: String,
    values: HashMap<String, T>
}

struct LayerChartConfigItem {
    key: String,
    label: String,
    color: String,
}

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

#[derive(Debug, Serialize, Deserialize)]
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
            println!("{:?}", &record);
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

    println!("{:?}", state.disks);

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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    Builder::default()
        .setup(|app| {
            app.manage(Mutex::new(AppState::new(0, get_disks())));
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
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
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
}