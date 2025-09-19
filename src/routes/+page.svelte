<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Menubar from "$lib/components/ui/menubar";
  import * as Avatar from "$lib/components/ui/avatar";
  import { Bell } from "@lucide/svelte";

  let name = $state("");
  let diskInfo = $state<string[]>([]);

  async function greet(event: Event) {
    event.preventDefault();
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    const greetMsg = await invoke("greet", { name });
    window.alert(greetMsg);
  }

  async function get_disks(event: Event) {
    event.preventDefault();
    const disks = await invoke("get_disks");
    diskInfo = disks as string[];
  }

  async function get_folder_size(event: Event) {
    event.preventDefault();
    const size = await invoke("folder_size", { path: name });
    window.alert(`Folder size: ${size} bytes`);
  }
</script>

<header class="flex justify-between items-center">
  <div class="flex items-center gap-1">
    <div
      class="bg-gray-300 shadow-xs flex h-9 w-9 items-center gap-1 rounded-md border p-1"
    ></div>
    <Menubar.Root class="w-fit">
      <Menubar.Menu>
        <Menubar.Trigger>File</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>
            New Tab
            <Menubar.Shortcut>⌘T</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Item>New Window</Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item>Share</Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item>Print</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>Edit</Menubar.Trigger>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>View</Menubar.Trigger>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>Settings</Menubar.Trigger>
      </Menubar.Menu>
    </Menubar.Root>
  </div>

  <Bell color="#999" strokeWidth={2} size={20} />
  <Avatar.Root>
    <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
    <Avatar.Fallback>CN</Avatar.Fallback>
  </Avatar.Root>
</header>

<main class="container">
  <form class="row" onsubmit={greet}>
    <input id="greet-input" placeholder="Enter a name..." bind:value={name} />
    <Button type="submit">Greet</Button>
  </form>
  <form class="row" onsubmit={get_folder_size}>
    <Button type="submit">Get folder size</Button>
  </form>
  <form class="row" onsubmit={get_disks}>
    <Button type="submit">Get disk info</Button>
  </form>

  {#each diskInfo as disk}
    <p>{disk}</p>
  {/each}

  <!-- Disk usage (lower is better) -->
  <meter value="75" min="0" max="100" low="70" high="90" optimum="0">75%</meter>

  <!-- Battery level (higher is better) -->
  <meter value="35" min="0" max="100" low="20" high="60" optimum="100"
    >35%</meter
  >

  <!-- CPU usage (lower is better) -->
  <meter value="82" min="0" max="100" low="60" high="80" optimum="0">82%</meter>
</main>

<style lang="postcss">
  @reference "tailwindcss";
  :global(html) {
    background-color: theme(--color-gray-100);
  }
</style>
