import { Link } from 'react-router-dom';
import { Music, LogIn, UserPlus, Sparkles, Shield, Zap } from 'lucide-react';

export default function Profile() {
    const features = [
        { icon: <Sparkles className="w-5 h-5" />, text: 'Unlimited music streaming' },
        { icon: <Shield className="w-5 h-5" />, text: 'Ad-free experience' },
        { icon: <Zap className="w-5 h-5" />, text: 'Instant access to millions of songs' },
    ];

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
                                Welcome
                            </span>
                        </h1>
                        <p className="text-base sm:text-lg text-gray-300">
                            Join the music revolution
                        </p>
                    </div>

                    {/* Content Section */}
                    <div className="px-8 sm:px-12 py-8 sm:py-10 space-y-8">
                        
                        {/* Features List */}
                        <div className="space-y-3">
                            {features.map((feature, index) => (
                                <div 
                                    key={index}
                                    className="flex items-center gap-3 text-sm text-gray-300"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                                        {feature.icon}
                                    </div>
                                    <span>{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <Link
                                to="/login"
                                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-base hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                            >
                                <LogIn className="w-5 h-5" />
                                <span>Login</span>
                            </Link>
                            
                            <Link
                                to="/register"
                                className="w-full flex items-center justify-center gap-2 py-3.5 border-2 border-purple-400/40 rounded-xl font-semibold text-base hover:bg-purple-500/10 hover:border-purple-400/60 transition-all duration-300"
                            >
                                <UserPlus className="w-5 h-5" />
                                <span>Create Account</span>
                            </Link>
                        </div>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-800"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-gray-900/80 text-gray-500">Quick Access</span>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="grid grid-cols-2 gap-3">
                            <Link
                                to="/about"
                                className="text-center py-3 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:bg-gray-800 hover:border-purple-500/30 transition-all duration-300"
                            >
                                <div className="text-sm font-medium text-gray-300">About</div>
                            </Link>
                            <Link
                                to="/check"
                                className="text-center py-3 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:bg-gray-800 hover:border-purple-500/30 transition-all duration-300"
                            >
                                <div className="text-sm font-medium text-gray-300">Discover</div>
                            </Link>
                        </div>

                        {/* Footer */}
                        <div className="text-center pt-4 space-y-2">
                            <p className="text-sm text-gray-400">
                                Start your free music journey today
                            </p>
                            <p className="text-xs text-gray-500">
                                No credit card required • 100% free forever
                            </p>
                        </div>
                    </div>
                </div>

                {/* Social Proof */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Join <span className="text-purple-400 font-semibold">50M+</span> music lovers worldwide
                    </p>
                </div>
            </div>
        </div>
    );
}