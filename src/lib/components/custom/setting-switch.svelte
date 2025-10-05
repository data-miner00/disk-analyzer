<script lang="ts">
  import { Switch } from "$lib/components/ui/switch";

  type Props = {
    title: string;
    description: string;
    initialValue: boolean;
    onChange: (newValue: boolean) => void;
    // Add icon
  };

  let props: Props = $props();
  let uid = $props.id();
  let isChecked = $state(props.initialValue);
</script>

<div
  class="flex items-center py-4 justify-between px-6 rounded-lg border border-solid border-gray-200"
>
  <div>
    <p class="font-semibold">{props.title}</p>
    <p>{props.description}</p>
  </div>
  <div>
    <Switch bind:checked={isChecked} />
  </div>
</div>
