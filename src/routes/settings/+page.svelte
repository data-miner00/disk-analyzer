<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";
  import SettingSwitch from "$lib/components/custom/setting-switch.svelte";
  import SettingSelect from "$lib/components/custom/setting-select.svelte";
  import SettingNumberInput from "$lib/components/custom/setting-number-input.svelte";
  import SettingPathInput from "$lib/components/custom/setting-path-input.svelte";
  import SettingSlider from "$lib/components/custom/setting-slider.svelte";
  import { onMount } from "svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import { Spinner } from "$lib/components/ui/spinner";
  import { toast } from "svelte-sonner";
  import {
    type Settings,
    settingsState,
  } from "../../states/settings-state.svelte";
  import { locale, type I18n } from "$lib/i18n/translations.svelte";
  import { availableLanguages } from "$lib/i18n/languages";
  import { getSettings } from "$lib/utils.tauri";

  type ByteFormat = {
    value: "b" | "kb" | "mb" | "gb" | "tb";
    label: string;
    description: string;
  };

  let settings = $state<Settings>(settingsState);
  let isLoading = $state(true);

  async function setSettings() {
    await invoke("set_settings", {
      settings: {
        dark_mode: settings.darkMode,
        search_bar: settings.searchBar,
        language: settings.language,
        byte_format: settings.byteFormat,
        prefetch_count: settings.prefetchCount,
        desktop_noti: settings.desktopNoti,
        minimize_close: settings.minimizeClose,
        start_logon: settings.startLogon,
        enable_logging: settings.enableLogging,
        log_path: settings.logPath,
        enable_backup: settings.enableBackup,
        backup_path: settings.backupPath,
        backup_frequency_days: settings.backupFrequencyDays,
      },
    });

    toast.success("Settings saved successfully!");
  }

  const availableByteFormats: ByteFormat[] = [
    { value: "b", label: "B", description: "Bytes" },
    { value: "kb", label: "KB", description: "Kilobytes" },
    { value: "mb", label: "MB", description: "Megabytes" },
    { value: "gb", label: "GB", description: "Gigabytes" },
    { value: "tb", label: "TB", description: "Terabytes" },
  ];

  $effect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  });

  $effect(() => {
    localStorage.locale = settings.language;
    locale.current = settings.language as keyof I18n;
  });

  onMount(async () => {
    await getSettings();
    isLoading = false;
  });
</script>

<main>
  <h1 class="text-xl font-semibold mb-6">Settings</h1>

  {#if isLoading}
    <div
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <Spinner class="size-6" />
    </div>
  {:else}
    <section class="my-2">
      <h2 class="text-lg mb-4">Presentation</h2>

      <div class="my-4">
        <SettingSwitch
          title="Dark Mode"
          description="The themes available currently are light and dark. Dark mode eases the eyes drastically."
          bind:value={settings.darkMode}
        />
      </div>

      <div class="my-4">
        <SettingSwitch
          title="Search bar"
          description="Whether to enable the search bar functionality for applicable pages."
          bind:value={settings.searchBar}
        />
      </div>

      <div class="my-4">
        <SettingSelect
          title="Language"
          description="The language used for the user interface from a limited preset."
          defaultLabel="Select language"
          options={availableLanguages}
          bind:value={settings.language}
        />
      </div>

      <div class="my-4">
        <SettingNumberInput
          title="Prefetch Count"
          description="The number of data points that is preferred to fetch from the history. Optimal suggestion is 20."
          placeholder="Count"
          bind:value={settings.prefetchCount}
          min={0}
          max={30}
        />
      </div>

      <div class="my-4">
        <SettingSelect
          title="Byte Display"
          description="The format for which the bytes will be displayed by default."
          defaultLabel="Select byte format"
          options={availableByteFormats}
          bind:value={settings.byteFormat}
        />
      </div>
    </section>
    <section>
      <h2 class="text-lg mb-4">Service</h2>
      <div class="my-4">
        <SettingSwitch
          title="Desktop Notification"
          description="Notify through the desktop notification when the alert configured has reached its threshold."
          bind:value={settings.desktopNoti}
        />
      </div>
      <div class="my-4">
        <SettingSwitch
          title="Minimize On Close"
          description="Upon clicking the exit button, instead of exiting the program, it minimize to tray instead."
          bind:value={settings.minimizeClose}
        />
      </div>
      <div class="my-4">
        <SettingSwitch
          title="Start On Logon"
          description="Automatically start the program upon logon. Recommended to have consistent logs recorded."
          bind:value={settings.startLogon}
        />
      </div>
    </section>

    <section>
      <h2 class="text-lg mb-4">Logging</h2>

      <div class="my-4">
        <SettingSwitch
          title="Activity Logging"
          description="Log the activities that is happening when the program is running. Useful to find out bugs."
          bind:value={settings.enableLogging}
        />
      </div>

      <div class="my-4">
        <SettingPathInput
          title="Log Path"
          description="The folder or directory to keep track of the generated logs. Defaults to the application log path."
          bind:value={settings.logPath}
          placeholder="Select a logging directory"
        />
      </div>
    </section>

    <section>
      <h2 class="text-lg mb-4">Backup</h2>

      <div class="my-4">
        <SettingSwitch
          title="Data Backup"
          description="Safely creates a restore point that can be restored from a previous snapshot."
          bind:value={settings.enableLogging}
        />
      </div>

      <div class="my-4">
        <SettingPathInput
          title="Backup Path"
          description="The folder or directory to keep the backup for the application data. Defaults to the application data path."
          bind:value={settings.backupPath}
          placeholder="Select a backup directory"
        />
      </div>

      <div class="my-4">
        <SettingSlider
          title="Frequency"
          description="The interval of which the data will be backed-up to create restorable snapshots. Defaults to 7 days."
          bind:value={settings.backupFrequencyDays}
          min={1}
          max={30}
          unit="days"
        />
      </div>
    </section>

    <Button onclick={setSettings}>Save Changes</Button>
  {/if}
</main>
