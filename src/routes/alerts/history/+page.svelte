<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";
  import { onMount } from "svelte";
  import * as Table from "$lib/components/ui/table/index.js";

  type NotificationHistory = {
    id: number;
    title: string;
    body: string;
    call_to_action?: string;
    created_at: string;
  };

  let histories = $state<NotificationHistory[]>([]);

  onMount(async () => {
    histories = await invoke<NotificationHistory[]>("get_histories");
  });

  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  function formatDateTime(date: string, locale: string): string {
    return new Intl.DateTimeFormat(locale, {
      dateStyle: "full",
      timeStyle: "long",
      timeZone: localTimezone,
    }).format(new Date(date));
  }
</script>

<h1 class="text-lg font-bold mb-4">History</h1>
<!-- TODO: Clear all history-->

<Table.Root>
  <Table.Caption>A list of your recent notification history.</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head>No.</Table.Head>
      <Table.Head>Title</Table.Head>
      <Table.Head>Description</Table.Head>
      <Table.Head>Created At</Table.Head>
      <Table.Head>Actions</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each histories as history, index (history.id)}
      <Table.Row>
        <Table.Cell>{index + 1}.</Table.Cell>
        <Table.Cell>{history.title}</Table.Cell>
        <Table.Cell>{history.body}</Table.Cell>
        <Table.Cell>{formatDateTime(history.created_at, "en-US")}</Table.Cell>
        <Table.Cell>
          <!-- Delete -->
          <!-- Mark as read -->
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
  <Table.Footer>
    <Table.Row>
      <Table.Cell colspan={4}>Total</Table.Cell>
      <Table.Cell class="text-end">{histories.length} notifications</Table.Cell>
    </Table.Row>
  </Table.Footer>
</Table.Root>
