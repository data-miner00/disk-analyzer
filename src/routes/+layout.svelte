<script lang="ts">
  let { children } = $props();
  import "../app.css";
  import { Toaster } from "$lib/components/ui/sonner";
  import Header from "$lib/components/custom/header.svelte";
</script>

<Toaster position="bottom-center" />

<div class="px-2 pb-2 min-h-screen max-w-3xl mx-auto">
  <Header />
  {@render children()}
</div>
