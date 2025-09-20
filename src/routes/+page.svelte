<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";
  import { HardDrive } from "@lucide/svelte";
  import { onMount } from "svelte";

  let name = $state("");
  let diskInfo = $state<Disk[]>([]);
  let isLoading = $state(true);

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

  onMount(async () => {
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
              high="80"
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
