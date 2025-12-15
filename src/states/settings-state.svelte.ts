export type Settings = {
  darkMode: boolean;
  searchBar: boolean;
  language: string;
  byteFormat: string;
  prefetchCount: number;
  desktopNoti: boolean;
  minimizeClose: boolean;
  startLogon: boolean;
  enableLogging: boolean;
  logPath: string;
  enableBackup: boolean;
  backupPath: string;
  backupFrequencyDays: number;
};

export const settingsState = $state<Settings>({
  darkMode: false,
  searchBar: false,
  language: "en",
  byteFormat: "gb",
  prefetchCount: 20,
  desktopNoti: true,
  minimizeClose: false,
  startLogon: true,
  enableLogging: true,
  logPath: "logs",
  enableBackup: true,
  backupPath: "backup",
  backupFrequencyDays: 7,
});
