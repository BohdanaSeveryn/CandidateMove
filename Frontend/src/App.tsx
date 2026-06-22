import { useState } from "react"
import Header from "./components/Header"
import Login from "./pages/Login"
import TrainingBoard from "./pages/TrainingBoard"
import Register from "./pages/Register"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"))
  const [showRegister, setShowRegister] = useState(false)

  function handleLogin() {
    setIsLoggedIn(true)
  }

  function handleLogout() {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
  }

  function handleGoRegister() {
    setShowRegister(true)
  }

  function handleBackToLogin() {
    setShowRegister(false)
  }

  return (
    <>
      <Header />

      {isLoggedIn ? (
        <TrainingBoard onLogout={handleLogout} />
      ) : showRegister ? (
        <Register onBack={handleBackToLogin} />
      ) : (
        <Login onLogin={handleLogin} onGoRegister={handleGoRegister} />
      )}
    </>
  )
}
