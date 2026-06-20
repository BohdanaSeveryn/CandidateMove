import { useState } from "react"
import Login from "./pages/Login"
import TrainingBoard from "./pages/TrainingBoard"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  )

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />
  }

  return <TrainingBoard />
}
