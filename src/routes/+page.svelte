<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";
  import { AlertCircleIcon, HardDrive, SearchIcon } from "@lucide/svelte";
  import { onMount } from "svelte";
  import type { Disk, Settings, DiskHistory } from "$lib/types";
  import { toGB, toPercentage, toYyyyMmDd } from "$lib/utils";
  import * as InputGroup from "$lib/components/ui/input-group/index.js";
  import { HOME, t } from "$lib/i18n/translations.svelte";
  import { getSettings, getLastHistoryEntry } from "$lib/utils.tauri";
  import * as Alert from "$lib/components/ui/alert/index.js";

  let diskInfo = $state<Disk[]>([]);
  let settings = $state<Settings | null>(null);
  let hasUnnamedDisk = $derived(
    diskInfo.some((disk) => disk.name.trim() === "Unnamed")
  );

  async function get_disks() {
    const disks = await invoke("get_disks_rust");
    diskInfo = disks as Disk[];
  }

  async function process_daily_disk_info() {
    const lastEntry = await getLastHistoryEntry();
    let newIndex = lastEntry ? lastEntry.id + 1 : 1;
    const lastRecordedDate = lastEntry ? new Date(lastEntry.date) : null;
    const today = new Date();

    if (lastRecordedDate?.toDateString() === today.toDateString()) {
      console.log(t(HOME.LOG));
      return;
    }

    const newDiskDtos: DiskHistory[] = [];

    for (let disk of diskInfo) {
      newDiskDtos.push({
        id: newIndex++,
        name: disk.name,
        available_space: disk.available_space,
        date: toYyyyMmDd(today),
      });
    }

    await invoke("add_disk_dtos", { disks: newDiskDtos });
  }

  onMount(async () => {
    settings = await getSettings();
    await get_disks();
    await process_daily_disk_info();
  });

  let filteredDisk = $derived(
    diskInfo.filter((x) =>
      x.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  let searchQuery = $state("");
</script>

{#if hasUnnamedDisk}
  <Alert.Root class="mb-4">
    <AlertCircleIcon />
    <Alert.Title>You have an unnamed disk</Alert.Title>
    <Alert.Description
      >One or more disks on your system have no name assigned. To prevent
      unwanted behavior, please name them accordingly.</Alert.Description
    >
  </Alert.Root>
{/if}

<h2 class="font-semibold text-lg mb-4">{diskInfo.length} disk(s)</h2>

{#if settings?.searchBar == true}
  <InputGroup.Root class="mb-4">
    <InputGroup.Input
      bind:value={searchQuery}
      placeholder={t(HOME.SEARCH_PLACEHOLDER)}
    />
    <InputGroup.Addon>
      <SearchIcon />
    </InputGroup.Addon>
  </InputGroup.Root>
{/if}

<ul class="flex gap-4 items-center flex-wrap">
  {#each filteredDisk as disk}
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

<style lang="postcss">
  @reference "tailwindcss";
  :global(html) {
    background-color: theme(--color-gray-100);
  }
</style>
