<script lang="ts">
import { Switch } from "$lib/components/ui/switch";

type Props = {
  title: string;
  description: string;
  value: boolean;
  onChange: (newValue: boolean) => void;
  // Add icon
};

let {
  value: initialValue = $bindable(),
  title,
  description,
  onChange,
}: Props = $props();

$effect(() => {
  onChange(initialValue);
});

let uid = $props.id();
</script>

<div
  class="flex items-center py-4 justify-between px-6 rounded-lg border border-solid border-gray-200"
>
  <div>
    <p class="font-semibold">{title}</p>
    <p>{description}</p>
  </div>
  <div>
    <Switch bind:checked={initialValue} />
  </div>
</div>
