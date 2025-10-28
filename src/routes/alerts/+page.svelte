<script lang="ts" module>
  import { z } from "zod/v4";

  const formSchema = z.object({
    name: z.string().min(2).max(50),
    frequency_days: z.number().min(1).max(365),
    threshold: z.number().min(1),
    alertRule: z.string(),
    diskName: z.string().min(1),
  });
</script>

<script lang="ts">
  import { defaults, superForm } from "sveltekit-superforms";
  import { zod4 } from "sveltekit-superforms/adapters";
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
  import { toast } from "svelte-sonner";
  import * as Form from "$lib/components/ui/form/index.js";
  import { type Disk } from "$lib/types";

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

  let availableDisks = $state<string[]>([]);

  type AlertSetting = {
    id: number;
    name: string;
    last_check: string;
    frequency_days: number;
    enabled: boolean;
    created_at: string;
    updated_at: string;
    rule: {
      [key: string]: AlertRule;
    };
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

  let alertSettings = $state<AlertSetting[]>([
    // {
    //   id: 1,
    //   name: "Low Disk Space on C:",
    //   last_check: date,
    //   frequency_days: 7,
    //   enabled: true,
    //   created_at: date,
    //   updated_at: date,
    //   rule: {
    //     disk_name: "C:",
    //     threshold_pct: 15.0,
    //   },
    // },
  ]);

  let isDialogOpen = $state(false);

  async function getAlerts() {
    const alerts = await invoke<AlertSetting[]>("get_alerts");
    console.log(alerts);
    alertSettings = alerts.map((alert) => ({
      ...alert,
      last_check: alert.last_check || alert.created_at,
    }));
  }

  onMount(async () => {
    await getAlerts();
    const disks = await invoke<Disk[]>("get_disks_rust");
    availableDisks = disks.map((d) => d.name);
  });

  const triggerContent = $derived(
    alertRuleOptions.find((f) => f.value === $formData.alertRule)?.label ??
      "Select a rule"
  );

  async function onCreateAlert() {
    const selectedRuleOption = $formData.alertRule;
    console.log(selectedRuleOption);
    const rule: AlertRule =
      selectedRuleOption === "DiskAvailableSpaceBelowPct"
        ? {
            disk_name: $formData.diskName,
            threshold_pct: parseFloat($formData.threshold.toString()),
          }
        : selectedRuleOption === "DiskAvailableSpaceBelowBytes"
          ? {
              disk_name: $formData.diskName,
              threshold_bytes: parseInt($formData.threshold.toString()),
            }
          : {
              disk_name: $formData.diskName,
              change_pct: parseFloat($formData.threshold.toString()),
            };

    await invoke("add_alert_simplify", {
      alert: {
        name: $formData.name,
        frequency_days: $formData.frequency_days,
        rule: {
          [selectedRuleOption]: rule,
        },
      },
    });

    const date = new Date().toISOString();
    alertSettings = [
      ...alertSettings,
      {
        id: Date.now(),
        name: $formData.name,
        last_check: date,
        frequency_days: $formData.frequency_days,
        enabled: true,
        created_at: date,
        updated_at: date,
        rule: {
          [selectedRuleOption]: rule,
        },
      },
    ];

    isDialogOpen = false;
  }

  const form = superForm(defaults(zod4(formSchema)), {
    validators: zod4(formSchema),
    SPA: true,
    onUpdate: async ({ form: f }) => {
      if (f.valid) {
        await onCreateAlert();
        // toast.success(`Alert "${f.data.name}" created successfully.`);
        toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
      } else {
        toast.error("Please fix the errors in the form.");
      }
    },
  });

  const { form: formData, enhance } = form;

  function submitForm() {
    form.submit();
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
  <Dialog.Root bind:open={isDialogOpen}>
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
      <form method="POST" class="space-y-6 h-72 overflow-y-auto" use:enhance>
        <Form.Field {form} name="name">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Name</Form.Label>
              <Input {...props} bind:value={$formData.name} />
            {/snippet}
          </Form.Control>
          <Form.Description>The name of the alert setting.</Form.Description>
          <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="frequency_days">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Frequency</Form.Label>
              <Input
                type="number"
                {...props}
                bind:value={$formData.frequency_days}
              />
            {/snippet}
          </Form.Control>
          <Form.Description
            >The frequency of the alert setting checking.</Form.Description
          >
          <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="threshold">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Threshold</Form.Label>
              <Input
                type="number"
                {...props}
                bind:value={$formData.threshold}
              />
            {/snippet}
          </Form.Control>
          <Form.Description
            >The threshold value to be hit for triggering an alert.</Form.Description
          >
          <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="alertRule">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Alert Rule</Form.Label>

              <Select.Root
                type="single"
                name="alertRule"
                bind:value={$formData.alertRule}
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
            {/snippet}
          </Form.Control>
          <Form.Description
            >The rule for the alert setting checking.</Form.Description
          >
          <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="diskName">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Disk Name</Form.Label>
              <Select.Root
                {...props}
                type="single"
                name="diskName"
                bind:value={$formData.diskName}
              >
                <Select.Trigger class="w-[280px]">
                  {$formData.diskName || "Select a disk"}
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    <Select.Label>Disk</Select.Label>
                    {#each availableDisks as disk}
                      <Select.Item value={disk} label={disk}>
                        {disk}
                      </Select.Item>
                    {/each}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            {/snippet}
          </Form.Control>
          <Form.Description
            >The name of the disk to be alerted.</Form.Description
          >
          <Form.FieldErrors />
        </Form.Field>
      </form>
      <Dialog.Footer>
        <Button type="submit" onclick={submitForm}>Create</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
</div>

{#if alertSettings.length > 0}
  <div class="space-y-4">
    {#each alertSettings as alert}
      {@const ruleType = Object.keys(alert.rule)[0]}
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
          {#if ruleType === "DiskAvailableSpaceBelowPct"}
            Alert when disk "{alert.rule[ruleType].disk_name}" has available
            space below {(alert.rule[ruleType] as any).threshold_pct}%.
          {:else if ruleType === "DiskAvailableSpaceBelowBytes"}
            Alert when disk "{alert.rule[ruleType].disk_name}" has available
            space below {toGB((alert.rule[ruleType] as any).threshold_bytes)} GB.
          {:else if ruleType === "DiskAvailableSpaceChangeInPct"}
            Alert when disk "{alert.rule[ruleType].disk_name}" changes available
            space by {(alert.rule[ruleType] as any).change_pct}%.
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
