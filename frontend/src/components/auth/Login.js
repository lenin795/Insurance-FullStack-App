import React, { useState } from 'react';
import { authAPI } from '../../services/api';

export default function Login({ onSwitchToSignup, onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            const { data } = await authAPI.signin({ username, password });
            if (data.error) {
                setError(data.error);
            } else {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                onLoginSuccess(data.user);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-screen rounded-3xl flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
            <div className="w-full max-w-md p-10 bg-white/95 backdrop-blur-xl rounded-3xl shadow-3xl border border-white/30">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Welcome Back</h1>
                    <p className="text-gray-600 mt-2">Sign in to manage your insurance</p>
                </div>
                {error && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-xl text-sm">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 outline-none transition" 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 outline-none transition" 
                    />
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition duration-200 disabled:opacity-50"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
                <p className="text-center text-xs text-gray-500 mt-6">
                    Don't have an account? <button onClick={onSwitchToSignup} className="text-indigo-600 font-medium hover:underline">Sign up</button>
                </p>
            </div>
        </div>
    );
}
