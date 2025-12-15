export type Translations = {
  [key: string]: string;
};

export type I18n = {
  [locale in "en" | "zh" | "ja" | "ms" | "ko" | "pt"]: Translations;
};

export const HOME = {
  LOG: "home.log",
  SEARCH_PLACEHOLDER: "home.search.placeholder",
};
export const HEADER = {
  MISC: "header.misc",
  OPEN_EXPLORER: "header.misc.openExplorer",
  UTILITY: "header.misc.utility",
  EXPORT: "header.misc.export",
  PRINT: "header.misc.print",
  EXIT: "header.misc.exit",

  ALERTS: "header.alerts",
  CHARTS: "header.charts",
  SETTINGS: "header.settings",
};

export const translations: I18n = {
  en: {
    "header.misc": "Misc",
    "header.misc.openExplorer": "Open Explorer",
    "header.misc.utility": "Utility",
    "header.misc.export": "Export",
    "header.misc.print": "Print",
    "header.misc.exit": "Exit",
    "header.alerts": "Alerts",
    "header.charts": "Charts",
    "header.settings": "Settings",

    "home.log": "Today's disk info has already been recorded.",
    "home.search.placeholder": "Search...",
  },
  zh: {
    "header.misc": "杂项",
    "header.misc.openExplorer": "打开资源管理器",
    "header.misc.utility": "实用工具",
    "header.misc.export": "导出",
    "header.misc.print": "打印",
    "header.misc.exit": "退出",
    "header.alerts": "警报",
    "header.charts": "图表",
    "header.settings": "设置",

    "home.log": "今日的磁盘信息已被记录。",
    "home.search.placeholder": "搜索...",
  },
  ja: {
    "header.misc": "その他",
    "header.misc.openExplorer": "エクスプローラーを開く",
    "header.misc.utility": "ユーティリティ",
    "header.misc.export": "エクスポート",
    "header.misc.print": "印刷",
    "header.misc.exit": "終了",
    "header.alerts": "アラート",
    "header.charts": "チャート",
    "header.settings": "設定",

    "home.log": "本日のディスク情報は既に記録されています。",
    "home.search.placeholder": "検索...",
  },
  ms: {
    "header.misc": "Pelbagai",
    "header.misc.openExplorer": "Buka Penjelajah",
    "header.misc.utility": "Utiliti",
    "header.misc.export": "Eksport",
    "header.misc.print": "Cetak",
    "header.misc.exit": "Keluar",
    "header.alerts": "Amaran",
    "header.charts": "Carta",
    "header.settings": "Tetapan",

    "home.log": "Maklumat cakera hari ini telah direkodkan.",
    "home.search.placeholder": "Cari...",
  },
  ko: {
    "header.misc": "기타",
    "header.misc.openExplorer": "탐색기 열기",
    "header.misc.utility": "유틸리티",
    "header.misc.export": "내보내기",
    "header.misc.print": "인쇄",
    "header.misc.exit": "종료",
    "header.alerts": "알림",
    "header.charts": "차트",
    "header.settings": "설정",

    "home.log": "오늘의 디스크 정보가 이미 기록되었습니다.",
    "home.search.placeholder": "검색...",
  },
  pt: {
    "header.misc": "Diversos",
    "header.misc.openExplorer": "Abrir Explorador",
    "header.misc.utility": "Utilitário",
    "header.misc.export": "Exportar",
    "header.misc.print": "Imprimir",
    "header.misc.exit": "Sair",
    "header.alerts": "Alertas",
    "header.charts": "Gráficos",
    "header.settings": "Configurações",

    "home.log": "As informações do disco de hoje já foram registradas.",
    "home.search.placeholder": "Pesquisar...",
  },
};

export function getTranslation(locale: keyof I18n, key: string): string {
  const localeTranslations = translations[locale];
  return localeTranslations[key] || key;
}

export let locale = $state<{ current: keyof I18n }>({
  current: (localStorage.locale as keyof I18n) || "en",
});

export const t = (key: string, vars = {}) =>
  getTranslation(locale.current, key);
