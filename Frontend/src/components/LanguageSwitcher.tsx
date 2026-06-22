import { useTranslation } from "react-i18next"

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  function changeLang(lang: string) {
    i18n.changeLanguage(lang)
    localStorage.setItem("lang", lang)
  }

  return (
    <div>
      <button onClick={() => changeLang("ua")}>UA</button>
      <button onClick={() => changeLang("en")}>EN</button>
      <button onClick={() => changeLang("fi")}>FI</button>
    </div>
  )
}
