<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import * as Chart from "$lib/components/ui/chart";
  import { type DiskDto, type ChartConfig } from "$lib/types";
  import { TrendingUpIcon } from "@lucide/svelte";
  import { invoke } from "@tauri-apps/api/core";
  import { scaleUtc } from "d3-scale";
  import { curveNatural } from "d3-shape";
  import { LineChart } from "layerchart";
  import { onMount } from "svelte";

  let disksHistory = $state<DiskDto[]>([]);
  let aggregatedData = $state<any[]>([]);
  let containerConfig = $state<Chart.ChartConfig>(
    {} satisfies Chart.ChartConfig
  );
  let chartConfig = $state<ChartConfig[]>([]);
  onMount(async () => {
    disksHistory = (await invoke("read_disk_dtos", { count: 20 })) as DiskDto[];
    calculateUsageDiff();
  });

  type DiskDtoWithDiff = DiskDto & { usage_diff: number };

  function calculateUsageDiff() {
    let index = 1;
    const distinctDisks = new Set(disksHistory.map((x) => x.name));
    Array.from(distinctDisks).forEach((diskName) => {
      const diskData = disksHistory.filter((x) => x.name === diskName);

      const diskWithDiff = diskData.map(
        (x) =>
          <DiskDtoWithDiff>{
            ...x,
            usage_diff: 0,
          }
      );

      diskWithDiff.forEach((entry, index) => {
        if (index === 0) {
          entry["usage_diff"] = 0;
        } else {
          const prevEntry = diskData[index - 1];
          const diff =
            ((prevEntry.available_space - entry.available_space) /
              prevEntry.available_space) *
            100;
          entry["usage_diff"] = parseFloat(diff.toFixed(2));
        }
      });

      const idDiskName = diskName.toLowerCase().replace(/\s+/g, "_");
      const days = new Set(diskData.map((entry) => entry.date));

      days.forEach((day) => {
        const currentAgg = aggregatedData.find(
          (entry) => entry.date.toISOString().split("T")[0] === day
        );
        const aggregatedEntry: any = currentAgg || { date: new Date(day) };
        const entryForDay = diskWithDiff.find((entry) => entry.date === day);

        if (entryForDay) {
          aggregatedEntry[idDiskName] = entryForDay.usage_diff;
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
  <h1 class="font-semibold text-lg mb-4">Charts</h1>

  <Card.Root>
    <Card.Header>
      <Card.Title>Disk Usages Change in Percentage</Card.Title>
      <Card.Description
        >Showing a breakdown of individual disk usages as compared to yesterday</Card.Description
      >
    </Card.Header>
    <Card.Content>
      <Chart.Container config={containerConfig}>
        <LineChart
          data={aggregatedData}
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
              format: (v: number) => `${v.toFixed(1)}%`,
              ticks: 5,
            },
            highlight: { points: { r: 4 } },
          }}
        >
          {#snippet tooltip()}
            <Chart.Tooltip hideLabel>
              {#snippet formatter({ name, value })}
                <div
                  class="text-muted-foreground flex min-w-[130px] items-center text-xs"
                >
                  {name}
                  <div
                    class="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums"
                  >
                    {value}
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
          <div
            class="text-muted-foreground flex items-center gap-2 leading-none"
          >
            January - June 2024
          </div>
        </div>
      </div>
    </Card.Footer>
  </Card.Root>
</main>
