import { useState } from "react";
import { policyAPI } from "../../services/api";
import { MdCheckCircle } from 'react-icons/md';

export default function BuyPolicy({ showToast, fetchPolicies }) {
  const [form, setForm] = useState({
    policyholdername: "",
    policyname: "",
    policytype: "Health Insurance",
    providername: "",
    PremiumAmount: "",
    sumInsured: "",
    Frequency: "Annual",
    startdate: new Date().toISOString().split('T')[0],
    enddate: "",
    policystatus: "Active"
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // ✅ Backend AUTO-ADDS userId - no need to send it!
      const policyData = {
        policyholdername: form.policyholdername,
        policyname: form.policyname,
        policytype: form.policytype,
        providername: form.providername,
        PremiumAmount: parseFloat(form.PremiumAmount),
        sumInsured: form.sumInsured,
        Frequency: form.Frequency,
        startdate: form.startdate,
        enddate: form.enddate,
        policystatus: "Active"
      };

      console.log('Sending policy data:', policyData); // Debug
      
      const response = await policyAPI.createPolicy(policyData);
      console.log('Policy created:', response.data); // Debug
      
      showToast(`✅ Policy "${form.policyname}" purchased successfully!`, "success");
      fetchPolicies();
      setSuccess(true);
      
      // Reset form after 2s
      setTimeout(() => {
        setForm({
          policyholdername: "",
          policyname: "",
          policytype: "Health Insurance",
          providername: "",
          PremiumAmount: "",
          sumInsured: "",
          Frequency: "Annual",
          startdate: new Date().toISOString().split('T')[0],
          enddate: "",
          policystatus: "Active"
        });
        setSuccess(false);
      }, 2000);
      
    } catch (err) {
      console.error('Buy Policy ERROR:', err.response?.data || err);
      showToast(err.response?.data?.error || "Failed to purchase policy!", "error");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-4xl mx-auto text-center space-y-8 p-20">
        <div className="text-8xl bg-green-400 p-8 rounded-3xl inline-block animate-bounce">
          <MdCheckCircle className="text-green-800" />
        </div>
        <h2 className="text-5xl font-black bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
          Policy Purchased Successfully!
        </h2>
        <p className="text-2xl text-gray-600">Your new policy is now active</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center p-12 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-3xl shadow-2xl">
        <h1 className="text-5xl font-black mb-4">🛡️ Buy New Policy</h1>
        <p className="text-2xl opacity-90">Get comprehensive insurance coverage</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 border border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <input
              value={form.policyholdername}
              onChange={(e) => setForm({ ...form, policyholdername: e.target.value })}
              placeholder="Full Name *"
              required
              className="w-full p-6 border-2 border-gray-200 dark:border-gray-600 rounded-2xl text-xl font-semibold focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/50"
            />
            <input
              value={form.policyname}
              onChange={(e) => setForm({ ...form, policyname: e.target.value })}
              placeholder="Policy Name *"
              required
              className="w-full p-6 border-2 border-gray-200 dark:border-gray-600 rounded-2xl text-xl font-semibold focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/50"
            />
            <select
              value={form.policytype}
              onChange={(e) => setForm({ ...form, policytype: e.target.value })}
              required
              className="w-full p-6 border-2 border-gray-200 dark:border-gray-600 rounded-2xl text-xl font-semibold focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/50"
            >
              <option value="">Select Policy Type</option>
              <option>Health Insurance</option>
              <option>Motor Insurance</option>
              <option>Term Life Insurance</option>
              <option>Home Insurance</option>
              <option>Travel Insurance</option>
            </select>
          </div>

          <div className="space-y-6">
            <input
              value={form.providername}
              onChange={(e) => setForm({ ...form, providername: e.target.value })}
              placeholder="Insurance Provider *"
              required
              className="w-full p-6 border-2 border-gray-200 dark:border-gray-600 rounded-2xl text-xl font-semibold focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/50"
            />
            <input
              type="number"
              value={form.PremiumAmount}
              onChange={(e) => setForm({ ...form, PremiumAmount: e.target.value })}
              placeholder="Annual Premium (₹)"
              min="1000"
              required
              className="w-full p-6 border-2 border-gray-200 dark:border-gray-600 rounded-2xl text-xl font-semibold focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/50"
            />
            <input
              value={form.sumInsured}
              onChange={(e) => setForm({ ...form, sumInsured: e.target.value })}
              placeholder="Sum Insured (₹5,00,000)"
              required
              className="w-full p-6 border-2 border-gray-200 dark:border-gray-600 rounded-2xl text-xl font-semibold focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/50"
            />
          </div>

          <div className="md:col-span-2 grid md:grid-cols-2 gap-6 pt-4">
            <input
              type="date"
              value={form.startdate}
              onChange={(e) => setForm({ ...form, startdate: e.target.value })}
              required
              className="w-full p-6 border-2 border-gray-200 dark:border-gray-600 rounded-2xl text-xl font-semibold focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/50"
            />
            <input
              type="date"
              value={form.enddate}
              onChange={(e) => setForm({ ...form, enddate: e.target.value })}
              required
              className="w-full p-6 border-2 border-gray-200 dark:border-gray-600 rounded-2xl text-xl font-semibold focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/50"
            />
            <select
              value={form.Frequency}
              onChange={(e) => setForm({ ...form, Frequency: e.target.value })}
              className="w-full p-6 border-2 border-gray-200 dark:border-gray-600 rounded-2xl text-xl font-semibold focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/50 md:col-span-2"
            >
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Half-Yearly</option>
              <option>Annual</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-8 rounded-3xl font-black text-2xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all disabled:opacity-50"
          >
            {loading ? "⏳ Processing..." : `🚀 Purchase Policy - ₹${form.PremiumAmount || 0}`}
          </button>
        </form>
      </div>
    </div>
  );
}
