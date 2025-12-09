<script lang="ts">
  import * as Menubar from "$lib/components/ui/menubar";
  import { House, Minus, Square, X } from "@lucide/svelte";
  import { invoke } from "@tauri-apps/api/core";

  import { onMount } from "svelte";
  import { getCurrentWindow } from "@tauri-apps/api/window";

  let hostname = $state("Unknown");

  async function get_hostname() {
    const retrieved_hostname = await invoke("hostname");
    hostname = retrieved_hostname as string;
  }

  async function exit_app() {
    await invoke("exit", { code: 0 });
  }

  async function open_file_explorer() {
    await invoke("open_file_explorer", { path: "." });
  }

  onMount(async () => {
    await get_hostname();
  });

  function minimize_window() {
    getCurrentWindow().minimize();
  }

  function maximize_window() {
    getCurrentWindow().toggleMaximize();
  }
</script>

<header
  data-tauri-drag-region
  class="flex justify-between items-center sticky top-0 bg-white z-10 py-2 w-full"
>
  <div class="flex items-center gap-1">
    <div class="shadow-xs h-9 w-9 p-1 rounded-md border">
      <a
        href="/"
        class="flex items-center justify-center w-full h-full hover:bg-gray-100 rounded-md"
      >
        <House size={18} />
      </a>
    </div>
    <Menubar.Root class="w-fit">
      <Menubar.Menu>
        <Menubar.Trigger>Misc</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item onclick={open_file_explorer}>
            Open Explorer
            <Menubar.Shortcut>⌘E</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Item class="p-0">
            <a class="block w-full h-full px-2 py-1.5" href="/utils">Utility</a>
          </Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item>Export</Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item>Print</Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item class="p-0">
            <button
              class="block w-full h-full px-2 py-1.5 text-left cursor-pointer"
              onclick={exit_app}>Exit</button
            >
          </Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>
          <a href="/alerts">Alerts</a>
        </Menubar.Trigger>
      </Menubar.Menu><Menubar.Menu>
        <Menubar.Trigger>
          <a href="/charts">Charts</a>
        </Menubar.Trigger>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>
          <a href="/settings">Settings</a>
        </Menubar.Trigger>
      </Menubar.Menu>
    </Menubar.Root>
  </div>

  <div class="flex items-center gap-4">
    <div class="text-sm text-muted-foreground">{hostname}</div>
    <div class="flex items-center gap-4">
      <button
        class="block p-2 hover:bg-accent cursor-pointer rounded focus:bg-accent focus:text-accent-foregroun"
        onclick={minimize_window}
      >
        <Minus size={16} />
      </button>
      <button
        class="block p-2 hover:bg-accent cursor-pointer rounded focus:bg-accent focus:text-accent-foregroun"
        onclick={maximize_window}
      >
        <Square size={16} />
      </button>
      <button
        class="block p-2 hover:bg-accent cursor-pointer rounded focus:bg-accent focus:text-accent-foregroun"
        onclick={exit_app}
      >
        <X size={16} />
      </button>
    </div>
  </div>
</header>
