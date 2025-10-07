<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";
  import SettingSwitch from "$lib/components/custom/setting-switch.svelte";
  import SettingSelect from "$lib/components/custom/setting-select.svelte";
  import SettingNumberInput from "$lib/components/custom/setting-number-input.svelte";
  import SettingPathInput from "$lib/components/custom/setting-path-input.svelte";
  import SettingSlider from "$lib/components/custom/setting-slider.svelte";
  import { onMount } from "svelte";

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
    prefetchCount: number;
    desktopNoti: boolean;
    minimizeClose: boolean;
    startLogon: boolean;
    enableLogging: boolean;
    logPath: string;
    enableBackup: boolean;
    backupPath: string;
    backupFrequencyDays: number;
  };

  let settings: Settings = $state({
    darkMode: false,
    searchBar: false,
    language: "en",
    byteFormat: "gb",
    prefetchCount: 20,
    desktopNoti: true,
    minimizeClose: false,
    startLogon: true,
    enableLogging: true,
    logPath: "logs",
    enableBackup: true,
    backupPath: "backup",
    backupFrequencyDays: 7,
  });

  function updateDarkMode(newValue: boolean): void {
    // settings.darkMode = newValue;
    console.log(newValue);
  }

  function updateSearchBar(newValue: boolean): void {
    // settings.searchBar = newValue;
  }

  function updateLanguage(newValue: string): void {
    // settings.language = newValue;
  }

  function updateByteFormat(newValue: string): void {
    // settings.byteFormat = newValue;
  }

  function updatePrefetchCount(newValue: number): void {
    // settings.prefetchCount = newValue;
  }

  function updateDesktopNotification(newValue: boolean): void {
    // settings.desktopNoti = newValue;
  }

  function updateCloseMinimize(newValue: boolean): void {
    // settings.minimizeClose = newValue;
  }

  function updateStartLogon(newValue: boolean): void {
    // settings.startLogon = newValue;
  }

  function updateLogPath(newValue: string): void {
    console.log(newValue);
  }

  function updateEnableLog(newValue: boolean): void {
    // settings.enableLogging = newValue;
  }

  function updateEnableBackup(newValue: boolean): void {
    // settings.enableBackup = newValue;
  }

  function updateBackupPath(newValue: string): void {
    // settings.backupPath = newValue;
    console.log(newValue);
  }

  function updateBackupFrequency(newValue: number): void {
    // settings.backupFrequencyDays = newValue;
  }

  async function getSettings() {
    const setting = await invoke("get_settings");
    settings = convertObjectKeysToCamelCase(setting) as Settings;
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

  onMount(async () => {
    await getSettings();
  });

  function snakeToCamelCase(str: string): string {
    return str.replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", "")
    );
  }

  function convertObjectKeysToCamelCase<T>(obj: T): T {
    if (typeof obj !== "object" || obj === null) {
      return obj; // Return non-objects and null directly
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => convertObjectKeysToCamelCase(item)) as T; // Recursively convert array elements
    }

    const newObj: { [key: string]: any } = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const camelKey = snakeToCamelCase(key);
        newObj[camelKey] = convertObjectKeysToCamelCase((obj as any)[key]); // Recursively convert nested objects
      }
    }
    return newObj as T;
  }
</script>

<main>
  <h1 class="text-xl font-semibold mb-6">Settings</h1>

  <section class="my-2">
    <h2 class="text-lg mb-4">Presentation</h2>

    <div class="my-4">
      <SettingSwitch
        title="Dark Mode"
        description="The themes available currently are light and dark. Dark mode eases the eyes drastically."
        bind:value={settings.darkMode}
        onChange={updateDarkMode}
      />
    </div>

    <div class="my-4">
      <SettingSwitch
        title="Search bar"
        description="Whether to enable the search bar functionality for applicable pages."
        bind:value={settings.searchBar}
        onChange={updateSearchBar}
      />
    </div>

    <div class="my-4">
      <SettingSelect
        title="Language"
        description="The language used for the user interface from a limited preset."
        defaultLabel="Select language"
        options={availableLanguages}
        bind:value={settings.language}
        onChange={updateLanguage}
      />
    </div>

    <div class="my-4">
      <SettingNumberInput
        title="Prefetch Count"
        description="The number of data points that is preferred to fetch from the history. Optimal suggestion is 20."
        placeholder="Count"
        bind:value={settings.prefetchCount}
        onChange={updatePrefetchCount}
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
        onChange={updateByteFormat}
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
        onChange={updateDesktopNotification}
      />
    </div>
    <div class="my-4">
      <SettingSwitch
        title="Minimize On Close"
        description="Upon clicking the exit button, instead of exiting the program, it minimize to tray instead."
        bind:value={settings.minimizeClose}
        onChange={updateCloseMinimize}
      />
    </div>
    <div class="my-4">
      <SettingSwitch
        title="Start On Logon"
        description="Automatically start the program upon logon. Recommended to have consistent logs recorded."
        bind:value={settings.startLogon}
        onChange={updateStartLogon}
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
        onChange={updateEnableLog}
      />
    </div>

    <div class="my-4">
      <SettingPathInput
        title="Log Path"
        description="The folder or directory to keep track of the generated logs. Defaults to the application log path."
        bind:value={settings.logPath}
        placeholder="Select a logging directory"
        onChange={updateLogPath}
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
        onChange={updateEnableBackup}
      />
    </div>

    <div class="my-4">
      <SettingPathInput
        title="Backup Path"
        description="The folder or directory to keep the backup for the application data. Defaults to the application data path."
        bind:value={settings.backupPath}
        placeholder="Select a backup directory"
        onChange={updateBackupPath}
      />
    </div>

    <div class="my-4">
      <SettingSlider
        title="Frequency"
        description="The interval of which the data will be backed-up to create restorable snapshots. Defaults to 7 days."
        bind:value={settings.backupFrequencyDays}
        min={1}
        max={30}
        onChange={updateBackupFrequency}
        unit="days"
      />
    </div>
  </section>
</main>
