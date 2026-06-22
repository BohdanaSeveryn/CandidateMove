import { createContext, useState, useEffect } from "react"

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {}
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")

  useEffect(() => {
    document.body.dataset.theme = theme
    localStorage.setItem("theme", theme)
  }, [theme])

  function toggleTheme() {
    setTheme(prev => (prev === "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
