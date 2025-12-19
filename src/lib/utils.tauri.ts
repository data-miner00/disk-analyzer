import { invoke } from "@tauri-apps/api/core";
import type { Settings } from "../states/settings-state.svelte";
import { convertObjectKeysToCamelCase } from "./utils";

export async function getSettings(): Promise<Settings> {
  const setting = await invoke("get_settings");
  return convertObjectKeysToCamelCase(setting) as Settings;
}
