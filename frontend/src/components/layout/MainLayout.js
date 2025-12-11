import React, { useState, useEffect } from "react";
import { policyAPI } from "../../services/api";
import Sidebar from "./Sidebar.js";
import Header from "./Header.js";
import Overview from "../dashboard/Overview.js";
import Policies from "../dashboard/Policies.js";
import Claims from "../dashboard/Claims.js";
import BuyPolicy from "../dashboard/BuyPolicy.js";
import Profile from "../dashboard/Profile.js";
import AdminDashboard from "../dashboard/AdminDashboard.js";
import ClaimModal from "../ui/ClaimModal.js";
import Toast from "../ui/Toast.js";

const notifications = [
  { id: 1, text: "Policy approved", time: "2 hours ago" },
  { id: 2, text: "Renewal reminder", time: "3 days" },
];

export default function MainLayout({ user, onLogout, darkMode, setDarkMode }) {
  const [policies, setPolicies] = useState([]);
  const [view, setView] = useState("overview");
  const [showClaim, setShowClaim] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPolicies = async () => {
    setLoading(true);
    try {
      const { data } = await policyAPI.getPolicies();
      setPolicies(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Policies Fetch Error:', err);
      setPolicies([]);
      showToast("Failed to load policies", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar user={user} setView={setView} onLogout={onLogout} currentView={view} />
      <div className="flex-1 flex flex-col">
        <Header user={user} notifications={notifications} darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Admin View */}
          {view === "overview" && user.role === 'admin' && (
            <AdminDashboard 
              allPolicies={policies} 
              showToast={showToast} 
              fetchPolicies={fetchPolicies} 
            />
          )}
          
          {/* User Overview */}
          {view === "overview" && user.role !== 'admin' && (
            <Overview 
              policies={policies.filter(p => p.userId?._id === user._id || !p.userId)} 
              setShowClaim={setShowClaim} 
              showToast={showToast} 
            />
          )}
          
          {/* Policies List */}
          {view === "policies" && (
            <Policies 
              policies={policies.filter(p => p.userId?._id === user._id || !p.userId)} 
              showToast={showToast} 
              userRole={user.role} 
              fetchPolicies={fetchPolicies} 
            />
          )}
          
          {/* CLAIMS - FIXED: Pass required props */}
          {view === "claims" && (
            <Claims 
              showToast={showToast} 
              policies={policies.filter(p => p.userId?._id === user._id || !p.userId)} 
              fetchPolicies={fetchPolicies} 
            />
          )}
          
          {/* BUY POLICY - FIXED: Pass required props */}
          {view === "buy" && (
            <BuyPolicy 
              showToast={showToast} 
              fetchPolicies={fetchPolicies}
              userId={user._id} 
            />
          )}
          
          {view === "profile" && <Profile user={user} />}
        </main>
      </div>
      
      {showClaim && policies[0] && (
        <ClaimModal 
          policy={policies[0]} 
          onClose={() => setShowClaim(false)} 
          showToast={showToast} 
        />
      )}
      
      {toast && (
        <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
