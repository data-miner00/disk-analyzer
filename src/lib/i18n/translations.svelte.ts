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

export const translations: I18n = {
  en: {
    "home.log": "Today's disk info has already been recorded.",
    "home.search.placeholder": "Search...",
  },
  zh: {
    "home.log": "今日的磁盘信息已被记录。",
    "home.search.placeholder": "搜索...",
  },
  ja: {
    "home.log": "本日のディスク情報は既に記録されています。",
    "home.search.placeholder": "検索...",
  },
  ms: {
    "home.log": "Maklumat cakera hari ini telah direkodkan.",
    "home.search.placeholder": "Cari...",
  },
  ko: {
    "home.log": "오늘의 디스크 정보가 이미 기록되었습니다.",
    "home.search.placeholder": "검색...",
  },
  pt: {
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
