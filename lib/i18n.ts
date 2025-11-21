import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import enTranslations from "../locales/en/common.json";
import faTranslations from "../locales/fa/common.json";

const resources = {
  en: { translation: enTranslations },
  fa: { translation: faTranslations },
} as const;

const deviceLanguage =
  Localization.getLocales()[0]?.languageCode?.toLowerCase() || "en";

const options: InitOptions = {
  resources,
  lng: deviceLanguage === "fa" ? "fa" : "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  compatibilityJSON: "v4",
};

i18n.use(initReactI18next).init(options);

export default i18n;
