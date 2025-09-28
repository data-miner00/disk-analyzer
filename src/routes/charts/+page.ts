import { toGBNumber } from "$lib/utils.js";
import { invoke } from "@tauri-apps/api/core";

type RawReport = {
  report_type: string;
  data: {
    date: string;
    values: {
      [disk_id: string]: number;
    };
  }[];
  container_config: {
    [disk_id: string]: {
      label: string;
      color: string;
    };
  };
  chart_config: {
    key: string;
    label: string;
    color: string;
  }[];
};

type ConsolidatedReport = {
  reportType: string;
  data: {
    date: Date;
    [disk_id: string]: number | Date;
  }[];
  containerConfig: {
    [disk_id: string]: {
      label: string;
      color: string;
    };
  };
  chartConfig: {
    key: string;
    label: string;
    color: string;
  }[];
};

export async function load({ params }) {
  const availableSpaceReport = await loadAvailableSpaceReport();
  const usedSpaceReport = await loadUsedSpaceReport();
  const usedSpacePctReport = await loadUsedSpacePctReport();

  return {
    availableSpaceReport,
    usedSpaceReport,
    usedSpacePctReport,
  };
}

async function loadAvailableSpaceReport(): Promise<ConsolidatedReport> {
  const available_space_raw_report: RawReport = await invoke(
    "aggregate_disk_available_space_history"
  );

  const mappedData = available_space_raw_report.data
    .sort((a, b) => (a.date > b.date ? 1 : a.date < b.date ? -1 : 0))
    .map((x) => ({
      date: new Date(x.date),
      ...Object.fromEntries(
        Object.entries(x.values).map(([key, value]) => [key, toGBNumber(value)])
      ),
    }));

  return {
    reportType: available_space_raw_report.report_type,
    containerConfig: available_space_raw_report.container_config,
    chartConfig: available_space_raw_report.chart_config,
    data: mappedData,
  };
}

async function loadUsedSpaceReport(): Promise<ConsolidatedReport> {
  const raw_report: RawReport = await invoke("aggregate_disk_usage_history");

  const mappedData = raw_report.data
    .sort((a, b) => (a.date > b.date ? 1 : a.date < b.date ? -1 : 0))
    .map((x) => ({
      date: new Date(x.date),
      ...Object.fromEntries(
        Object.entries(x.values).map(([key, value]) => [key, toGBNumber(value)])
      ),
    }));

  return {
    reportType: raw_report.report_type,
    containerConfig: raw_report.container_config,
    chartConfig: raw_report.chart_config,
    data: mappedData,
  };
}

async function loadUsedSpacePctReport(): Promise<ConsolidatedReport> {
  const raw_report: RawReport = await invoke(
    "aggregate_disk_usage_pct_history"
  );

  const mappedData = raw_report.data
    .sort((a, b) => (a.date > b.date ? 1 : a.date < b.date ? -1 : 0))
    .map((x) => ({
      date: new Date(x.date),
      ...Object.fromEntries(
        Object.entries(x.values).map(([key, value]) => [key, value])
      ),
    }));

  return {
    reportType: raw_report.report_type,
    containerConfig: raw_report.container_config,
    chartConfig: raw_report.chart_config,
    data: mappedData,
  };
}
