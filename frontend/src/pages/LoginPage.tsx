import React, { useState } from 'react';
import axios from 'axios';
import URL from '../config/api/baseURL';

interface LoginCredentials {
    email: string;
    password: string;
}

interface ApiResponse {
    token?: string;
    message?: string;
    profile?: any;
}

export default function LoginPage() {
    const [formData, setFormData] = useState<LoginCredentials>({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Očisti error za to polje
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: null
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            const response = await axios.post<ApiResponse>(`${URL}/auth/login`, formData);
            
            // Uspešan login
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            
            // Redirektuj na dashboard ili home
            window.location.href = '/dashboard';
            
            console.log('Login successful:', response.data);
        } catch (error: any) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else if (error.response?.data?.message) {
                setErrors({ general: error.response.data.message });
            } else {
                setErrors({ general: 'Something went wrong. Please try again.' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white flex items-center justify-center px-6">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-20 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-md w-full">
                {/* Card */}
                <div className="relative">
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl blur-2xl opacity-40"></div>
                    
                    <div className="relative bg-gradient-to-br from-slate-900/90 to-purple-900/50 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/30">
                        {/* Header */}
                        <div className="text-center space-y-4 mb-10">
                            <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                                Welcome Back
                            </h1>
                            <p className="text-gray-400">
                                Login to continue your musical journey
                            </p>
                        </div>

                        {/* General Error */}
                        {errors.general && (
                            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-center">
                                {errors.general}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-purple-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className={`w-full px-4 py-3 bg-slate-900/80 border-2 ${
                                        errors.email ? 'border-red-500' : 'border-purple-500/30'
                                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300`}
                                    placeholder="your.email@example.com"
                                />
                                {errors.email && (
                                    <p className="text-red-400 text-sm mt-1">{errors.email[0]}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-purple-300 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className={`w-full px-4 py-3 bg-slate-900/80 border-2 ${
                                        errors.password ? 'border-red-500' : 'border-purple-500/30'
                                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300`}
                                    placeholder="Enter your password"
                                />
                                {errors.password && (
                                    <p className="text-red-400 text-sm mt-1">{errors.password[0]}</p>
                                )}
                            </div>

                            {/* Remember & Forgot Password */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        className="w-4 h-4 rounded border-purple-500/30 bg-slate-900/80 text-purple-600 focus:ring-purple-500"
                                    />
                                    <span className="text-gray-400">Remember me</span>
                                </label>
                                <a href="/forgot-password" className="text-purple-400 hover:text-purple-300">
                                    Forgot password?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg transition-all duration-300 ${
                                    loading 
                                        ? 'opacity-50 cursor-not-allowed' 
                                        : 'hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50'
                                }`}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-700"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-slate-900/90 text-gray-400">OR</span>
                            </div>
                        </div>

                        {/* Register Link */}
                        <div className="text-center">
                            <p className="text-gray-400">
                                Don't have an account?{' '}
                                <a href="/register" className="text-purple-400 hover:text-purple-300 font-bold">
                                    Create one for free
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        🎵 100% Free • No Credit Card Required • Unlimited Music
                    </p>
                </div>
            </div>
        </div>
    );
}