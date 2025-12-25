import { type Translations } from "../translations.svelte";
import { SETTINGS, HEADER, HOME, DISK_DETAIL } from "./keys";

export const EN: Translations = {
  [HEADER.MISC]: "Misc",
  [HEADER.OPEN_EXPLORER]: "Open Explorer",
  [HEADER.UTILITY]: "Utility",
  [HEADER.EXPORT]: "Export",
  [HEADER.PRINT]: "Print",
  [HEADER.EXIT]: "Exit",
  [HEADER.ALERTS]: "Alerts",
  [HEADER.CHARTS]: "Charts",
  [HEADER.SETTINGS]: "Settings",

  [HOME.LOG]: "Today's disk info has already been recorded.",
  [HOME.SEARCH_PLACEHOLDER]: "Search...",
  [HOME.DISK_COUNT]: "{diskCount} disk(s)",
  [HOME.WARNING_NO_DISKS]: "You have an unnamed disk",
  [HOME.WARNING_NO_DISKS_DESCRIPTION]:
    "One or more disks on your system have no name assigned. To prevent unwanted behavior, please name them accordingly.",

  [SETTINGS.TITLE]: "Settings",
  [SETTINGS.PRESENTATION]: "Presentation",
  [SETTINGS.DARK_MODE]: "Dark Mode",
  [SETTINGS.DARK_MODE_DESCIPTION]:
    "The themes available currently are light and dark. Dark mode eases the eyes drastically.",
  [SETTINGS.SEARCH_BAR]: "Search Bar",
  [SETTINGS.SEARCH_BAR_DESCIPTION]:
    "Whether to enable the search bar functionality for applicable pages.",
  [SETTINGS.LANGUAGE]: "Language",
  [SETTINGS.LANGUAGE_DESCIPTION]:
    "The language used for the user interface from a limited preset.",
  [SETTINGS.LANGUAGE_DEFAULT_LABEL]: "Select language",
  [SETTINGS.PREFETCH_COUNT]: "Prefetch Count",
  [SETTINGS.PREFETCH_COUNT_DESCIPTION]:
    "The number of data points that is preferred to fetch from the history. Optimal suggestion is 20.",
  [SETTINGS.PREFETCH_COUNT_PLACEHOLDER]: "Count",
  [SETTINGS.BYTE_DISPLAY]: "Byte Display",
  [SETTINGS.BYTE_DISPLAY_DESCIPTION]:
    "The format for which the bytes will be displayed by default.",
  [SETTINGS.BYTE_DISPLAY_DEFAULT_LABEL]: "Select byte format",

  [SETTINGS.SERVICES]: "Services",
  [SETTINGS.SERVICES_DESKTOP_NOTIFICATION]: "Desktop Notification",
  [SETTINGS.SERVICES_DESKTOP_NOTIFICATION_DESCIPTION]:
    "Notify through the desktop notification when the alert configured has reached its threshold.",
  [SETTINGS.SERVICES_MINIMIZE_ON_CLOSE]: "Minimize on Close",
  [SETTINGS.SERVICES_MINIMIZE_ON_CLOSE_DESCIPTION]:
    "Upon clicking the exit button, instead of exiting the program, it minimize to tray instead.",
  [SETTINGS.SERVICES_START_ON_BOOT]: "Start on Boot",
  [SETTINGS.SERVICES_START_ON_BOOT_DESCIPTION]:
    "Automatically start the program upon logon. Recommended to have consistent logs recorded.",

  [SETTINGS.LOGGING]: "Logging",
  [SETTINGS.ENABLE_LOGGING]: "Enable Logging",
  [SETTINGS.ENABLE_LOGGING_DESCIPTION]:
    "Log the activities that is happening when the program is running. Useful to find out bugs.",
  [SETTINGS.LOGGING_PATH]: "Logging Path",
  [SETTINGS.LOGGING_PATH_DESCIPTION]:
    "The folder or directory to keep track of the generated logs. Defaults to the application log path.",
  [SETTINGS.LOGGING_PATH_PLACEHOLDER]: "Select a logging directory",
  [SETTINGS.BACKUP]: "Backup",
  [SETTINGS.ENABLE_BACKUP]: "Enable Backup",
  [SETTINGS.ENABLE_BACKUP_DESCIPTION]:
    "Safely creates a restore point that can be restored from a previous snapshot.",
  [SETTINGS.BACKUP_PATH]: "Backup Path",
  [SETTINGS.BACKUP_PATH_DESCIPTION]:
    "The folder or directory to keep the backup for the application data. Defaults to the application data path.",
  [SETTINGS.BACKUP_PATH_PLACEHOLDER]: "Select a backup directory",
  [SETTINGS.BACKUP_FREQUENCY]: "Backup Frequency",
  [SETTINGS.BACKUP_FREQUENCY_DESCIPTION]:
    "The interval of which the data will be backed-up to create restorable snapshots. Defaults to 7 days.",
  [SETTINGS.SAVE_CHANGES]: "Save Changes",

  [DISK_DETAIL.DESCRIPTION]:
    "Detailed information about the disk named {diskName} on your system.",
  [DISK_DETAIL.SIZE]: "Size",
  [DISK_DETAIL.SIZE_AVAILABLE_SPACE]: "Available space",
  [DISK_DETAIL.SIZE_TOTAL_SPACE]: "Total space",
  [DISK_DETAIL.SIZE_USED_SPACE]: "Used space",
  [DISK_DETAIL.PROPERTIES]: "Properties",
  [DISK_DETAIL.PROPERTIES_MODE]: "Mode",
  [DISK_DETAIL.PROPERTIES_REMOVABLE]: "Removable",
  [DISK_DETAIL.PROPERTIES_FS]: "File System",
  [DISK_DETAIL.PROPERTIES_TYPE]: "Type",
};

export default EN;
