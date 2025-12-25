<script lang="ts">
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import { HardDrive, Info, Tally5 } from "@lucide/svelte";
  import { toMode, toDetatchable, toGB } from "$lib/utils.js";
  import { t, DISK_DETAIL } from "$lib/i18n/translations.svelte.js";

  const { data } = $props();

  function getFileSystemInfoLink(fs: string): string {
    switch (fs.toLowerCase()) {
      case "ntfs":
        return "https://en.wikipedia.org/wiki/NTFS";
      case "fat32":
        return "https://en.wikipedia.org/wiki/Design_of_the_FAT_file_system#FAT32";
      case "exfat":
        return "https://en.wikipedia.org/wiki/ExFAT";
      case "ext4":
        return "https://en.wikipedia.org/wiki/Ext4";
      case "hfs":
        return "https://en.wikipedia.org/wiki/HFS_Plus";
      case "apfs":
        return "https://en.wikipedia.org/wiki/Apple_File_System";
      case "btrfs":
        return "https://en.wikipedia.org/wiki/Btrfs";
      case "zfs":
        return "https://en.wikipedia.org/wiki/ZFS";
      default:
        return "https://en.wikipedia.org/wiki/File_system";
    }
  }
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

  <div class="mb-4">
    <span class="text-2xl font-bold flex items-center gap-2">
      <HardDrive color="#999" strokeWidth={2} size={20} />
      <h1 class="block">
        {disk.name}
      </h1>
    </span>
    <p>{t(DISK_DETAIL.DESCRIPTION, { diskName: disk.name })}</p>
  </div>

  <Separator class="mb-4" />

  <div>
    <h2 class="flex items-center gap-1 mb-1">
      <span class="font-semibold block">
        <Tally5 size={16} />
      </span>
      <span class="block text-lg">{t(DISK_DETAIL.SIZE)}</span>
    </h2>
  </div>

  <div class="flex gap-8">
    <div>
      <p class="text-gray-500">{t(DISK_DETAIL.SIZE_TOTAL_SPACE)}</p>
      <p>{toGB(disk.total_space)}</p>
    </div>
    <div>
      <p class="text-gray-500">{t(DISK_DETAIL.SIZE_AVAILABLE_SPACE)}</p>
      <p class="">
        {toGB(disk.available_space)} ({available_percentage}%)
      </p>
    </div>
    <div>
      <p class="text-gray-500">{t(DISK_DETAIL.SIZE_USED_SPACE)}</p>
      <p class="">
        {toGB(disk.total_space - disk.available_space)} ({used_percentage}%)
      </p>
    </div>
  </div>

  <Separator class="my-4" />

  <div>
    <h2 class="flex items-center gap-1 mb-1">
      <span class="font-semibold block">
        <Info size={16} />
      </span>
      <span class="block text-lg">{t(DISK_DETAIL.PROPERTIES)}</span>
    </h2>
  </div>

  <div class="flex gap-4">
    <div>
      <p class="text-gray-500">{t(DISK_DETAIL.PROPERTIES_MODE)}</p>
      <p>{toMode(disk.is_read_only)}</p>
    </div>

    <div>
      <p class="text-gray-500">{t(DISK_DETAIL.PROPERTIES_REMOVABLE)}</p>
      <p>{toDetatchable(disk.is_removable)}</p>
    </div>

    <div>
      <p class="text-gray-500">{t(DISK_DETAIL.PROPERTIES_FS)}</p>
      <p class="flex items-center gap-1 mb-1">
        <span class="block">
          {disk.file_system}
        </span>
        <a
          class="block"
          href={getFileSystemInfoLink(disk.file_system)}
          target="_blank"><Info size={16} /></a
        >
      </p>
    </div>

    <div>
      <p class="text-gray-500">{t(DISK_DETAIL.PROPERTIES_TYPE)}</p>

      <p>{disk_kind_verbose} ({disk.kind})</p>
    </div>
  </div>
{:else}
  <p>No data</p>
{/if}
