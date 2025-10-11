<script lang="ts">
  import * as Select from "$lib/components/ui/select/index.js";

  type Selectable = {
    value: string;
    label: string;
  };

  type Props = {
    title: string;
    description: string;
    defaultLabel: string;
    options: Selectable[];
    value: string;
    // Add icon
  };

  let {
    title,
    description,
    defaultLabel,
    options,
    value = $bindable(),
  }: Props = $props();
  const triggerContent = $derived(
    options.find((f) => f.value === value)?.label ?? defaultLabel
  );
</script>

<div
  class="flex items-center py-4 justify-between px-6 rounded-lg border border-solid border-gray-200"
>
  <div>
    <p class="font-semibold">{title}</p>
    <p>{description}</p>
  </div>
  <div>
    <Select.Root type="single" name="favoriteFruit" bind:value>
      <Select.Trigger class="w-[180px]">
        {triggerContent}
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <!-- <Select.Label>Fruits</Select.Label> -->
          {#each options as option (option.value)}
            <Select.Item
              value={option.value}
              label={option.label}
              disabled={option.value === "grapes"}
            >
              {option.label}
            </Select.Item>
          {/each}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  </div>
</div>
