<script lang="ts">
  import { Button } from "../ui/button";
  import { Input } from "../ui/input";
  type Props = {
    title: string;
    description: string;
    placeholder: string;
    initialValue: number;
    min: number;
    max: number;
    onChange: (newValue: number) => void;
    // Add icon
  };

  let props: Props = $props();
  let value = $state(props.initialValue);

  $effect(() => {
    props.onChange(value);
  });

  function decrement() {
    if (value > props.min) {
      value--;
    }
  }

  function increment() {
    if (value < props.max) {
      value++;
    }
  }
</script>

<div
  class="flex flex-col py-4 justify-between px-6 rounded-lg border border-solid border-gray-200"
>
  <div class="mb-4">
    <p class="font-semibold">{props.title}</p>
    <p>{props.description}</p>
  </div>
  <div class="flex items-center gap-2">
    <Button variant="outline" onclick={decrement}>-</Button>
    <div>
      <Input
        min={props.min}
        max={props.max}
        bind:value
        type="number"
        placeholder={props.placeholder}
      />
    </div>
    <Button variant="outline" onclick={increment}>+</Button>
  </div>
</div>
