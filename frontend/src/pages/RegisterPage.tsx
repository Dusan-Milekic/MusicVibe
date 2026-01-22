import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    Mail, Lock, User, Calendar, FileText, Music, 
    Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, UserPlus 
} from 'lucide-react';
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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    // Success Screen
    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/50 to-gray-950 text-white flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 mb-4">
                        <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        Welcome to MusicVibe!
                    </h2>
                    <p className="text-xl text-gray-300">
                        Your account has been created successfully.
                    </p>
                    <button 
                        onClick={() => navigate('/login')}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                    >
                        <span>Go to Login</span>
                        <Music className="w-5 h-5" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/50 to-gray-950 text-white py-8 sm:py-12 px-4 sm:px-6">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
                <div className="bg-gradient-to-br from-gray-900/80 to-purple-900/30 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden">
                    
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 px-6 sm:px-10 py-8 text-center border-b border-purple-500/20">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 mb-4">
                            <UserPlus className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                                Create Account
                            </span>
                        </h1>
                        <p className="text-gray-300">
                            Join MusicVibe and start your musical journey
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="px-6 sm:px-10 py-8">
                        {/* General Error */}
                        {errors.general && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <p className="text-red-300 text-sm">{errors.general}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email & Username */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <InputField
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                    icon={<Mail className="w-5 h-5" />}
                                    placeholder="your.email@example.com"
                                    required
                                />
                                <InputField
                                    label="Username"
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    error={errors.username}
                                    icon={<User className="w-5 h-5" />}
                                    placeholder="cooluser123"
                                    required
                                />
                            </div>

                            {/* First & Last Name */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <InputField
                                    label="First Name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                    icon={<User className="w-5 h-5" />}
                                    placeholder="John"
                                    required
                                />
                                <InputField
                                    label="Last Name"
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    error={errors.last_name}
                                    icon={<User className="w-5 h-5" />}
                                    placeholder="Doe"
                                    required
                                />
                            </div>

                            {/* Password & Confirm Password */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <PasswordField
                                    label="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                    showPassword={showPassword}
                                    togglePassword={() => setShowPassword(!showPassword)}
                                    placeholder="Min 8 characters"
                                    required
                                />
                                <PasswordField
                                    label="Confirm Password"
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    showPassword={showConfirmPassword}
                                    togglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                                    placeholder="Re-enter password"
                                    required
                                />
                            </div>

                            {/* Birth Date */}
                            <InputField
                                label="Birth Date"
                                type="date"
                                name="birth_date"
                                value={formData.birth_date}
                                onChange={handleChange}
                                error={errors.birth_date}
                                icon={<Calendar className="w-5 h-5" />}
                                required
                            />

                            {/* Bio */}
                            <div>
                                <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">
                                    Bio <span className="text-gray-500">(Optional)</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute top-3 left-4 pointer-events-none">
                                        <FileText className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <textarea
                                        id="bio"
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-900/60 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                                        placeholder="Tell us about yourself..."
                                    />
                                </div>
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
                                        <span>Creating Account...</span>
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="w-5 h-5" />
                                        <span>Create Account</span>
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Login Link */}
                        <div className="text-center mt-6">
                            <p className="text-gray-400 text-sm">
                                Already have an account?{' '}
                                <Link 
                                    to="/login" 
                                    className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                                >
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Input Field Component
interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string[];
    icon?: React.ReactNode;
    placeholder?: string;
    required?: boolean;
}

function InputField({ label, type, name, value, onChange, error, icon, placeholder, required }: InputFieldProps) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-2">
                {label} {required && <span className="text-purple-400">*</span>}
            </label>
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={`w-full ${icon ? 'pl-12' : 'pl-4'} pr-4 py-3 bg-gray-900/60 border ${
                        error ? 'border-red-500' : 'border-purple-500/30'
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300`}
                    placeholder={placeholder}
                />
            </div>
            {error && (
                <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {error[0]}
                </p>
            )}
        </div>
    );
}

// Password Field Component
interface PasswordFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string[];
    showPassword: boolean;
    togglePassword: () => void;
    placeholder?: string;
    required?: boolean;
}

function PasswordField({ label, name, value, onChange, error, showPassword, togglePassword, placeholder, required }: PasswordFieldProps) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-2">
                {label} {required && <span className="text-purple-400">*</span>}
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-5 h-5" />
                </div>
                <input
                    type={showPassword ? 'text' : 'password'}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    minLength={8}
                    className={`w-full pl-12 pr-12 py-3 bg-gray-900/60 border ${
                        error ? 'border-red-500' : 'border-purple-500/30'
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300`}
                    placeholder={placeholder}
                />
                <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            </div>
            {error && (
                <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {error[0]}
                </p>
            )}
        </div>
    );
}