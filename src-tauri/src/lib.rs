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
        .map(|disk| format!("{}: {} bytes", disk.name().to_string_lossy(), disk.total_space()))
        .collect()
}

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, get_disks])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
