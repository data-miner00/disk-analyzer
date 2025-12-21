import EN from "./translations/en";
import ZH from "./translations/zh";
import JA from "./translations/ja";
import MS from "./translations/ms";
import KO from "./translations/ko";
import PT from "./translations/pt";
import ES from "./translations/es";

export { SETTINGS, HEADER, HOME } from "./translations/keys";

export type Translations = {
  [key: string]: string;
};

export type I18n = {
  [locale in "en" | "zh" | "ja" | "ms" | "ko" | "pt" | "es"]: Translations;
};

const translations: I18n = {
  en: EN,
  zh: ZH,
  ja: JA,
  ms: MS,
  ko: KO,
  pt: PT,
  es: ES,
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
