use sysinfo::{
    Disks,
    System,
};

#[tauri::command]
fn get_disks() -> Vec<String> {
    let mut sys = System::new_all();

    sys.refresh_all();

    Disks::new_with_refreshed_list()
        .iter()
        .map(|disk| format!("{}: Total: {} bytes Available: {}", disk.name().to_str().unwrap_or_else(|| "Unnamed"), disk.total_space(), disk.available_space()))
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