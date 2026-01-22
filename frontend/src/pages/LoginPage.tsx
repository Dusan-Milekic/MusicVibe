import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Music, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
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
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        
        // Clear error for this field
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
            
            // Successful login
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true');
                }
            }
            
            // Redirect to dashboard
            navigate('/dashboard');
            
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
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/50 to-gray-950 text-white flex items-center justify-center px-4 sm:px-6 py-12">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-md">
                <div className="bg-gradient-to-br from-gray-900/80 to-purple-900/30 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden">
                    
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 px-8 sm:px-12 py-10 text-center border-b border-purple-500/20">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 mb-6">
                            <Music className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-3">
                            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                                Welcome Back
                            </span>
                        </h1>
                        <p className="text-base text-gray-300">
                            Login to continue your musical journey
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="px-8 sm:px-12 py-8 sm:py-10">
                        {/* General Error */}
                        {errors.general && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <p className="text-red-300 text-sm">{errors.general}</p>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className={`w-full pl-12 pr-4 py-3.5 bg-gray-900/60 border ${
                                            errors.email ? 'border-red-500' : 'border-purple-500/30'
                                        } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300`}
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {errors.email[0]}
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className={`w-full pl-12 pr-12 py-3.5 bg-gray-900/60 border ${
                                            errors.password ? 'border-red-500' : 'border-purple-500/30'
                                        } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300`}
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {errors.password[0]}
                                    </p>
                                )}
                            </div>

                            {/* Remember & Forgot Password */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input 
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 rounded border-purple-500/30 bg-gray-900/60 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
                                    />
                                    <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                        Remember me
                                    </span>
                                </label>
                                <Link 
                                    to="/forgot-password" 
                                    className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-300 ${
                                    loading 
                                        ? 'opacity-50 cursor-not-allowed' 
                                        : 'hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/50'
                                }`}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Logging in...</span>
                                    </>
                                ) : (
                                    <span>Login</span>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-800"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-gray-900/80 text-gray-500">OR</span>
                            </div>
                        </div>

                        {/* Register Link */}
                        <div className="text-center">
                            <p className="text-gray-400 text-sm">
                                Don't have an account?{' '}
                                <Link 
                                    to="/register" 
                                    className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                                >
                                    Create one for free
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                        <Music className="w-4 h-4" />
                        <span>100% Free • No Credit Card Required</span>
                    </p>
                </div>
            </div>
        </div>
    );
}