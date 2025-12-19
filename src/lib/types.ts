export type ChartConfig = {
  key: string;
  label: string;
  color: string;
};

export type Disk = {
  name: string;
  total_space: number;
  available_space: number;
  file_system: string;
  is_removable: boolean;
  is_read_only: boolean;
  kind: string;
};

export type DiskDto = {
  id: number;
  name: string;
  available_space: number;
  date: string;
};

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
