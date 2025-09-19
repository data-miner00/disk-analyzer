<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Menubar from "$lib/components/ui/menubar";
  import * as Avatar from "$lib/components/ui/avatar";
  import { Bell, HardDrive } from "@lucide/svelte";
  import { onMount } from "svelte";

  let hostname = $state("Unknown");
  let name = $state("");
  let diskInfo = $state<Disk[]>([]);
  let isLoading = $state(true);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    const greetMsg = await invoke("greet", { name: hostname });
    console.log(hostname);
    window.alert(greetMsg);
  }

  type Disk = {
    name: string;
    total_space: number;
    available_space: number;
  };

  async function get_disks() {
    const disks = await invoke("get_disks");
    diskInfo = disks as Disk[];
  }

  async function get_folder_size(event: Event) {
    event.preventDefault();
    const size = await invoke("folder_size", { path: name });
    window.alert(`Folder size: ${size} bytes`);
  }

  async function get_hostname() {
    const retrieved_hostname = await invoke("hostname");
    hostname = retrieved_hostname as string;
  }

  onMount(async () => {
    await get_hostname();
    await get_disks();
    isLoading = false;
  });

  function toGB(bytes: number): string {
    return (bytes / 1024 ** 3).toFixed(2) + " GB";
  }

  function toPercentage(used: number, total: number): number {
    return (used / total) * 100;
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

  <button class="flex items-center gap-4" onclick={greet}>
    <div>
      <Bell color="#999" strokeWidth={2} size={20} />
    </div>
    <div class="text-end leading-4">
      <span class="block">{hostname}</span>
      <span class="block text-sm text-gray-400">hostname</span>
    </div>
    <Avatar.Root>
      <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
      <Avatar.Fallback>CN</Avatar.Fallback>
    </Avatar.Root>
  </button>
</header>

<main class="container mt-6">
  <h2 class="font-semibold text-lg mb-4">{diskInfo.length} disk(s)</h2>

  <ul class="flex gap-4 items-center flex-wrap">
    {#each diskInfo as disk}
      <li>
        <article class="flex gap-4 border p-4 rounded-md shadow-xs">
          <div class="pt-1">
            <HardDrive color="#999" strokeWidth={2} size={20} />
          </div>
          <div>
            <div class="font-semibold">{disk.name}</div>
            <div>
              {toGB(disk.total_space - disk.available_space)} / {toGB(
                disk.total_space
              )}
            </div>
            <meter
              value={toPercentage(
                disk.total_space - disk.available_space,
                disk.total_space
              )}
              min="0"
              max="100"
              low="30"
              high="90"
              optimum="0"
              >{toPercentage(
                disk.total_space - disk.available_space,
                disk.total_space
              )}%</meter
            >
          </div>
        </article>
      </li>
    {/each}
  </ul>
</main>

<style lang="postcss">
  @reference "tailwindcss";
  :global(html) {
    background-color: theme(--color-gray-100);
  }
</style>
