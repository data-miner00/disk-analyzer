<script lang="ts">
  import * as Empty from "$lib/components/ui/empty/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Bell, Plus } from "@lucide/svelte";
  import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";
  import { toGB } from "$lib/utils";
  import { invoke } from "@tauri-apps/api/core";
  import { onMount } from "svelte";
  import * as InputGroup from "$lib/components/ui/input-group/index.js";
  import SearchIcon from "@lucide/svelte/icons/search";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Label } from "$lib/components/ui/label";
  import { Input } from "$lib/components/ui/input";
  import * as Select from "$lib/components/ui/select/index.js";

  let searchQuery = $state("");

  type SelectOption = {
    label: string;
    value: string;
  };

  const alertRuleOptions: SelectOption[] = [
    {
      label: "Disk Available Space Below %",
      value: "DiskAvailableSpaceBelowPct",
    },
    {
      label: "Disk Available Space Below Bytes",
      value: "DiskAvailableSpaceBelowBytes",
    },
    {
      label: "Disk Available Space Change In %",
      value: "DiskAvailableSpaceChangeInPct",
    },
  ] as const;

  type AlertSetting = {
    id: number;
    name: string;
    last_check: string;
    frequency_days: number;
    enabled: boolean;
    created_at: string;
    updated_at: string;
    rule: AlertRule;
  };

  type DiskAvailableSpaceBelowPct = {
    disk_name: string;
    threshold_pct: number;
  };

  type DiskAvailableSpaceBelowBytes = {
    disk_name: string;
    threshold_bytes: number;
  };

  type DiskAvailableSpaceChangeInPct = {
    disk_name: string;
    change_pct: number;
  };

  type AlertRule =
    | DiskAvailableSpaceBelowPct
    | DiskAvailableSpaceBelowBytes
    | DiskAvailableSpaceChangeInPct;

  const date = new Date().toISOString();

  let alertSettings = $state<AlertSetting[]>([
    {
      id: 1,
      name: "Low Disk Space on C:",
      last_check: date,
      frequency_days: 7,
      enabled: true,
      created_at: date,
      updated_at: date,
      rule: {
        disk_name: "C:",
        threshold_pct: 15.0,
      },
    },
    {
      id: 1,
      name: "Low Disk Space on C:",
      last_check: date,
      frequency_days: 7,
      enabled: true,
      created_at: date,
      updated_at: date,
      rule: {
        disk_name: "C:",
        threshold_pct: 15.0,
      },
    },
  ]);

  async function addAlert() {
    await invoke("add_alert", {
      alert: {
        name: "New Alert",
        frequency_days: 7,
        enabled: true,
        rule: {
          DiskAvailableSpaceBelowPct: {
            disk_name: "C:",
            threshold_pct: 10.0,
          },
        },
        id: 0,
        last_check: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    });
  }

  async function getAlerts() {
    const alerts = await invoke("get_alerts");
    console.log(alerts);
  }

  onMount(async () => {
    await addAlert();
    await getAlerts();
  });

  let name = $state("");
  let frequency_days = $state(7);
  let selectedRuleOption = $state("");
  let thresholdValue = $state(10);
  let diskName = $state("");

  const triggerContent = $derived(
    alertRuleOptions.find((f) => f.value === selectedRuleOption)?.label ??
      "Select a rule"
  );

  async function onCreateAlert() {
    const rule: AlertRule =
      selectedRuleOption === "DiskAvailableSpaceBelowPct"
        ? {
            disk_name: diskName,
            threshold_pct: parseFloat(thresholdValue.toString()),
          }
        : selectedRuleOption === "DiskAvailableSpaceBelowBytes"
          ? {
              disk_name: diskName,
              threshold_bytes: parseInt(thresholdValue.toString()),
            }
          : {
              disk_name: diskName,
              change_pct: parseFloat(thresholdValue.toString()),
            };

    await invoke("add_alert", {
      alert: {
        name,
        frequency_days,
        enabled: true,
        rule: {
          [selectedRuleOption]: rule,
        },
      },
    });
  }
</script>

<div class="my-4 flex gap-2 items-center">
  <InputGroup.Root>
    <InputGroup.Input bind:value={searchQuery} placeholder="Search..." />
    <InputGroup.Addon>
      <SearchIcon />
    </InputGroup.Addon>
    <InputGroup.Addon align="inline-end">
      <InputGroup.Button>Search</InputGroup.Button>
    </InputGroup.Addon>
  </InputGroup.Root>
  <Dialog.Root>
    <Dialog.Trigger
      ><Button>
        <Plus />
        Create Alert
      </Button></Dialog.Trigger
    >
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Create New Alert</Dialog.Title>
        <Dialog.Description>
          Configure the settings for your new alert below.
        </Dialog.Description>
      </Dialog.Header>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right">Name</Label>
          <Input id="name" bind:value={name} class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="username" class="text-right">Rule</Label>
          <Select.Root
            type="single"
            name="alertRule"
            bind:value={selectedRuleOption}
          >
            <Select.Trigger class="w-[280px]">
              {triggerContent}
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                <Select.Label>Rules</Select.Label>
                {#each alertRuleOptions as option (option.value)}
                  <Select.Item value={option.value} label={option.label}>
                    {option.label}
                  </Select.Item>
                {/each}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="frequency" class="text-right">Frequency</Label>
          <Input
            id="frequency"
            bind:value={frequency_days}
            type="number"
            class="col-span-3"
          />
        </div>
        {#if selectedRuleOption === "DiskAvailableSpaceBelowPct"}
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="threshold" class="text-right">Threshold</Label>
            <Input
              id="threshold"
              bind:value={thresholdValue}
              class="col-span-3"
            />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="diskName" class="text-right">Disk Name</Label>
            <Input id="diskName" bind:value={diskName} class="col-span-3" />
          </div>
        {:else if selectedRuleOption === "DiskAvailableSpaceBelowBytes"}
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="threshold" class="text-right">Threshold</Label>
            <Input
              id="threshold"
              bind:value={thresholdValue}
              class="col-span-3"
            />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="diskName" class="text-right">Disk Name</Label>
            <Input id="diskName" bind:value={diskName} class="col-span-3" />
          </div>
        {/if}
      </div>
      <Dialog.Footer>
        <Button type="submit" onclick={onCreateAlert}>Create</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
</div>

{#if alertSettings.length > 0}
  <div class="space-y-4">
    {#each alertSettings as alert}
      <div class="p-4 border rounded-md">
        <h3 class="text-lg font-semibold">{alert.name}</h3>
        <p class="text-sm text-muted-foreground">
          Last Check: {new Date(alert.last_check).toLocaleDateString()}
        </p>
        <p class="text-sm text-muted-foreground">
          Frequency: Every {alert.frequency_days} days
        </p>
        <p class="text-sm mt-2">
          Rule:
          {#if "threshold_pct" in alert.rule}
            Alert when disk "{alert.rule.disk_name}" has available space below {alert
              .rule.threshold_pct}%.
          {:else if "threshold_bytes" in alert.rule}
            Alert when disk "{alert.rule.disk_name}" has available space below {toGB(
              alert.rule.threshold_bytes
            )} GB.
          {:else if "change_pct" in alert.rule}
            Alert when disk "{alert.rule.disk_name}" changes available space by {alert
              .rule.change_pct}%.
          {/if}
        </p>
      </div>
    {/each}
  </div>
{:else}
  <Empty.Root>
    <Empty.Header>
      <Empty.Media variant="icon">
        <Bell />
      </Empty.Media>
      <Empty.Title>No Alerts Yet</Empty.Title>
      <Empty.Description>
        You haven't created any alerts yet. Get started by creating your first
        alert.
      </Empty.Description>
    </Empty.Header>
    <Empty.Content>
      <div class="flex gap-2">
        <Button>Create Alert</Button>
        <Button variant="outline">Import Alert</Button>
      </div>
    </Empty.Content>
    <Button variant="link" class="text-muted-foreground" size="sm">
      <a href="#/">
        Learn More <ArrowUpRightIcon class="inline" />
      </a>
    </Button>
  </Empty.Root>
{/if}
