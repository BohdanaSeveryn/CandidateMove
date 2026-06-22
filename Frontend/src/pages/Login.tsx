import { useState } from "react"
import { useTranslation } from "react-i18next"
  
export default function Login({ onLogin, onGoRegister }: { onLogin: () => void, onGoRegister: () => void }) {
  const { t } = useTranslation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
      alert(t("loginFailed"))
      return
    }

    const data = await response.json()
    console.log("Login response:", data)

    localStorage.setItem("token", data.token)

    onLogin()
  }

  return (
    <div>
      <h2>{t("login")}</h2>

      <input
        type="email"
        placeholder={t("email")}
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder={t("password")}
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>{t("login")}</button>

      <button onClick={onGoRegister}>{t("createAccount")}</button>
    </div>
  )
}
