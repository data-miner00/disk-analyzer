use serde::{Deserialize, Serialize};
use sysinfo::{
    Disks,
    System,
};

#[derive(Debug, Serialize, Deserialize)]
struct DiskInfo {
    name: String,
    total_space: u64,
    available_space: u64,
}

impl DiskInfo {
    fn new(name: String, total_space: u64, available_space: u64) -> Self {
        Self {
            name,
            total_space,
            available_space,
        }
    }

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
        }
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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            get_disks,
            hostname,
            folder_size,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}