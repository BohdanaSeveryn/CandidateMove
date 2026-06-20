import { useState } from "react"

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin() {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
      alert("Login failed")
      return
    }

    const data = await response.json()
    localStorage.setItem("token", data.token)
    onLogin()
  }

  return (
    <div>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  )
}
