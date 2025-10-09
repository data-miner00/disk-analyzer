<script lang="ts">
import { invoke } from "@tauri-apps/api/core";
import Button from "$lib/components/ui/button/button.svelte";
import Input from "$lib/components/ui/input/input.svelte";
import * as Table from "$lib/components/ui/table";

let { data } = $props();

let currentCount = $state(0);
let path = $state("");
let sizeByExtension = $state<SizeByExtension>();
let isValid = $state(true);
let testCounter = $state(false);

async function get_folder_size(event: Event) {
  event.preventDefault();
  const size = await invoke("folder_size", { path });
  window.alert(`Folder size: ${size} bytes`);
}

type SizeByExtension = {
  [ext: string]: number;
};

async function getFolderSizeByExtension() {
  if (!path) {
    isValid = false;
    return;
  }
  isValid = true;
  const result: SizeByExtension = await invoke("calculate_size_by_file_type", {
    folderPath: path,
  });
  sizeByExtension = result;
}

async function increment() {
  const newCount = await invoke("increment_counter");
  currentCount = newCount as number;
}
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<h1 class="text-2xl font-bold mb-4">Utils</h1>

<!-- How to make the aria-invalid to bind with boolean -->
{#if isValid}
  <Input bind:value={path} placeholder="Path to analyze" />
{:else}
  <Input aria-invalid bind:value={path} placeholder="Path to analyze" />
{/if}

<Button onclick={get_folder_size} class="ml-2">Get</Button>
<Button onclick={getFolderSizeByExtension} class="ml-2">Get by extension</Button
>

<div class="my-3"></div>

{#if sizeByExtension}
  <Table.Root>
    <Table.Caption>A list of extensions.</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[100px]">Index</Table.Head>
        <Table.Head>Extension</Table.Head>
        <Table.Head>Type</Table.Head>
        <Table.Head class="text-right">Size (bytes)</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each Object.entries(sizeByExtension).map( ([key, value]) => ({ ext: key, size: value }) ) as entry, i (i)}
        <Table.Row>
          <Table.Cell class="font-medium">{i + 1}</Table.Cell>
          <Table.Cell>{entry.ext}</Table.Cell>
          <Table.Cell>Image</Table.Cell>
          <Table.Cell class="text-right">{entry.size}</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
    <Table.Footer>
      <Table.Row>
        <Table.Cell colspan={3}>Total</Table.Cell>
        <Table.Cell class="text-right"
          >{Object.values(sizeByExtension).reduce(
            (prev, curr) => prev + curr,
            0
          )}</Table.Cell
        >
      </Table.Row>
    </Table.Footer>
  </Table.Root>
{/if}

{#if testCounter}
  <hr class="my-3" />

  <p>Current count: {currentCount}</p>

  <Button onclick={increment}>Increment</Button>
{/if}
