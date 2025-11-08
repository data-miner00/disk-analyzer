import type { Disk } from "$lib/types.js";
import { invoke } from "@tauri-apps/api/core";

export async function load({ params }) {
  const name = params.name;

  const disks: Disk[] = await invoke("get_disks");
  const disk = disks.find((d) => name.startsWith(d.name));

  return {
    disk,
  };
}

export const prerender = false;
