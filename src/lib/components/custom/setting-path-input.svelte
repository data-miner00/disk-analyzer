<script lang="ts">
  import { ExternalLink, FolderOpen, Icon } from "@lucide/svelte";
  import { Button } from "../ui/button";
  import { Input } from "../ui/input";
  import { invoke } from "@tauri-apps/api/core";

  type Props = {
    title: string;
    description: string;
    initialValue: string;
    placeholder: string;
    onChange: (newValue: string) => void;
  };

  const props: Props = $props();

  let value = $state(props.initialValue);

  function openFileExplorer() {
    invoke("open_file_explorer", { path: value });
  }

  let selectedFiles = $state<File[]>([]);

  function handleFileChange(event: Event) {
    let elem = <HTMLInputElement>event.target;

    selectedFiles = Array.from(elem.files ?? []);

    console.log(
      "Selected files:",
      selectedFiles.map((file) => file.name)
    );
    selectedFiles.forEach((file) => {
      value = file.name;
      props.onChange(file.name);
    });
  }

  $effect(() => {
    props.onChange(value);
  });
</script>

<div
  class="flex flex-col py-4 justify-between px-6 rounded-lg border border-solid border-gray-200"
>
  <div class="mb-4">
    <p class="font-semibold">{props.title}</p>
    <p>{props.description}</p>
  </div>
  <div class="flex items-center gap-2">
    <div>
      <Input type="text" placeholder={props.placeholder} bind:value />
    </div>
    <Button
      variant="outline"
      onclick={() => {
        /* TODO */
      }}
    >
      <FolderOpen />
    </Button>
    <Button variant="outline" onclick={openFileExplorer}>
      <ExternalLink />
    </Button>
  </div>
</div>
