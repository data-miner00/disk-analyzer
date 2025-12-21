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
    locale,
    type I18n,
    SETTINGS,
    t,
  } from "$lib/i18n/translations.svelte";
  import { availableLanguages } from "$lib/i18n/languages";
  import { getSettings } from "$lib/utils.tauri";
  import type { Settings } from "$lib/types";

  type ByteFormat = {
    value: "b" | "kb" | "mb" | "gb" | "tb";
    label: string;
    description: string;
  };

  let settings = $state<Settings | null>(null);

  async function setSettings() {
    if (!settings) return;
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
    if (!settings) return;

    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  });

  $effect(() => {
    if (!settings) return;
    localStorage.locale = settings.language;
    locale.current = settings.language as keyof I18n;
  });

  onMount(async () => {
    settings = await getSettings();
  });
</script>

<h1 class="text-xl font-semibold mb-6">{t(SETTINGS.TITLE)}</h1>

{#if !settings}
  <div
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  >
    <Spinner class="size-6" />
  </div>
{:else}
  <section class="my-2">
    <h2 class="text-lg mb-4">{t(SETTINGS.PRESENTATION)}</h2>

    <div class="my-4">
      <SettingSwitch
        title={t(SETTINGS.DARK_MODE)}
        description={t(SETTINGS.DARK_MODE_DESCIPTION)}
        bind:value={settings.darkMode}
      />
    </div>

    <div class="my-4">
      <SettingSwitch
        title={t(SETTINGS.SEARCH_BAR)}
        description={t(SETTINGS.SEARCH_BAR_DESCIPTION)}
        bind:value={settings.searchBar}
      />
    </div>

    <div class="my-4">
      <SettingSelect
        title={t(SETTINGS.LANGUAGE)}
        description={t(SETTINGS.LANGUAGE_DESCIPTION)}
        defaultLabel={t(SETTINGS.LANGUAGE_DEFAULT_LABEL)}
        options={availableLanguages}
        bind:value={settings.language}
      />
    </div>

    <div class="my-4">
      <SettingNumberInput
        title={t(SETTINGS.PREFETCH_COUNT)}
        description={t(SETTINGS.PREFETCH_COUNT_DESCIPTION)}
        placeholder={t(SETTINGS.PREFETCH_COUNT_PLACEHOLDER)}
        bind:value={settings.prefetchCount}
        min={0}
        max={30}
      />
    </div>

    <div class="my-4">
      <SettingSelect
        title={t(SETTINGS.BYTE_DISPLAY)}
        description={t(SETTINGS.BYTE_DISPLAY_DESCIPTION)}
        defaultLabel={t(SETTINGS.BYTE_DISPLAY_DEFAULT_LABEL)}
        options={availableByteFormats}
        bind:value={settings.byteFormat}
      />
    </div>
  </section>
  <section>
    <h2 class="text-lg mb-4">{t(SETTINGS.SERVICES)}</h2>
    <div class="my-4">
      <SettingSwitch
        title={t(SETTINGS.SERVICES_DESKTOP_NOTIFICATION)}
        description={t(SETTINGS.SERVICES_DESKTOP_NOTIFICATION_DESCIPTION)}
        bind:value={settings.desktopNoti}
      />
    </div>
    <div class="my-4">
      <SettingSwitch
        title={t(SETTINGS.SERVICES_MINIMIZE_ON_CLOSE)}
        description={t(SETTINGS.SERVICES_MINIMIZE_ON_CLOSE_DESCIPTION)}
        bind:value={settings.minimizeClose}
      />
    </div>
    <div class="my-4">
      <SettingSwitch
        title={t(SETTINGS.SERVICES_START_ON_BOOT)}
        description={t(SETTINGS.SERVICES_START_ON_BOOT_DESCIPTION)}
        bind:value={settings.startLogon}
      />
    </div>
  </section>

  <section>
    <h2 class="text-lg mb-4">{t(SETTINGS.LOGGING)}</h2>

    <div class="my-4">
      <SettingSwitch
        title={t(SETTINGS.ENABLE_LOGGING)}
        description={t(SETTINGS.ENABLE_LOGGING_DESCIPTION)}
        bind:value={settings.enableLogging}
      />
    </div>

    <div class="my-4">
      <SettingPathInput
        title={t(SETTINGS.LOGGING_PATH)}
        description={t(SETTINGS.LOGGING_PATH_DESCIPTION)}
        bind:value={settings.logPath}
        placeholder={t(SETTINGS.LOGGING_PATH_PLACEHOLDER)}
      />
    </div>
  </section>

  <section>
    <h2 class="text-lg mb-4">{t(SETTINGS.BACKUP)}</h2>

    <div class="my-4">
      <SettingSwitch
        title={t(SETTINGS.ENABLE_BACKUP)}
        description={t(SETTINGS.ENABLE_BACKUP_DESCIPTION)}
        bind:value={settings.enableBackup}
      />
    </div>

    <div class="my-4">
      <SettingPathInput
        title={t(SETTINGS.BACKUP_PATH)}
        description={t(SETTINGS.BACKUP_PATH_DESCIPTION)}
        bind:value={settings.backupPath}
        placeholder={t(SETTINGS.BACKUP_PATH_PLACEHOLDER)}
      />
    </div>

    <div class="my-4">
      <SettingSlider
        title={t(SETTINGS.BACKUP_FREQUENCY)}
        description={t(SETTINGS.BACKUP_FREQUENCY_DESCIPTION)}
        bind:value={settings.backupFrequencyDays}
        min={1}
        max={30}
        unit="days"
      />
    </div>
  </section>

  <Button onclick={setSettings}>{t(SETTINGS.SAVE_CHANGES)}</Button>
{/if}
