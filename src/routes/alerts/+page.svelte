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

  let searchQuery = $state("");

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

  let alertSettings = $state<AlertSetting[]>([]);

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
  <Button size="sm">
    <Plus />
    Create Alert
  </Button>
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
