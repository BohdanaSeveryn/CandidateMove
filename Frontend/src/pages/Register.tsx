import { useState } from "react"
import { useTranslation } from "react-i18next"

export default function Register({ onBack }: { onBack: () => void }) {
  const { t } = useTranslation()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleRegister() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
      alert(t("registerFailed"))
      return
    }

    alert(t("registerSuccess"))
  }

  return (
    <div>
      <h1>{t("register")}</h1>

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

      <button onClick={handleRegister}>{t("register")}</button>

      <button onClick={onBack}>{t("backToLogin")}</button>
    </div>
  )
}
