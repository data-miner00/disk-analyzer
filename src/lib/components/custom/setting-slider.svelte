<script lang="ts">
  import Slider from "../ui/slider/slider.svelte";

  type Props = {
    title: string;
    description: string;
    initialValue: number;
    min: number;
    max: number;
    step?: number;
    unit: string;
    onChange: (newValue: number) => void;
  };

  const props: Props = $props();

  let value = $state(props.initialValue);
</script>

<div
  class="flex flex-col py-4 justify-between px-6 rounded-lg border border-solid border-gray-200"
>
  <div class="mb-4">
    <p class="font-semibold">{props.title}</p>
    <p>{props.description}</p>
  </div>
  <div class="flex gap-4 items-center">
    <div class="w-[500px]">
      <Slider
        type="single"
        bind:value
        max={props.max}
        min={props.min}
        step={props.step ?? 1}
      />
    </div>
    <div>
      {value}
      {props.unit}
    </div>
  </div>
</div>
