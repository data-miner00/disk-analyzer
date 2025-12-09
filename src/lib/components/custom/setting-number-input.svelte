<script lang="ts">
  import { Button } from "../ui/button";
  import { Input } from "../ui/input";
  import { Plus, Minus } from "@lucide/svelte";

  type Props = {
    title: string;
    description: string;
    placeholder: string;
    value: number;
    min: number;
    max: number;
    // Add icon
  };

  let {
    title,
    description,
    placeholder,
    value = $bindable(),
    min,
    max,
  }: Props = $props();

  function decrement() {
    if (value > min) {
      value--;
    }
  }

  function increment() {
    if (value < max) {
      value++;
    }
  }
</script>

<div
  class="flex flex-col py-4 justify-between px-6 rounded-lg border border-solid border-gray-200"
>
  <div class="mb-4">
    <p class="font-semibold">{title}</p>
    <p>{description}</p>
  </div>
  <div class="flex items-center gap-2">
    <Button class="cursor-pointer" variant="outline" onclick={decrement}>
      <Minus />
    </Button>
    <div>
      <Input {min} {max} bind:value type="number" {placeholder} />
    </div>
    <Button class="cursor-pointer" variant="outline" onclick={increment}>
      <Plus />
    </Button>
  </div>
</div>
