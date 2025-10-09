<script lang="ts">
import Slider from "../ui/slider/slider.svelte";

type Props = {
  title: string;
  description: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit: string;
  onChange: (newValue: number) => void;
};

let {
  title,
  description,
  value = $bindable(),
  min,
  max,
  step,
  unit,
  onChange,
}: Props = $props();
</script>

<div
  class="flex flex-col py-4 justify-between px-6 rounded-lg border border-solid border-gray-200"
>
  <div class="mb-4">
    <p class="font-semibold">{title}</p>
    <p>{description}</p>
  </div>
  <div class="flex gap-4 items-center">
    <div class="w-[500px]">
      <Slider type="single" bind:value {max} {min} step={step ?? 1} />
    </div>
    <div>
      {value}
      {unit}
    </div>
  </div>
</div>
