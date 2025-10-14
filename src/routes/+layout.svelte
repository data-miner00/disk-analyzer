<script lang="ts">
  import * as Menubar from "$lib/components/ui/menubar";
  import * as Avatar from "$lib/components/ui/avatar";
  import { Bell, Home } from "@lucide/svelte";
  import { invoke } from "@tauri-apps/api/core";

  let { children } = $props();
  import "../app.css";
  import { onMount } from "svelte";
  import { Toaster } from "$lib/components/ui/sonner";

  let hostname = $state("Unknown");

  async function greet() {
    const greetMsg = await invoke("greet", { name: hostname });
    window.alert(greetMsg);
  }

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
</script>

<div class="px-2 pb-2 min-h-screen max-w-3xl mx-auto">
  <header
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
            <Menubar.Item>
              <button onclick={exit_app}>Exit</button>
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
            <Menubar.Item>Alerts</Menubar.Item>
            <Menubar.Item>
              <a href="/charts">Charts</a>
            </Menubar.Item>
            <Menubar.Item>
              <a href="/utils">Utils</a>
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

  <Toaster />

  {@render children()}
</div>
