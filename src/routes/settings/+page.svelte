<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";
  import SettingSwitch from "$lib/components/custom/setting-switch.svelte";
  import SettingSelect from "$lib/components/custom/setting-select.svelte";

  type ByteFormat = {
    value: "b" | "kb" | "mb" | "gb" | "tb";
    label: string;
    description: string;
  };

  type Settings = {
    darkMode: boolean;
    searchBar: boolean;
    language: string;
    byteFormat: string;
  };

  const settings: Settings = $state({
    darkMode: false,
    searchBar: false,
    language: "en",
    byteFormat: "gb",
  });

  function updateDarkMode(newValue: boolean): void {
    settings.darkMode = newValue;
  }

  function updateSearchBar(newValue: boolean): void {
    settings.searchBar = newValue;
  }

  function updateLanguage(newValue: string): void {
    settings.language = newValue;
  }

  function updateByteFormat(newValue: string): void {
    settings.byteFormat = newValue;
  }

  type Language = {
    value: string;
    label: string;
  };

  const availableLanguages: Language[] = [
    { value: "en", label: "English" },
    { value: "ko", label: "한국어" },
    { value: "ja", label: "日本語" },
    { value: "ms", label: "Bahasa Melayu" },
    { value: "pt", label: "Português" },
  ];

  const availableByteFormats: ByteFormat[] = [
    { value: "b", label: "B", description: "Bytes" },
    { value: "kb", label: "KB", description: "Kilobytes" },
    { value: "mb", label: "MB", description: "Megabytes" },
    { value: "gb", label: "GB", description: "Gigabytes" },
    { value: "tb", label: "TB", description: "Terabytes" },
  ];
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

  <div class="my-4">
    <SettingSelect
      title="Language"
      description="The language used for the user interface from a limited preset."
      defaultLabel="Select language"
      options={availableLanguages}
      initialValue={settings.language}
      onChange={updateLanguage}
    />
  </div>

  <div class="my-4">
    <SettingSelect
      title="Byte Display"
      description="The format for which the bytes will be displayed by default."
      defaultLabel="Select byte format"
      options={availableByteFormats}
      initialValue={settings.byteFormat}
      onChange={updateByteFormat}
    />
  </div>
</main>
