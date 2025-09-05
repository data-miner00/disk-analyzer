<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";
  import Button from "$lib/components/ui/button/button.svelte";

  let name = $state("");
  let greetMsg = $state("");
  let diskInfo = $state<string[]>([]);

  async function greet(event: Event) {
    event.preventDefault();
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    greetMsg = await invoke("greet", { name });
  }

  async function get_disks(event: Event) {
    event.preventDefault();
    const disks = await invoke("get_disks");
    diskInfo = disks as string[];
  }
</script>

<main class="container">
  <h1 class="text-3xl font-bold underline">Disk Analyzer</h1>

  <form class="row" onsubmit={greet}>
    <input id="greet-input" placeholder="Enter a name..." bind:value={name} />
    <Button type="submit">Greet</Button>
  </form>
  <p>{greetMsg}</p>

  <form class="row" onsubmit={get_disks}>
    <Button type="submit">Get disk info</Button>
  </form>

  {#each diskInfo as disk}
    <p>{disk}</p>
  {/each}
</main>

<style lang="postcss">
  @reference "tailwindcss";
  :global(html) {
    background-color: theme(--color-gray-100);
  }
</style>
