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
  import { type Disk } from "$lib/types";

  type ChartConfig = {
    key: string;
    label: string;
    color: string;
  };

  let diskInfo = $state<Disk[]>([]);
  let isLoading = $state(true);
  let disksHistory = $state<DiskDto[]>([]);
  let containerConfig = $state<Chart.ChartConfig>(
    {} satisfies Chart.ChartConfig
  );
  let chartConfig = $state<ChartConfig[]>([]);
  let aggregatedAvailableData = $state<any[]>([]);
  let aggregatedUsedData = $state<any[]>([]);
  let aggregatedUsedPctData = $state<any[]>([]);

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
    await get_disks();
    await process_daily_disk_info();
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
        const currentAgg = aggregatedAvailableData.find(
          (entry) => entry.date.toISOString().split("T")[0] === day
        );
        const aggregatedEntry: any = currentAgg || { date: new Date(day) };

        const entryForDay = diskEntries.find((entry) => entry.date === day);

        if (entryForDay) {
          aggregatedEntry[idDiskName] = toGBNumber(entryForDay.available_space);
        }

        if (!currentAgg) {
          aggregatedAvailableData.push(aggregatedEntry);
        }

        const currentUsedAgg = aggregatedUsedData.find(
          (entry) => entry.date.toISOString().split("T")[0] === day
        );
        const aggregatedUsedEntry: any = currentUsedAgg || {
          date: new Date(day),
        };

        const currentUsedPctAgg = aggregatedUsedPctData.find(
          (entry) => entry.date.toISOString().split("T")[0] === day
        );
        const aggregatedUsedPctEntry: any = currentUsedPctAgg || {
          date: new Date(day),
        };

        if (entryForDay) {
          const diskInfoEntry = diskInfo.find((disk) =>
            diskName.startsWith(disk.name)
          );
          aggregatedUsedEntry[idDiskName] = toGBNumber(
            diskInfoEntry!.total_space - entryForDay.available_space
          );
          aggregatedUsedPctEntry[idDiskName] = toPercentage(
            diskInfoEntry!.total_space - entryForDay.available_space,
            diskInfoEntry!.total_space
          );
        }

        if (!currentUsedAgg) {
          aggregatedUsedData.push(aggregatedUsedEntry);
          aggregatedUsedPctData.push(aggregatedUsedPctEntry);
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

<Card.Root>
  <Card.Header>
    <Card.Title>Disk Available Space</Card.Title>
    <Card.Description
      >Showing a breakdown of individual disk available space for the current
      captured PC</Card.Description
    >
  </Card.Header>
  <Card.Content class="pl-12">
    <Chart.Container config={containerConfig}>
      <LineChart
        data={aggregatedAvailableData}
        x="date"
        xScale={scaleUtc()}
        series={chartConfig}
        props={{
          spline: { curve: curveNatural, motion: "tween", strokeWidth: 2 },
          xAxis: {
            format: (v: Date) =>
              v.toLocaleDateString("en-US", { day: "2-digit" }),
          },
          yAxis: {
            format: (v: number) => `${v} GB`,
          },
          highlight: { points: { r: 4 } },
        }}
      >
        {#snippet tooltip()}
          <Chart.Tooltip label="Available Space">
            {#snippet formatter({ name, value, item })}
              <div
                class="w-3 h-3 rounded"
                style={`background: ${item.color}`}
              ></div>
              <div
                class="text-muted-foreground flex min-w-[130px] items-center text-xs"
              >
                {name.substring(0, 15)}
                <div
                  class="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums"
                >
                  {value}
                  <span class="text-muted-foreground font-normal"> GB </span>
                </div>
              </div>
            {/snippet}
          </Chart.Tooltip>
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

<div class="py-6"></div>

<Card.Root>
  <Card.Header>
    <Card.Title>Disk Usage</Card.Title>
    <Card.Description
      >Showing a breakdown of individual disk usages for the current captured PC</Card.Description
    >
  </Card.Header>
  <Card.Content class="pl-12">
    <Chart.Container config={containerConfig}>
      <LineChart
        data={aggregatedUsedData}
        x="date"
        xScale={scaleUtc()}
        series={chartConfig}
        props={{
          spline: { curve: curveNatural, motion: "tween", strokeWidth: 2 },
          xAxis: {
            format: (v: Date) =>
              v.toLocaleDateString("en-US", { day: "2-digit" }),
          },
          yAxis: {
            format: (v: number) => `${v} GB`,
          },
          highlight: { points: { r: 4 } },
        }}
      >
        {#snippet tooltip()}
          <Chart.Tooltip label="Used Space">
            {#snippet formatter({ name, value, item })}
              <div
                class="w-3 h-3 rounded"
                style={`background: ${item.color}`}
              ></div>
              <div
                class="text-muted-foreground flex min-w-[130px] items-center text-xs"
              >
                {name.substring(0, 15)}
                <div
                  class="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums"
                >
                  {value}
                  <span class="text-muted-foreground font-normal"> GB </span>
                </div>
              </div>
            {/snippet}
          </Chart.Tooltip>
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

<div class="py-6"></div>

<Card.Root>
  <Card.Header>
    <Card.Title>Disk Usage in Percentage</Card.Title>
    <Card.Description
      >Showing a breakdown of individual disk usages in percentage for the
      current captured PC</Card.Description
    >
  </Card.Header>
  <Card.Content class="pl-12">
    <Chart.Container config={containerConfig}>
      <LineChart
        data={aggregatedUsedPctData}
        x="date"
        xScale={scaleUtc()}
        series={chartConfig}
        props={{
          spline: { curve: curveNatural, motion: "tween", strokeWidth: 2 },
          xAxis: {
            format: (v: Date) =>
              v.toLocaleDateString("en-US", { day: "2-digit" }),
          },
          yAxis: {
            format: (v: number) => `${v}%`,
          },
          highlight: { points: { r: 4 } },
        }}
      >
        {#snippet tooltip()}
          <Chart.Tooltip label="Usage Percentage">
            {#snippet formatter({ name, value, item })}
              <div
                class="w-3 h-3 rounded"
                style={`background: ${item.color}`}
              ></div>
              <div
                class="text-muted-foreground flex min-w-[130px] items-center text-xs"
              >
                {name.substring(0, 15)}
                <div
                  class="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums"
                >
                  {(value as number).toFixed(2)}
                  <span class="text-muted-foreground font-normal"> % </span>
                </div>
              </div>
            {/snippet}
          </Chart.Tooltip>
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
