import { useTranslation } from "react-i18next"
import { useContext } from "react"
import { ThemeContext } from "../theme/ThemeContext"

export default function Header() {
  const { i18n } = useTranslation()
  const { theme, toggleTheme } = useContext(ThemeContext)

  function changeLang(lang: string) {
    i18n.changeLanguage(lang)
    localStorage.setItem("lang", lang)
  }

  return (
    <header style={{ display: "flex", gap: "10px", padding: "10px" }}>
      <button onClick={() => changeLang("ua")}>UA</button>
      <button onClick={() => changeLang("en")}>EN</button>
      <button onClick={() => changeLang("fi")}>FI</button>

      <button onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </header>
  )
}
