import { ALERTS, CHARTS, DISK_DETAIL, HEADER, HOME, SETTINGS } from "./keys";

import type { Translations } from "../translations.svelte";

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
  [HOME.SEARCH_EMPTY]: "Tiada cakera ditemui sepadan dengan pertanyaan.",
  [HOME.DISK_COUNT]: "{diskCount} cakera",
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
  [DISK_DETAIL.SIZE]: "Saiz",
  [DISK_DETAIL.SIZE_AVAILABLE_SPACE]: "Ruang tersedia",
  [DISK_DETAIL.SIZE_TOTAL_SPACE]: "Jumlah ruang",
  [DISK_DETAIL.SIZE_USED_SPACE]: "Ruang digunakan",
  [DISK_DETAIL.PROPERTIES]: "Ciri-ciri",
  [DISK_DETAIL.PROPERTIES_MODE]: "Mod",
  [DISK_DETAIL.PROPERTIES_REMOVABLE]: "Boleh tanggal",
  [DISK_DETAIL.PROPERTIES_FS]: "Sistem Fail",
  [DISK_DETAIL.PROPERTIES_TYPE]: "Jenis",

  [ALERTS.EMPTY_TITLE]: "Tiada Makluman Lagi",
  [ALERTS.EMPTY_DESCRIPTION]:
    "Anda belum mencipta sebarang makluman lagi. Mulakan dengan mencipta makluman pertama anda.",
  [ALERTS.EMPTY_LEARN_MORE]: "Ketahui Lebih Lanjut",
  [ALERTS.SEARCH]: "Cari makluman...",
  [ALERTS.SEARCH_EMPTY]:
    "Tiada makluman ditemui yang sepadan dengan pertanyaan.",
  [ALERTS.CREATE_ALERT_BUTTON]: "Cipta Makluman",
  [ALERTS.CREATE_DIALOG_TITLE]: "Cipta Makluman Baharu",
  [ALERTS.CREATE_DIALOG_DESCRIPTION]:
    "Konfigurasikan tetapan untuk makluman baharu anda di bawah.",
  [ALERTS.CREATE_DIALOG_NAME_LABEL]: "Nama",
  [ALERTS.CREATE_DIALOG_NAME_DESCRIPTION]: "Nama tetapan makluman.",
  [ALERTS.CREATE_DIALOG_FREQ_LABEL]: "Kekerapan",
  [ALERTS.CREATE_DIALOG_FREQ_DESCRIPTION]:
    "Kekerapan pemeriksaan tetapan makluman.",
  [ALERTS.CREATE_DIALOG_THRESHOLD_LABEL]: "Ambang",
  [ALERTS.CREATE_DIALOG_THRESHOLD_DESCRIPTION]:
    "Nilai ambang yang perlu dicapai untuk mencetuskan makluman.",
  [ALERTS.CREATE_DIALOG_RULE_LABEL]: "Peraturan",
  [ALERTS.CREATE_DIALOG_RULE_DESCRIPTION]:
    "Peraturan untuk pemeriksaan tetapan makluman.",
  [ALERTS.CREATE_DIALOG_DISKNAME_LABEL]: "Nama Cakera",
  [ALERTS.CREATE_DIALOG_DISKNAME_LABEL_SELECT]: "Pilih cakera",
  [ALERTS.CREATE_DIALOG_DISKNAME_LABEL_DROPDOWN]: "Cakera",
  [ALERTS.CREATE_DIALOG_DISKNAME_DESCRIPTION]:
    "Nama cakera yang akan dimaklumkan.",
  [ALERTS.CREATE_DIALOG_CREATE_BUTTON]: "Cipta",
  [ALERTS.LABEL_SELECT_RULE]: "Pilih peraturan",
  [ALERTS.FORM_ERROR]: "Sila betulkan ralat dalam borang.",

  [CHARTS.TITLE]: "Carta",
  [CHARTS.DISK_USAGE_CHANGE_PCT_TITLE]:
    "Perubahan Penggunaan Cakera dalam Peratus",
  [CHARTS.DISK_USAGE_CHANGE_PCT_DESCRIPTION]:
    "Menunjukkan pecahan penggunaan cakera individu berbanding dengan semalam.",
  [CHARTS.DISK_AVAILABLE_SPACE_TITLE]: "Ruang Tersedia Cakera",
  [CHARTS.DISK_AVAILABLE_SPACE_DESCRIPTION]:
    "Menunjukkan pecahan ruang tersedia cakera individu untuk PC semasa.",
  [CHARTS.DISK_USAGE_TITLE]: "Penggunaan Cakera dalam GB",
  [CHARTS.DISK_USAGE_DESCRIPTION]:
    "Menunjukkan pecahan penggunaan cakera individu untuk PC semasa.",
  [CHARTS.DISK_USAGE_PCT_TITLE]: "Penggunaan Cakera dalam Peratus",
  [CHARTS.DISK_USAGE_PCT_DESCRIPTION]:
    "Menunjukkan pecahan penggunaan cakera individu dalam peratus untuk PC semasa.",
};

export default MS;
