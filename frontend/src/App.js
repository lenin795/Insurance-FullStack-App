import React, { useState, useEffect } from "react";
import Login from "./components/auth/Login.js";
import Signup from "./components/auth/Signup.js";
import MainLayout from "./components/layout/MainLayout.js";

export default function App() {
  const [user, setUser] = useState(null);
  const [authView, setAuthView] = useState("login"); // login | signup
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // 1) Load user + theme from localStorage once
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);

    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // 2) Apply/remove "dark" class on <html> when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setAuthView("login"); // Reset to login screen
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-lg text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  // ✅ USER LOGGED IN: Show Dashboard
  if (user) {
    return (
      <MainLayout
        user={user}
        onLogout={handleLogout}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    );
  }

  // ✅ NO USER: Show Login/Signup Screens
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-8">
      {authView === "login" ? (
        <Login 
          onSwitchToSignup={() => setAuthView("signup")}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : (
        <Signup 
          onSwitchToLogin={() => setAuthView("login")}
          onSignupSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}
