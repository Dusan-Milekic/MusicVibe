export default function Profile() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white flex items-center justify-center px-6">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-20 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-md w-full">
                {/* Card */}
                <div className="relative animate-fade-in">
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl blur-2xl opacity-40"></div>
                    
                    <div className="relative bg-gradient-to-br from-slate-900/90 to-purple-900/50 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/30">
                        {/* Header */}
                        <div className="text-center space-y-4 mb-12">
                            <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                                Profile
                            </h1>
                            <p className="text-lg text-gray-400">
                                Join the music revolution
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="space-y-4">
                            <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300">
                                Login
                            </button>
                            
                            <button onClick={() => {
                                window.location.href = '/register';
                            }} className="w-full py-4 border-2 border-purple-400/50 rounded-xl font-bold text-lg hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300">
                                Register
                            </button>
                        </div>

                        {/* Footer Text */}
                        <p className="text-center text-sm text-gray-500 mt-8">
                            Start your free music journey today
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }

                .delay-1000 {
                    animation-delay: 1000ms;
                }
            `}</style>
        </div>
    );
}