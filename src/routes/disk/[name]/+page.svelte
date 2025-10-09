<script lang="ts">
import { HardDrive, Info } from "@lucide/svelte";

const { data } = $props();
</script>

{#if data && data.disk}
  {@const { disk } = data}
  {@const available_percentage = (
    (disk.available_space / disk.total_space) *
    100
  ).toFixed(2)}
  {@const disk_kind_verbose =
    disk.kind === "SSD" ? "Solid State Drive" : "Hard Disk Drive"}
  {@const used_percentage = (100 - parseFloat(available_percentage)).toFixed(2)}
  <h1 class="text-lg font-bold flex items-center gap-2 mb-2">
    <HardDrive color="#999" strokeWidth={2} size={20} />
    <span class="block">
      {disk.name}
    </span>
  </h1>
  <p class="text-gray-500">Total space: {disk.total_space}</p>
  <p class="">
    Available space: {disk.available_space} ({available_percentage}%)
  </p>
  <p class="">
    Used space: {disk.total_space - disk.available_space} ({used_percentage}%)
  </p>
  <p>Is Read Only: {disk.is_read_only}</p>
  <p>Is Removable: {disk.is_removable}</p>
  <p class="flex items-center gap-1 mb-1">
    <span class="block">
      File System: {disk.file_system}
    </span>
    <a class="block" href="https://en.wikipedia.org/wiki/NTFS" target="_blank"
      ><Info size={16} /></a
    >
  </p>
  <p>Type: {disk_kind_verbose} ({disk.kind})</p>
{:else}
  <p>No data</p>
{/if}
