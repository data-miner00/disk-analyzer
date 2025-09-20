<script lang="ts">
  import * as Menubar from "$lib/components/ui/menubar";
  import * as Avatar from "$lib/components/ui/avatar";
  import { Bell } from "@lucide/svelte";
  import { invoke } from "@tauri-apps/api/core";

  let { children } = $props();
  import "../app.css";
  import { onMount } from "svelte";

  let hostname = $state("Unknown");

  async function greet() {
    const greetMsg = await invoke("greet", { name: hostname });
    window.alert(greetMsg);
  }

  async function get_hostname() {
    const retrieved_hostname = await invoke("hostname");
    hostname = retrieved_hostname as string;
  }

  onMount(async () => {
    await get_hostname();
  });
</script>

<div class="p-2">
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

  {@render children()}
</div>
