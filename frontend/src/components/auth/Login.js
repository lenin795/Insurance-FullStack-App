// src/components/auth/Login.js
import React from "react"

export default function Login({ onLogin }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <div className="w-full max-w-md p-10 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to manage your insurance</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-6">
          <input type="email" placeholder="Email"  className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 outline-none transition" />
          <input type="password" placeholder="Password"  className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 outline-none transition" />
          <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition duration-200">
            Sign In (Demo)
          </button>
        </form>
        <p className="text-center text-xs text-gray-500 mt-6">Just click "Sign In" — no password needed</p>
      </div>
    </div>
  )
}