export default function About() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950 text-white overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-700"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-fade-in">
                            MusicVibe
                        </h1>
                        <p className="text-2xl md:text-3xl lg:text-4xl font-light text-purple-200/90 tracking-wide animate-fade-in-delay">
                            Where Sound Meets Soul
                        </p>
                    </div>

                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay-2">
                        Experience music like never before with cutting-edge features, 
                        AI-powered recommendations, and a community of millions.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-fade-in-delay-3">
                        <button className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-lg hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300">
                            Start Listening Free
                        </button>
                        <button className="px-10 py-4 border-2 border-purple-400/50 rounded-full font-bold text-lg hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300">
                            Explore Features
                        </button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-purple-400/50 rounded-full flex items-start justify-center p-2">
                        <div className="w-1.5 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-5xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Why MusicVibe?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="group relative bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                            
                            <div className="relative">
                                <div className="text-6xl mb-6">🎵</div>
                                <h3 className="text-2xl font-bold mb-4 text-purple-200">AI-Powered Playlists</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Our advanced AI learns your taste and creates perfect playlists that evolve with your mood.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="group relative bg-gradient-to-br from-pink-900/30 to-purple-900/30 backdrop-blur-sm rounded-3xl p-8 border border-pink-500/20 hover:border-pink-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20">
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                            
                            <div className="relative">
                                <div className="text-6xl mb-6">🎧</div>
                                <h3 className="text-2xl font-bold mb-4 text-pink-200">Hi-Fi Quality</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Stream in lossless quality. Every beat, every note, crystal clear like the artist intended.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="group relative bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                            
                            <div className="relative">
                                <div className="text-6xl mb-6">👥</div>
                                <h3 className="text-2xl font-bold mb-4 text-blue-200">Social Experience</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Share, collaborate, and discover music with friends. Create collaborative playlists together.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center space-y-2">
                            <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                50M+
                            </div>
                            <div className="text-gray-400 font-medium">Active Users</div>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                                100M+
                            </div>
                            <div className="text-gray-400 font-medium">Songs</div>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                24/7
                            </div>
                            <div className="text-gray-400 font-medium">Streaming</div>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                190+
                            </div>
                            <div className="text-gray-400 font-medium">Countries</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-32 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-5xl md:text-6xl font-black tracking-tight">
                        Ready to Feel the Vibe?
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Join millions of music lovers. Start your journey with 3 months free.
                    </p>
                    <div className="pt-8">
                        <button className="px-12 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_100%] rounded-full font-bold text-xl hover:bg-[position:100%_0] hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 animate-gradient">
                            Get Started Now →
                        </button>
                    </div>
                </div>
            </section>

            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes gradient {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }

                .animate-fade-in-delay {
                    opacity: 0;
                    animation: fade-in 0.8s ease-out 0.2s forwards;
                }

                .animate-fade-in-delay-2 {
                    opacity: 0;
                    animation: fade-in 0.8s ease-out 0.4s forwards;
                }

                .animate-fade-in-delay-3 {
                    opacity: 0;
                    animation: fade-in 0.8s ease-out 0.6s forwards;
                }

                .animate-gradient {
                    animation: gradient 3s ease infinite;
                }

                .delay-700 {
                    animation-delay: 700ms;
                }

                .delay-1000 {
                    animation-delay: 1000ms;
                }
            `}</style>
        </div>
    );
}