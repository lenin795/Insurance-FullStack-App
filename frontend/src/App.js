// src/components/App.js
import React, { useState, useEffect } from "react"
import Login from "./components/auth/Login.js"
import MainLayout from "./components/layout/MainLayout.js"

export default function InsuranceApp() {
  const [user, setUser] = useState(null)
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const handleLogin = () => {
    setUser({
      name: "Rahul Kumar",
      email: "rahul.kumar@example.com",
      phone: "+91 98765 43210",
      avatar: "RK"
    })
  }

  return (
    <div className="min-h-screen transition-colors">
      {!user ? <Login onLogin={handleLogin} /> : <MainLayout user={user} onLogout={() => setUser(null)} darkMode={darkMode} setDarkMode={setDarkMode} />}
    </div>
  )
}