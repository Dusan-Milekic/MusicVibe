import React, { useState } from 'react';
import axios from 'axios';
import URL from '../config/api/baseURL';

interface RegisterProfile {
    email: string;
    username: string;
    password: string;
    password_confirmation: string;
    name: string;
    last_name: string;
    birth_date: string;
    bio: string;
}

interface ApiResponse {
    token?: string;
    message?: string;
    profile?: any;
}

export default function RegisterPage() {
    const [formData, setFormData] = useState<RegisterProfile>({
        email: '',
        username: '',
        password: '',
        password_confirmation: '',
        name: '',
        last_name: '',
        birth_date: '',
        bio: ''
    });

    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            const response = await axios.post<ApiResponse>(`${URL}/auth/register`, formData);
            
            setSuccess(true);
            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            
            console.log('Registration successful:', response.data);
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

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white flex items-center justify-center px-6">
                <div className="max-w-md w-full text-center space-y-6">
                    <div className="text-6xl">🎉</div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        Welcome to MusicVibe!
                    </h2>
                    <p className="text-xl text-gray-300">
                        Your account has been created successfully.
                    </p>
                    <button 
                        onClick={() => window.location.href = '/login'}
                        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:scale-105 transition-all duration-300"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white py-12 px-6">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-20 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
                <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl blur-2xl opacity-40"></div>
                    
                    <div className="relative bg-gradient-to-br from-slate-900/90 to-purple-900/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-purple-500/30">
                        <div className="text-center space-y-4 mb-8">
                            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                                Create Account
                            </h1>
                            <p className="text-gray-400">
                                Join MusicVibe and start your musical journey
                            </p>
                        </div>

                        {errors.general && (
                            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300">
                                {errors.general}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-purple-300 mb-2">
                                    Email *
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

                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-purple-300 mb-2">
                                    Username *
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className={`w-full px-4 py-3 bg-slate-900/80 border-2 ${
                                        errors.username ? 'border-red-500' : 'border-purple-500/30'
                                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300`}
                                    placeholder="cooluser123"
                                />
                                {errors.username && (
                                    <p className="text-red-400 text-sm mt-1">{errors.username[0]}</p>
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-purple-300 mb-2">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-3 bg-slate-900/80 border-2 ${
                                            errors.name ? 'border-red-500' : 'border-purple-500/30'
                                        } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300`}
                                        placeholder="John"
                                    />
                                    {errors.name && (
                                        <p className="text-red-400 text-sm mt-1">{errors.name[0]}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="last_name" className="block text-sm font-medium text-purple-300 mb-2">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-3 bg-slate-900/80 border-2 ${
                                            errors.last_name ? 'border-red-500' : 'border-purple-500/30'
                                        } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300`}
                                        placeholder="Doe"
                                    />
                                    {errors.last_name && (
                                        <p className="text-red-400 text-sm mt-1">{errors.last_name[0]}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-purple-300 mb-2">
                                        Password *
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        minLength={8}
                                        className={`w-full px-4 py-3 bg-slate-900/80 border-2 ${
                                            errors.password ? 'border-red-500' : 'border-purple-500/30'
                                        } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300`}
                                        placeholder="Min 8 characters"
                                    />
                                    {errors.password && (
                                        <p className="text-red-400 text-sm mt-1">{errors.password[0]}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-purple-300 mb-2">
                                        Confirm Password *
                                    </label>
                                    <input
                                        type="password"
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        value={formData.password_confirmation}
                                        onChange={handleChange}
                                        required
                                        minLength={8}
                                        className="w-full px-4 py-3 bg-slate-900/80 border-2 border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300"
                                        placeholder="Re-enter password"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="birth_date" className="block text-sm font-medium text-purple-300 mb-2">
                                    Birth Date *
                                </label>
                                <input
                                    type="date"
                                    id="birth_date"
                                    name="birth_date"
                                    value={formData.birth_date}
                                    onChange={handleChange}
                                    required
                                    className={`w-full px-4 py-3 bg-slate-900/80 border-2 ${
                                        errors.birth_date ? 'border-red-500' : 'border-purple-500/30'
                                    } rounded-xl text-white focus:outline-none focus:border-purple-500 transition-all duration-300`}
                                />
                                {errors.birth_date && (
                                    <p className="text-red-400 text-sm mt-1">{errors.birth_date[0]}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="bio" className="block text-sm font-medium text-purple-300 mb-2">
                                    Bio (Optional)
                                </label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-slate-900/80 border-2 border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300 resize-none"
                                    placeholder="Tell us about yourself..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg transition-all duration-300 ${
                                    loading 
                                        ? 'opacity-50 cursor-not-allowed' 
                                        : 'hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50'
                                }`}
                            >
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>

                        <p className="text-center text-gray-400 mt-6">
                            Already have an account?{' '}
                            <a href="/login" className="text-purple-400 hover:text-purple-300 font-bold">
                                Login here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}