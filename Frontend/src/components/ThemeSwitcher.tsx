import { useContext } from "react"
import { ThemeContext } from "../theme/ThemeContext"

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  )
}
