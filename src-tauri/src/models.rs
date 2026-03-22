use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::ops::{Add, Mul};

// ---------------------------------------------------------------------------
// Disk types
// ---------------------------------------------------------------------------

/// A snapshot of a physical or virtual disk at the current moment.
/// Populated by sysinfo and held in AppState.
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct DiskInfo {
    pub name: String,
    pub total_space: u64,
    pub available_space: u64,
    pub file_system: String,
    pub is_removable: bool,
    pub is_read_only: bool,
    pub kind: String,
}

impl DiskInfo {
    /// Build a DiskInfo from a sysinfo::Disk reference.
    /// Lives here (not in disk.rs) because the conversion is really about
    /// constructing the model, not about the disk-reading logic.
    pub fn from_disk(disk: &sysinfo::Disk) -> Self {
        let name = if disk.name().to_string_lossy().is_empty() {
            "Unnamed".to_string()
        } else {
            disk.name().to_string_lossy().into_owned()
        };

        Self {
            name,
            total_space: disk.total_space(),
            available_space: disk.available_space(),
            file_system: disk.file_system().to_str().unwrap_or_default().to_string(),
            is_removable: disk.is_removable(),
            is_read_only: disk.is_read_only(),
            kind: disk.kind().to_string(),
        }
    }
}

/// A historical record of a single disk's available space on a given date.
/// Persisted to CSV and SQLite.
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct DiskDto {
    pub id: u32,
    pub name: String,
    pub available_space: u64,
    pub date: String,
}

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------

#[derive(Debug, Serialize, Deserialize)]
pub struct Settings {
    pub dark_mode: bool,
    pub search_bar: bool,
    pub language: String,
    pub byte_format: String,
    pub prefetch_count: i32,
    pub desktop_noti: bool,
    pub minimize_close: bool,
    pub start_logon: bool,
    pub enable_logging: bool,
    pub log_path: String,
    pub enable_backup: bool,
    pub backup_path: String,
    pub backup_frequency_days: i32,
}

// Default trait lets callers write `Settings::default()` as a safe fallback
// when no settings file exists yet.
impl Default for Settings {
    fn default() -> Self {
        Self {
            dark_mode: false,
            search_bar: true,
            language: "en".to_string(),
            byte_format: "gb".to_string(),
            prefetch_count: 20,
            desktop_noti: true,
            minimize_close: false,
            start_logon: true,
            enable_logging: false,
            log_path: "logs".to_string(),
            enable_backup: false,
            backup_path: "backup".to_string(),
            backup_frequency_days: 7,
        }
    }
}

// ---------------------------------------------------------------------------
// Reports
// ---------------------------------------------------------------------------

/// Discriminates which aggregation a Report<T> contains.
/// Serialised as a string tag in JSON (e.g. "AvailableSpace").
#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum ReportType {
    AvailableSpace,
    UsedSpace,
    UsedSpacePct,
    ChangeInUsedSpace,
    ChangeInUsedSpacePct,
}

/// A complete chart-ready dataset returned to the frontend.
///
/// The generic parameter T is constrained to types that support Add and Mul
/// so the frontend (or future aggregation helpers) can safely do arithmetic
/// on the values. In practice T is either u64 (bytes) or f64 (percentages).
///
/// # Why a generic here?
/// Rust enums can't hold different numeric types in the same variant without
/// boxing. Using Report<u64> vs Report<f64> keeps everything zero-cost and
/// lets the compiler catch unit mismatches at compile time.
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Report<T>
where
    T: Add<Output = T> + Mul<Output = T> + Copy,
{
    pub report_type: ReportType,
    pub data: Vec<LayerChartReportData<T>>,
    pub container_config: HashMap<String, LayerChartContainerConfigItem>,
    pub chart_config: Vec<LayerChartConfigItem>,
}

/// One row in the chart: a date label plus a value per disk.
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct LayerChartReportData<T>
where
    T: Add<Output = T> + Mul<Output = T> + Copy,
{
    pub date: String,
    pub values: HashMap<String, T>,
}

impl<T> LayerChartReportData<T>
where
    T: Add<Output = T> + Mul<Output = T> + Copy,
{
    /// Create a row with no values yet (filled in by aggregation logic).
    pub fn empty(date: String) -> Self {
        Self::new(date, HashMap::new())
    }

    pub fn new(date: String, values: HashMap<String, T>) -> Self {
        Self { date, values }
    }
}

/// Per-series display config sent to the charting library.
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct LayerChartConfigItem {
    pub key: String,
    pub label: String,
    pub color: String,
}

/// Per-container display config (used by some chart wrappers).
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct LayerChartContainerConfigItem {
    pub label: String,
    pub color: String,
}

// ---------------------------------------------------------------------------
// Alerts
// ---------------------------------------------------------------------------

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct AlertSetting {
    pub id: u32,
    pub name: String,
    pub last_check: String,
    pub frequency_days: i32,
    pub enabled: bool,
    pub created_at: String,
    pub updated_at: String,
    pub rule: AlertRule,
}

/// DTO used when the frontend creates a new alert — the backend fills in the
/// remaining fields (id, timestamps, enabled=true).
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct AlertSettingCreateDto {
    pub name: String,
    pub frequency_days: i32,
    pub rule: AlertRule,
}

/// The condition that an alert checks.
/// Stored as JSON in the `rule` column of alert_settings.
///
/// Each variant carries exactly the data it needs — no nullable fields.
/// Adding a new rule type is a single enum variant with no schema migration.
#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum AlertRule {
    DiskAvailableSpaceBelowPct {
        disk_name: String,
        threshold_pct: f64,
    },
    DiskAvailableSpaceBelowBytes {
        disk_name: String,
        threshold_bytes: u64,
    },
    DiskAvailableSpaceChangeInPct {
        disk_name: String,
        change_pct: f64,
    },
    FolderSizeAboveBytes {
        folder_path: String,
        threshold_bytes: u64,
    },
}

// ---------------------------------------------------------------------------
// Notifications
// ---------------------------------------------------------------------------

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct NotificationHistory {
    pub id: i32,
    pub title: String,
    pub body: String,
    pub call_to_action: Option<String>,
    pub created_at: String,
}