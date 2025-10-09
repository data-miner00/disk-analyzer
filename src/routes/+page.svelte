<script lang="ts">
import { invoke } from "@tauri-apps/api/core";
import { HardDrive } from "@lucide/svelte";
import { onMount } from "svelte";
import { type Disk } from "$lib/types";

let diskInfo = $state<Disk[]>([]);
let isLoading = $state(true);

type DiskDto = {
  id: number;
  name: string;
  available_space: number;
  date: string;
};

async function get_disks() {
  const disks = await invoke("get_disks_rust");
  diskInfo = disks as Disk[];
}

async function process_daily_disk_info() {
  const disksHistory = (await invoke("read_disk_dtos", {
    count: 20,
  })) as DiskDto[];
  const lastEntry = disksHistory[disksHistory.length - 1];
  let newIndex = lastEntry ? lastEntry.id + 1 : 1;
  const lastRecordedDate = lastEntry ? new Date(lastEntry.date) : null;
  const today = new Date();

  if (
    lastRecordedDate &&
    lastRecordedDate.toDateString() === today.toDateString()
  ) {
    console.log("Today's disk info has already been recorded.");
    return;
  }

  const newDiskDtos: DiskDto[] = [];

  for (let disk of diskInfo) {
    newDiskDtos.push({
      id: newIndex++,
      name: disk.name === "Unnamed" ? `Unnamed_${disk.total_space}` : disk.name,
      available_space: disk.available_space,
      date: today.toISOString().split("T")[0],
    });
  }

  await invoke("add_disk_dtos", { disks: newDiskDtos });
}

onMount(async () => {
  await get_disks();
  await process_daily_disk_info();
  isLoading = false;
});

function toGB(bytes: number): string {
  return (bytes / 1024 ** 3).toFixed(2) + " GB";
}

function toPercentage(used: number, total: number): number {
  return (used / total) * 100;
}
</script>

<main class="container my-6">
  <h2 class="font-semibold text-lg mb-4">{diskInfo.length} disk(s)</h2>

  <ul class="flex gap-4 items-center flex-wrap">
    {#each diskInfo as disk}
      {@const usedSpacePercentage = toPercentage(
        disk.total_space - disk.available_space,
        disk.total_space
      )}

      <li>
        <a href={`/disk/${disk.name}`} class="cursor-pointer">
          <article class="flex gap-4 border p-4 rounded-md shadow-xs">
            <div class="pt-1">
              <HardDrive color="#999" strokeWidth={2} size={20} />
            </div>
            <div>
              <div class="font-semibold">{disk.name}</div>
              <div>
                {toGB(disk.total_space - disk.available_space)} / {toGB(
                  disk.total_space
                )}
              </div>
              <meter
                value={usedSpacePercentage}
                min="0"
                max="100"
                low="30"
                high="80"
                optimum="0">{usedSpacePercentage}%</meter
              >
            </div>
          </article>
        </a>
      </li>
    {/each}
  </ul>
</main>

<style lang="postcss">
  @reference "tailwindcss";
  :global(html) {
    background-color: theme(--color-gray-100);
  }
</style>
