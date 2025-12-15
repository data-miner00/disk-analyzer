<!-- Global setup happens here -->
<script lang="ts">
  let { children } = $props();
  import "../app.css";
  import { Toaster } from "$lib/components/ui/sonner";
  import Header from "$lib/components/custom/header.svelte";
  import Footer from "$lib/components/custom/footer.svelte";
  import { toast } from "svelte-sonner";
  import { onMount } from "svelte";
  import { invoke } from "@tauri-apps/api/core";
  import { listen } from "@tauri-apps/api/event";
  import { type DiskDto } from "$lib/types";

  onMount(async () => {
    await invoke("frontend_loaded");

    document.cookie = "sveltekit_cookie_test=1; SameSite=Lax;";
    document.cookie =
      "sveltekit_cookie_test2=2; domain=.example.com; path=/path1;"; // no max age, cookie always destroyed when browser closed
  });

  listen<DiskDto>("hello", (event) => {
    toast.success(
      `Received event from backend: ${JSON.stringify(event.payload)}`
    );
  });
</script>

<Toaster position="bottom-center" />

<div class="px-2 pb-2 min-h-screen max-w-3xl mx-auto">
  <Header />
  {@render children()}
  <Footer />
</div>
