import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: "fl", // Set Flemish as the default language
    fallbackLng: "fl", // Use Flemish as the fallback language
    whitelist: ["fl", "en", "fr"], // Only allow these languages
    ns: ["common"], // Use the 'common' namespace
    defaultNS: "common",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Correct path to load translations
    },
  });

export default i18n;
