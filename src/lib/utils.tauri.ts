import { invoke } from "@tauri-apps/api/core";
import type { DiskHistory, Settings } from "$lib/types";
import { convertObjectKeysToCamelCase } from "./utils";

export async function getSettings(): Promise<Settings> {
  const setting = await invoke("get_settings");
  return convertObjectKeysToCamelCase(setting) as Settings;
}

export async function getLastHistoryEntry(): Promise<DiskHistory> {
  const diskHistory = (await invoke("read_disk_dtos", {
    count: 1,
  })) as DiskHistory[];

  if (diskHistory.length === 0) {
    return {
      id: 0,
      name: "",
      date: new Date().toISOString(),
      available_space: 0,
    };
  }

  return diskHistory[0];
}
