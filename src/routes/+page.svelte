<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";
  import { HardDrive, SearchIcon } from "@lucide/svelte";
  import { onMount } from "svelte";
  import { type Disk } from "$lib/types";
  import { toGB, toPercentage, toYyyyMmDd } from "$lib/utils";
  import * as InputGroup from "$lib/components/ui/input-group/index.js";
  import { HOME, t } from "$lib/i18n/translations.svelte";
  import { type Settings } from "../states/settings-state.svelte";
  import { getSettings } from "$lib/utils.tauri";

  let diskInfo = $state<Disk[]>([]);
  let isLoading = $state(true);
  let settings = $state<Settings | null>(null);

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
      console.log(t(HOME.LOG));
      return;
    }

    const newDiskDtos: DiskDto[] = [];

    for (let disk of diskInfo) {
      newDiskDtos.push({
        id: newIndex++,
        name:
          disk.name === "Unnamed" ? `Unnamed_${disk.total_space}` : disk.name,
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
    isLoading = false;
  });

  let filteredDisk = $derived(
    diskInfo.filter((x) =>
      x.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  let searchQuery = $state("");
</script>

<main class="container my-6">
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
      <InputGroup.Addon align="inline-end">
        <InputGroup.Button>Search</InputGroup.Button>
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
</main>

<style lang="postcss">
  @reference "tailwindcss";
  :global(html) {
    background-color: theme(--color-gray-100);
  }
</style>
