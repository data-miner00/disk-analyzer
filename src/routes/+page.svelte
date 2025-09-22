<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";
  import { HardDrive } from "@lucide/svelte";
  import { onMount } from "svelte";
  import { LineChart } from "layerchart";
  import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
  import { scaleUtc } from "d3-scale";
  import { curveNatural } from "d3-shape";
  import * as Chart from "$lib/components/ui/chart/index.js";
  import * as Card from "$lib/components/ui/card/index.js";

  type ChartConfig = {
    key: string;
    label: string;
    color: string;
  };

  let name = $state("");
  let diskInfo = $state<Disk[]>([]);
  let isLoading = $state(true);
  let disksHistory = $state<DiskDto[]>([]);
  let containerConfig = $state<Chart.ChartConfig>(
    {} satisfies Chart.ChartConfig
  );
  let chartConfig = $state<ChartConfig[]>([]);
  let aggregatedData = $state<any[]>([]);

  type Disk = {
    name: string;
    total_space: number;
    available_space: number;
  };

  type DiskDto = {
    id: number;
    name: string;
    available_space: number;
    date: string;
  };

  async function get_disks() {
    const disks = await invoke("get_disks");
    diskInfo = disks as Disk[];
  }

  async function get_folder_size(event: Event) {
    event.preventDefault();
    const size = await invoke("folder_size", { path: name });
    window.alert(`Folder size: ${size} bytes`);
  }

  async function process_daily_disk_info() {
    disksHistory = (await invoke("read_disk_dtos", { count: 20 })) as DiskDto[];
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
        name:
          disk.name === "Unnamed" ? `Unnamed_${disk.total_space}` : disk.name,
        available_space: disk.available_space,
        date: today.toISOString().split("T")[0],
      });
    }

    await invoke("add_disk_dtos", { disks: newDiskDtos });
  }

  onMount(async () => {
    await process_daily_disk_info();
    await get_disks();
    aggregateDiskHistoryData();
    isLoading = false;
  });

  function toGB(bytes: number): string {
    return (bytes / 1024 ** 3).toFixed(2) + " GB";
  }

  function toGBNumber(bytes: number): number {
    return parseFloat((bytes / 1024 ** 3).toFixed(2));
  }

  function toPercentage(used: number, total: number): number {
    return (used / total) * 100;
  }

  function aggregateDiskHistoryData() {
    let index = 1;
    const distinctDisks = new Set(disksHistory.map((x) => x.name));
    Array.from(distinctDisks).forEach((diskName) => {
      const diskEntries = disksHistory.filter(
        (entry) => entry.name === diskName
      );
      const idDiskName = diskName.toLowerCase().replace(/\s+/g, "_");
      const days = new Set(diskEntries.map((entry) => entry.date));

      days.forEach((day) => {
        const currentAgg = aggregatedData.find(
          (entry) => entry.date.toISOString().split("T")[0] === day
        );
        const aggregatedEntry: any = currentAgg || { date: new Date(day) };

        const entryForDay = diskEntries.find((entry) => entry.date === day);

        if (entryForDay) {
          aggregatedEntry[idDiskName] = toGBNumber(entryForDay.available_space);
        }

        if (!currentAgg) {
          aggregatedData.push(aggregatedEntry);
        }
      });

      containerConfig[idDiskName] = {
        label: diskName,
        color: `var(--chart-${index})`,
      };

      chartConfig.push({
        key: idDiskName,
        label: diskName,
        color: `var(--chart-${index++})`,
      });
    });
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
      </li>
    {/each}
  </ul>
</main>

<Card.Root>
  <Card.Header>
    <Card.Title>Disk Usages in Percentage</Card.Title>
    <Card.Description
      >Showing a breakdown of individual disk usages for the current captured PC</Card.Description
    >
  </Card.Header>
  <Card.Content>
    <Chart.Container config={containerConfig}>
      <LineChart
        data={aggregatedData}
        x="date"
        xScale={scaleUtc()}
        axis="x"
        series={chartConfig}
        props={{
          spline: { curve: curveNatural, motion: "tween", strokeWidth: 2 },
          xAxis: {
            format: (v: Date) =>
              v.toLocaleDateString("en-US", { day: "2-digit" }),
          },
          highlight: { points: { r: 4 } },
        }}
      >
        {#snippet tooltip()}
          <Chart.Tooltip hideLabel />
        {/snippet}
      </LineChart>
    </Chart.Container>
  </Card.Content>
  <Card.Footer>
    <div class="flex w-full items-start gap-2 text-sm">
      <div class="grid gap-2">
        <div class="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUpIcon class="size-4" />
        </div>
        <div class="text-muted-foreground flex items-center gap-2 leading-none">
          January - June 2024
        </div>
      </div>
    </div>
  </Card.Footer>
</Card.Root>

<style lang="postcss">
  @reference "tailwindcss";
  :global(html) {
    background-color: theme(--color-gray-100);
  }
</style>
