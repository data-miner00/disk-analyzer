<script lang="ts">
  import * as Menubar from "$lib/components/ui/menubar";
  import { Home, Minus, Square, X } from "@lucide/svelte";
  import { invoke } from "@tauri-apps/api/core";

  let { children } = $props();
  import "../app.css";
  import { onMount } from "svelte";
  import { Toaster } from "$lib/components/ui/sonner";
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

<div class="px-2 pb-2 min-h-screen max-w-3xl mx-auto">
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
          <Home size={18} />
        </a>
      </div>
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
          <Menubar.Trigger>Edit</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item onclick={open_file_explorer}>
              Open Explorer
              <Menubar.Shortcut>⌘E</Menubar.Shortcut>
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
        <Menubar.Menu>
          <Menubar.Trigger>View</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item>
              Dashboard
              <Menubar.Shortcut>⌘D</Menubar.Shortcut>
            </Menubar.Item>
            <Menubar.Item class="p-0">
              <a class="block w-full h-full px-2 py-1.5" href="/alerts"
                >Alerts</a
              >
            </Menubar.Item>
            <Menubar.Item class="p-0">
              <a class="block w-full h-full px-2 py-1.5" href="/charts"
                >Charts</a
              >
            </Menubar.Item>
            <Menubar.Item class="p-0">
              <a class="block w-full h-full px-2 py-1.5" href="/utils">Utils</a>
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
        <Menubar.Menu>
          <Menubar.Trigger>
            <a href="/settings">Settings</a>
          </Menubar.Trigger>
        </Menubar.Menu>
      </Menubar.Root>
    </div>
    <div class="flex items-center gap-4">
      <div>{hostname}</div>
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

  <Toaster />

  {@render children()}
</div>
