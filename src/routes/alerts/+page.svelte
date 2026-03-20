<script lang="ts" module>
  import { z } from "zod/v4";

  const formSchema = z.object({
    name: z.string().min(2).max(50),
    frequency_days: z.number().min(1).max(365),
    threshold: z.number().min(1),
    alertRule: z.string(),
    diskName: z.string().min(1),
  });

  const updateFormSchema = z.object({
    id: z.number().min(1),
    name: z.string().min(2).max(50),
    frequency_days: z.number().min(1).max(365),
    threshold: z.number().min(1),
    alertRule: z.string(),
    diskName: z.string().min(1),
    enabled: z.boolean(),
  });
</script>

<script lang="ts">
  import { defaults, superForm } from "sveltekit-superforms";
  import { zod4 } from "sveltekit-superforms/adapters";
  import * as Empty from "$lib/components/ui/empty/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Bell, History, Pencil, Plus, Trash, X } from "@lucide/svelte";
  import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";
  import { toGB } from "$lib/utils";
  import { invoke } from "@tauri-apps/api/core";
  import { onMount } from "svelte";
  import * as InputGroup from "$lib/components/ui/input-group/index.js";
  import SearchIcon from "@lucide/svelte/icons/search";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input";
  import * as Select from "$lib/components/ui/select/index.js";
  import { toast } from "svelte-sonner";
  import * as Form from "$lib/components/ui/form/index.js";
  import type { Disk, Settings } from "$lib/types";
  import { Switch } from "$lib/components/ui/switch";
  import { getSettings } from "$lib/utils.tauri";
  import { ALERTS, t } from "@/i18n/translations.svelte";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";

  let searchQuery = $state("");
  let currentSelectedAlertForUpdate = $state<AlertSetting>();

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
  let settings = $state<Settings | null>(null);

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

  let alertSettings = $state<AlertSetting[]>([]);

  let filteredAlerts = $derived(
    alertSettings.filter((alert) =>
      alert.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );

  async function changeAlertStatus(id: number, enabled: boolean) {
    await invoke("change_alert_status", { alertId: id, enable: enabled });
  }

  let isCreateDialogOpen = $state(false);
  let isEditDialogOpen = $state(false);
  let isDeleteDialogOpen = $state(false);

  async function getAlerts() {
    const alerts = await invoke<AlertSetting[]>("get_alerts");
    console.log(alerts);
    alertSettings = alerts.map((alert) => ({
      ...alert,
      last_check: alert.last_check || alert.created_at,
    }));
  }

  onMount(async () => {
    settings = await getSettings();
    await getAlerts();
    const disks = await invoke<Disk[]>("get_disks_rust");
    availableDisks = disks.map((d) => d.name);
  });

  const triggerContent = $derived(
    alertRuleOptions.find((f) => f.value === $formData.alertRule)?.label ??
      t(ALERTS.LABEL_SELECT_RULE),
  );

  const editTriggerContent = $derived(
    alertRuleOptions.find((f) => f.value === $editFormData.alertRule)?.label ??
      t(ALERTS.LABEL_SELECT_RULE),
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

    isCreateDialogOpen = false;
  }

  async function onEditAlert() {
    const selectedRuleOption = $editFormData.alertRule;
    console.log(selectedRuleOption);
    const rule: AlertRule =
      selectedRuleOption === "DiskAvailableSpaceBelowPct"
        ? {
            disk_name: $editFormData.diskName,
            threshold_pct: parseFloat($editFormData.threshold.toString()),
          }
        : selectedRuleOption === "DiskAvailableSpaceBelowBytes"
          ? {
              disk_name: $editFormData.diskName,
              threshold_bytes: parseInt($editFormData.threshold.toString()),
            }
          : {
              disk_name: $editFormData.diskName,
              change_pct: parseFloat($editFormData.threshold.toString()),
            };

    const date = new Date().toISOString();
    await invoke("update_alert", {
      alert: {
        id: $editFormData.id,
        name: $editFormData.name,
        frequency_days: $editFormData.frequency_days,
        rule: {
          [selectedRuleOption]: rule,
        },
        enabled: $editFormData.enabled, // to enable on UI
        last_check: date, // Make these unquired by using DTO
        created_at: date,
        updated_at: date,
      },
    });

    const indexInUI = alertSettings.findIndex((x) => x.id === $editFormData.id);

    alertSettings[indexInUI] = {
      id: $editFormData.id,
      name: $editFormData.name,
      last_check: date,
      frequency_days: $editFormData.frequency_days,
      enabled: $editFormData.enabled,
      created_at: date,
      updated_at: date,
      rule: {
        [selectedRuleOption]: rule,
      },
    };

    isEditDialogOpen = false;
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
        toast.error(t(ALERTS.FORM_ERROR));
      }
    },
  });

  const { form: formData, enhance } = form;

  const editForm = superForm(defaults(zod4(updateFormSchema)), {
    validators: zod4(updateFormSchema),
    SPA: true,
    onUpdate: async ({ form: f }) => {
      if (f.valid) {
        await onEditAlert();
        toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
      } else {
        toast.error(t(ALERTS.FORM_ERROR));
      }
    },
  });

  const { form: editFormData, enhance: enhance2 } = editForm;

  function submitForm() {
    form.submit();
  }

  function submitEditForm() {
    editForm.submit();
  }

  async function deleteAlert() {
    await invoke("delete_alert", {
      alertId: currentSelectedAlertForUpdate?.id,
    });

    isDeleteDialogOpen = false;

    alertSettings = alertSettings.filter(
      (x) => x.id != currentSelectedAlertForUpdate?.id,
    );

    toast.success(
      `Successfully deleted alert '${currentSelectedAlertForUpdate?.name}'`,
    );
  }
</script>

<div class="mb-4 flex gap-2 items-center">
  {#if settings?.searchBar == true}
    <InputGroup.Root>
      <InputGroup.Input
        bind:value={searchQuery}
        placeholder={t(ALERTS.SEARCH)}
      />
      <InputGroup.Addon>
        <SearchIcon />
      </InputGroup.Addon>

      {#if searchQuery}
        <InputGroup.Addon align="inline-end">
          <InputGroup.Button onclick={() => (searchQuery = "")}>
            <X />
          </InputGroup.Button>
        </InputGroup.Addon>
      {/if}
    </InputGroup.Root>
  {/if}

  <Dialog.Root bind:open={isCreateDialogOpen}>
    <Dialog.Trigger
      ><Button>
        <Plus />
        {t(ALERTS.CREATE_ALERT_BUTTON)}
      </Button></Dialog.Trigger
    >
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>{t(ALERTS.CREATE_DIALOG_TITLE)}</Dialog.Title>
        <Dialog.Description>
          {t(ALERTS.CREATE_DIALOG_DESCRIPTION)}
        </Dialog.Description>
      </Dialog.Header>
      <form method="POST" class="space-y-6 h-72 overflow-y-auto" use:enhance>
        <Form.Field {form} name="name">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>{t(ALERTS.CREATE_DIALOG_NAME_LABEL)}</Form.Label>
              <Input {...props} bind:value={$formData.name} />
            {/snippet}
          </Form.Control>
          <Form.Description
            >{t(ALERTS.CREATE_DIALOG_NAME_DESCRIPTION)}</Form.Description
          >
          <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="frequency_days">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>{t(ALERTS.CREATE_DIALOG_FREQ_LABEL)}</Form.Label>
              <Input
                type="number"
                {...props}
                bind:value={$formData.frequency_days}
              />
            {/snippet}
          </Form.Control>
          <Form.Description
            >{t(ALERTS.CREATE_DIALOG_FREQ_DESCRIPTION)}</Form.Description
          >
          <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="threshold">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>{t(ALERTS.CREATE_DIALOG_THRESHOLD_LABEL)}</Form.Label>
              <Input
                type="number"
                {...props}
                bind:value={$formData.threshold}
              />
            {/snippet}
          </Form.Control>
          <Form.Description
            >{t(ALERTS.CREATE_DIALOG_THRESHOLD_DESCRIPTION)}</Form.Description
          >
          <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="alertRule">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>{t(ALERTS.CREATE_DIALOG_RULE_LABEL)}</Form.Label>

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
                    <Select.Label
                      >{t(ALERTS.CREATE_DIALOG_RULE_LABEL)}</Select.Label
                    >
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
            >{t(ALERTS.CREATE_DIALOG_RULE_DESCRIPTION)}</Form.Description
          >
          <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="diskName">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>{t(ALERTS.CREATE_DIALOG_DISKNAME_LABEL)}</Form.Label>
              <Select.Root
                {...props}
                type="single"
                name="diskName"
                bind:value={$formData.diskName}
              >
                <Select.Trigger class="w-[280px]">
                  {$formData.diskName ||
                    t(ALERTS.CREATE_DIALOG_DISKNAME_LABEL_SELECT)}
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    <Select.Label
                      >{t(
                        ALERTS.CREATE_DIALOG_DISKNAME_LABEL_DROPDOWN,
                      )}</Select.Label
                    >
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
            >{t(ALERTS.CREATE_DIALOG_DISKNAME_DESCRIPTION)}</Form.Description
          >
          <Form.FieldErrors />
        </Form.Field>
      </form>
      <Dialog.Footer>
        <Button type="submit" onclick={submitForm}
          >{t(ALERTS.CREATE_DIALOG_CREATE_BUTTON)}</Button
        >
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>

  <Button size="icon" variant="outline" href="/alerts/history">
    <History />
  </Button>

  <!-- Edit dialog -->
  <Dialog.Root bind:open={isEditDialogOpen}>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Edit {currentSelectedAlertForUpdate?.name}</Dialog.Title>
        <Dialog.Description>
          Configure the settings for your new alert below.
        </Dialog.Description>
      </Dialog.Header>
      <form method="POST" class="space-y-6 h-72 overflow-y-auto" use:enhance2>
        <Form.Field form={editForm} name="name">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Name</Form.Label>
              <Input {...props} bind:value={$editFormData.name} />
            {/snippet}
          </Form.Control>
          <Form.Description>The name of the alert setting.</Form.Description>
          <Form.FieldErrors />
        </Form.Field>
        <Form.Field form={editForm} name="frequency_days">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Frequency</Form.Label>
              <Input
                type="number"
                {...props}
                bind:value={$editFormData.frequency_days}
              />
            {/snippet}
          </Form.Control>
          <Form.Description
            >The frequency of the alert setting checking.</Form.Description
          >
          <Form.FieldErrors />
        </Form.Field>
        <Form.Field form={editForm} name="threshold">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Threshold</Form.Label>
              <Input
                type="number"
                {...props}
                bind:value={$editFormData.threshold}
              />
            {/snippet}
          </Form.Control>
          <Form.Description
            >The threshold value to be hit for triggering an alert.</Form.Description
          >
          <Form.FieldErrors />
        </Form.Field>
        <Form.Field form={editForm} name="alertRule">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Alert Rule</Form.Label>

              <Select.Root
                type="single"
                name="alertRule"
                bind:value={$editFormData.alertRule}
              >
                <Select.Trigger class="w-[280px]">
                  {editTriggerContent}
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
        <Form.Field form={editForm} name="diskName">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Disk Name</Form.Label>
              <Select.Root
                {...props}
                type="single"
                name="diskName"
                bind:value={$editFormData.diskName}
              >
                <Select.Trigger class="w-[280px]">
                  {$editFormData.diskName || "Select a disk"}
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
        <Button type="submit" onclick={submitEditForm}>Edit</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>

  <!-- Remove alert dialog -->
  <Dialog.Root bind:open={isDeleteDialogOpen}>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Delete {currentSelectedAlertForUpdate?.name}</Dialog.Title
        >
        <Dialog.Description>
          Are you sure to delete this alert?
        </Dialog.Description>
      </Dialog.Header>

      <Dialog.Footer>
        <Button type="submit" onclick={deleteAlert} variant="destructive"
          >Delete</Button
        >
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
</div>

{#if alertSettings.length > 0}
  <div class="space-y-4">
    {#each filteredAlerts as alert}
      {@const ruleType = Object.keys(alert.rule)[0]}
      <div
        class="flex gap-2 p-4 border rounded-md justify-between items-center"
      >
        <div>
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
              space below {toGB((alert.rule[ruleType] as any).threshold_bytes)}.
            {:else if ruleType === "DiskAvailableSpaceChangeInPct"}
              Alert when disk "{alert.rule[ruleType].disk_name}" changes
              available space by {(alert.rule[ruleType] as any).change_pct}%.
            {/if}
          </p>
        </div>
        <div class="flex items-center gap-4">
          <ButtonGroup.Root>
            <Button
              variant="outline"
              size="icon"
              onclick={() => {
                currentSelectedAlertForUpdate = alert;
                isDeleteDialogOpen = true;
              }}
            >
              <Trash />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onclick={() => {
                const key: string = Object.keys(alert.rule)[0]!;

                const rule = alert.rule[key] as any;

                // Use the rule key (discriminant) to determine shape
                if (key === "DiskAvailableSpaceBelowPct") {
                  $editFormData.threshold = (
                    rule as DiskAvailableSpaceBelowPct
                  ).threshold_pct;
                } else if (key === "DiskAvailableSpaceBelowBytes") {
                  $editFormData.threshold = (
                    rule as DiskAvailableSpaceBelowBytes
                  ).threshold_bytes;
                } else if (key === "DiskAvailableSpaceChangeInPct") {
                  $editFormData.threshold = (
                    rule as DiskAvailableSpaceChangeInPct
                  ).change_pct;
                } else {
                  $editFormData.threshold = 0;
                }

                currentSelectedAlertForUpdate = alert;
                $editFormData.alertRule = key;
                $editFormData.id = alert.id;
                $editFormData.diskName = alert.rule[key].disk_name;
                $editFormData.name = alert.name;
                $editFormData.enabled = alert.enabled;
                $editFormData.frequency_days = alert.frequency_days;
                isEditDialogOpen = true;
              }}
            >
              <Pencil />
            </Button>
          </ButtonGroup.Root>

          <Switch
            checked={alert.enabled}
            onCheckedChange={(newState) =>
              changeAlertStatus(alert.id, newState)}
          />
        </div>
      </div>
    {/each}
  </div>
{:else}
  <Empty.Root>
    <Empty.Header>
      <Empty.Media variant="icon">
        <Bell />
      </Empty.Media>
      <Empty.Title>{t(ALERTS.EMPTY_TITLE)}</Empty.Title>
      <Empty.Description>{t(ALERTS.EMPTY_DESCRIPTION)}</Empty.Description>
    </Empty.Header>
    <Empty.Content>
      <div class="flex gap-2">
        <Button onclick={() => (isCreateDialogOpen = true)}
          >{t(ALERTS.CREATE_ALERT_BUTTON)}</Button
        >
        <Button variant="outline">Import Alert</Button>
      </div>
    </Empty.Content>
    <Button variant="link" class="text-muted-foreground" size="sm">
      <a href="#/">
        {t(ALERTS.EMPTY_LEARN_MORE)}
        <ArrowUpRightIcon class="inline" />
      </a>
    </Button>
  </Empty.Root>
{/if}
