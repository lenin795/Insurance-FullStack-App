// src/components/layout/MainLayout.js
import React, { useState } from "react"
import Sidebar from "./Sidebar.js"
import Header from "./Header.js"
import Overview from "../dashboard/Overview.js"
import Policies from "../dashboard/Policies.js"
import Claims from "../dashboard/Claims.js"
import BuyPolicy from "../dashboard/BuyPolicy.js"
import Profile from "../dashboard/Profile.js"
import ClaimModal from "../ui/ClaimModal.js"
import Toast from "../ui/Toast.js"

const policies = [
  { id: "P-1001", type: "Health Insurance", provider: "CarePlus", premium: "₹4,200/yr", sumInsured: "₹5,00,000", status: "Active", renewal: "2026-03-12" },
  { id: "P-1002", type: "Motor Insurance", provider: "DriveSafe", premium: "₹8,500/yr", sumInsured: "₹2,00,000", status: "Active", renewal: "2025-12-22" },
  { id: "P-1003", type: "Term Life", provider: "SecureLife", premium: "₹6,000/yr", sumInsured: "₹25,00,000", status: "Lapsed", renewal: "2024-08-01" },
]

const notifications = [
  { id: 1, text: "Policy P-1001: Pre-authorization approved", time: "2 hours ago" },
  { id: 2, text: "Renewal reminder for P-1002", time: "3 days" },
]

export default function MainLayout({ user, onLogout, darkMode, setDarkMode }) {
  const [view, setView] = useState("overview")
  const [showClaim, setShowClaim] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (msg, type = "success") => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 4000)
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar user={user} setView={setView} onLogout={onLogout} currentView={view} />
      <div className="flex-1 flex flex-col">
        <Header user={user} notifications={notifications} darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="flex-1 p-6 overflow-y-auto">
          {view === "overview" && <Overview policies={policies} setShowClaim={setShowClaim} showToast={showToast} />}
          {view === "policies" && <Policies policies={policies} showToast={showToast} />}
          {view === "claims" && <Claims showToast={showToast} />}
          {view === "buy" && <BuyPolicy showToast={showToast} />}
          {view === "profile" && <Profile user={user} />}
        </main>
      </div>
      {showClaim && <ClaimModal policy={policies[0]} onClose={() => setShowClaim(false)} showToast={showToast} />}
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}