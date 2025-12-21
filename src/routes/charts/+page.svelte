<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import * as Chart from "$lib/components/ui/chart";
  import { TrendingUpIcon } from "@lucide/svelte";
  import { scaleUtc } from "d3-scale";
  import { curveNatural } from "d3-shape";
  import { LineChart } from "layerchart";

  const { data } = $props();
  const {
    availableSpaceReport,
    usedSpaceChgPctReport,
    usedSpacePctReport,
    usedSpaceReport,
  } = data;
</script>

<h1 class="font-semibold text-lg mb-4">Charts</h1>

<Card.Root>
  <Card.Header>
    <Card.Title>Disk Usages Change in Percentage</Card.Title>
    <Card.Description
      >Showing a breakdown of individual disk usages as compared to yesterday</Card.Description
    >
  </Card.Header>
  <Card.Content class="pl-12">
    <Chart.Container config={usedSpaceChgPctReport.containerConfig}>
      <LineChart
        data={usedSpaceChgPctReport.data}
        x="date"
        xScale={scaleUtc()}
        series={usedSpaceChgPctReport.chartConfig}
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
            {#snippet formatter({ name, value, item })}
              <div
                class="w-3 h-3 rounded"
                style={`background: ${item.color}`}
              ></div>
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
    <Card.Title>Disk Available Space</Card.Title>
    <Card.Description
      >Showing a breakdown of individual disk available space for the current
      captured PC</Card.Description
    >
  </Card.Header>
  <Card.Content class="pl-12">
    <Chart.Container config={availableSpaceReport.containerConfig}>
      <LineChart
        data={availableSpaceReport.data}
        x="date"
        xScale={scaleUtc()}
        series={availableSpaceReport.chartConfig}
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
    <Chart.Container config={usedSpaceReport.containerConfig}>
      <LineChart
        data={usedSpaceReport.data}
        x="date"
        xScale={scaleUtc()}
        series={usedSpaceReport.chartConfig}
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
    <Chart.Container config={usedSpacePctReport.containerConfig}>
      <LineChart
        data={usedSpacePctReport.data}
        x="date"
        xScale={scaleUtc()}
        series={usedSpacePctReport.chartConfig}
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
