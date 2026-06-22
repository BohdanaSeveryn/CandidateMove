import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import ua from "./ua.json"
import en from "./en.json"
import fi from "./fi.json"
console.log("i18n initialized")

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ua: { translation: ua },
      en: { translation: en },
      fi: { translation: fi }
    },
    lng: localStorage.getItem("lang") || "ua",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  })

export default i18n
