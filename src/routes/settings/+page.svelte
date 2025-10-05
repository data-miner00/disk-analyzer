<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";
  import SettingSwitch from "$lib/components/custom/setting-switch.svelte";

  type Settings = {
    darkMode: boolean;
    searchBar: boolean;
  };

  const settings: Settings = {
    darkMode: false,
    searchBar: false,
  };

  function updateDarkMode(newValue: boolean): void {
    settings.darkMode = newValue;
  }

  function updateSearchBar(newValue: boolean): void {
    settings.searchBar = newValue;
  }
</script>

<main>
  <h1 class="text-lg font-semibold mb-4">Settings</h1>

  <div class="my-4">
    <SettingSwitch
      title="Dark Mode"
      description="The themes available currently are light and dark. Dark mode eases the eyes drastically."
      initialValue={settings.darkMode}
      onChange={updateDarkMode}
    />
  </div>

  <div class="my-4">
    <SettingSwitch
      title="Search bar"
      description="Whether to enable the search bar functionality for applicable pages."
      initialValue={settings.searchBar}
      onChange={updateSearchBar}
    />
  </div>
</main>
