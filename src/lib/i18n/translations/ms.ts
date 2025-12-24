import type { Translations } from "../translations.svelte";
import { SETTINGS, HEADER, HOME, DISK_DETAIL } from "./keys";

export const MS: Translations = {
  [HEADER.MISC]: "Pelbagai",
  [HEADER.OPEN_EXPLORER]: "Buka Penjelajah",
  [HEADER.UTILITY]: "Utiliti",
  [HEADER.EXPORT]: "Eksport",
  [HEADER.PRINT]: "Cetak",
  [HEADER.EXIT]: "Keluar",
  [HEADER.ALERTS]: "Amaran",
  [HEADER.CHARTS]: "Carta",
  [HEADER.SETTINGS]: "Tetapan",

  [HOME.LOG]: "Maklumat cakera hari ini telah direkodkan.",
  [HOME.SEARCH_PLACEHOLDER]: "Cari...",
  [HOME.WARNING_NO_DISKS]: "Anda mempunyai cakera tanpa nama",
  [HOME.WARNING_NO_DISKS_DESCRIPTION]:
    "Satu atau lebih cakera dalam sistem anda tidak mempunyai nama yang ditetapkan. Untuk mengelakkan kelakuan tidak diingini, sila namakan mereka dengan betul.",

  [SETTINGS.TITLE]: "Tetapan",
  [SETTINGS.PRESENTATION]: "Persembahan",
  [SETTINGS.DARK_MODE]: "Mod Gelap",
  [SETTINGS.DARK_MODE_DESCIPTION]:
    "Tema yang tersedia pada masa ini adalah cerah dan gelap. Mod gelap mengurangkan ketegangan mata dengan ketara.",
  [SETTINGS.SEARCH_BAR]: "Bar Carian",
  [SETTINGS.SEARCH_BAR_DESCIPTION]:
    "Sama ada untuk membolehkan fungsi bar carian untuk halaman yang berkaitan.",
  [SETTINGS.LANGUAGE]: "Bahasa",
  [SETTINGS.LANGUAGE_DESCIPTION]:
    "Bahasa yang digunakan untuk antara muka pengguna daripada pratetap yang terhad.",
  [SETTINGS.LANGUAGE_DEFAULT_LABEL]: "Pilih bahasa",
  [SETTINGS.PREFETCH_COUNT]: "Kiraan Praambil",
  [SETTINGS.PREFETCH_COUNT_DESCIPTION]:
    "Bilangan titik data yang diutamakan untuk diambil daripada sejarah. Cadangan optimum ialah 20.",
  [SETTINGS.PREFETCH_COUNT_PLACEHOLDER]: "Kiraan",
  [SETTINGS.BYTE_DISPLAY]: "Paparan Bait",
  [SETTINGS.BYTE_DISPLAY_DESCIPTION]:
    "Format di mana bait akan dipaparkan secara lalai.",
  [SETTINGS.BYTE_DISPLAY_DEFAULT_LABEL]: "Pilih format bait",

  [SETTINGS.SERVICES]: "Perkhidmatan",
  [SETTINGS.SERVICES_DESKTOP_NOTIFICATION]: "Pemberitahuan Desktop",
  [SETTINGS.SERVICES_DESKTOP_NOTIFICATION_DESCIPTION]:
    "Memberitahu melalui pemberitahuan desktop apabila amaran yang dikonfigurasi telah mencapai ambangnya.",
  [SETTINGS.SERVICES_MINIMIZE_ON_CLOSE]: "Minimize semasa Tutup",
  [SETTINGS.SERVICES_MINIMIZE_ON_CLOSE_DESCIPTION]:
    "Apabila mengklik butang keluar, program akan diminimumkan ke dulang dan bukannya keluar.",
  [SETTINGS.SERVICES_START_ON_BOOT]: "Mulakan semasa But",
  [SETTINGS.SERVICES_START_ON_BOOT_DESCIPTION]:
    "Mulakan program secara automatik semasa log masuk. Disyorkan untuk merekod log yang konsisten.",

  [SETTINGS.LOGGING]: "Pengelogan",
  [SETTINGS.ENABLE_LOGGING]: "Dayakan Pengelogan",
  [SETTINGS.ENABLE_LOGGING_DESCIPTION]:
    "Merekod aktiviti yang berlaku semasa program berjalan. Berguna untuk mencari pepijat.",
  [SETTINGS.LOGGING_PATH]: "Laluan Log",
  [SETTINGS.LOGGING_PATH_DESCIPTION]:
    "Folder atau direktori untuk menjejak log yang dijana. Lalai kepada laluan log aplikasi.",
  [SETTINGS.LOGGING_PATH_PLACEHOLDER]: "Pilih direktori pengelogan",
  [SETTINGS.BACKUP]: "Sandaran",
  [SETTINGS.ENABLE_BACKUP]: "Dayakan Sandaran",
  [SETTINGS.ENABLE_BACKUP_DESCIPTION]:
    "Mencipta titik pemulihan dengan selamat yang boleh dipulihkan daripada petikan sebelumnya.",
  [SETTINGS.BACKUP_PATH]: "Laluan Sandaran",
  [SETTINGS.BACKUP_PATH_DESCIPTION]:
    "Folder atau direktori untuk menyimpan sandaran data aplikasi. Lalai kepada laluan data aplikasi.",
  [SETTINGS.BACKUP_PATH_PLACEHOLDER]: "Pilih direktori sandaran",
  [SETTINGS.BACKUP_FREQUENCY]: "Kekerapan Sandaran",
  [SETTINGS.BACKUP_FREQUENCY_DESCIPTION]:
    "Selang masa di mana data akan disandarkan untuk mencipta petikan yang boleh dipulihkan. Lalai kepada 7 hari.",
  [SETTINGS.SAVE_CHANGES]: "Simpan Perubahan",

  [DISK_DETAIL.DESCRIPTION]:
    "Maklumat terperinci tentang cakera bernama {diskName} dalam sistem anda.",
};

export default MS;
