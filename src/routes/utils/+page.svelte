<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";

  let { data } = $props();

  let currentCount = $state(0);
  let path = $state("");
  async function get_folder_size(event: Event) {
    event.preventDefault();
    const size = await invoke("folder_size", { path });
    window.alert(`Folder size: ${size} bytes`);
  }

  async function increment() {
    const newCount = await invoke("increment_counter");
    currentCount = newCount as number;
  }
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<h1 class="text-2xl font-bold mb-4">Utils</h1>

<Input bind:value={path} placeholder="Path to analyze" />

<Button onclick={get_folder_size} class="ml-2">Get</Button>

<hr class="my-3" />

<p>Current count: {currentCount}</p>

<Button onclick={increment}>Increment</Button>
