export type ChartConfig = {
  key: string;
  label: string;
  color: string;
};

export type Disk = {
  name: string;
  total_space: number;
  available_space: number;
};

export type DiskDto = {
  id: number;
  name: string;
  available_space: number;
  date: string;
};
