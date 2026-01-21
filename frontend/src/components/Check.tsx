export default function Check() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white px-6 py-20">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto space-y-16">
                {/* Header Section */}
                <div className="text-center space-y-6 animate-fade-in">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="text-5xl animate-bounce">👇</div>
                        <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                            Discover Music
                        </h1>
                        <div className="text-5xl animate-bounce delay-200">👇</div>
                    </div>
                    <p className="text-2xl text-purple-200/80 font-light tracking-wide">
                        Search, play, and vibe to any song in the universe
                    </p>
                </div>

                {/* Search Section */}
                <div className="relative animate-fade-in-delay">
                    {/* Glowing border effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
                    
                    <div className="relative bg-gradient-to-br from-slate-900/90 to-purple-900/50 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/30">
                        <div className="space-y-6">
                            <label 
                                htmlFor="music-search" 
                                className="block text-xl font-semibold text-purple-300 text-center"
                            >
                                🔍 Search the music and play it
                            </label>
                            
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-purple-400">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                
                                <input 
                                    id="music-search"
                                    type="text" 
                                    placeholder="Artist, song, album, or mood..."
                                    className="w-full pl-16 pr-6 py-5 bg-slate-900/80 border-2 border-purple-500/30 rounded-2xl text-white placeholder-purple-300/50 text-lg focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 group-hover:border-purple-500/50"
                                />
                                
                                <button className="absolute inset-y-0 right-3 px-6 my-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                                    Search
                                </button>
                            </div>

                            {/* Quick Search Tags */}
                            <div className="flex flex-wrap gap-3 justify-center pt-4">
                                {['Pop', 'Rock', 'Hip-Hop', 'Jazz', 'Electronic', 'Classical'].map((genre) => (
                                    <button 
                                        key={genre}
                                        className="px-5 py-2 bg-purple-500/20 border border-purple-400/30 rounded-full text-sm font-medium hover:bg-purple-500/40 hover:border-purple-400/60 hover:scale-105 transition-all duration-300"
                                    >
                                        {genre}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6 animate-fade-in-delay-2">
                    <div className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/50 hover:scale-105 transition-all duration-300">
                        <div className="text-4xl mb-3">🌍</div>
                        <h3 className="text-lg font-bold text-purple-200 mb-2">100M+ Songs</h3>
                        <p className="text-sm text-gray-400">Every song, every artist, from every corner of the world</p>
                    </div>

                    <div className="bg-gradient-to-br from-pink-900/40 to-slate-900/40 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/20 hover:border-pink-500/50 hover:scale-105 transition-all duration-300">
                        <div className="text-4xl mb-3">⚡</div>
                        <h3 className="text-lg font-bold text-pink-200 mb-2">Instant Play</h3>
                        <p className="text-sm text-gray-400">No waiting, no buffering, just pure music</p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/50 hover:scale-105 transition-all duration-300">
                        <div className="text-4xl mb-3">🎯</div>
                        <h3 className="text-lg font-bold text-blue-200 mb-2">Smart Search</h3>
                        <p className="text-sm text-gray-400">AI-powered to find exactly what you're feeling</p>
                    </div>
                </div>

                {/* Big Statement */}
                <div className="text-center space-y-6 py-16 animate-fade-in-delay-3">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                        <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                            We have ALL the music in the world.
                        </span>
                    </h2>
                    <p className="text-2xl text-purple-300/80 font-light max-w-3xl mx-auto">
                        Be modern. Be limitless. Be MusicVibe.
                    </p>
                    
                    {/* Floating music notes animation */}
                    <div className="flex justify-center gap-8 pt-8">
                        <div className="text-6xl animate-float">🎵</div>
                        <div className="text-6xl animate-float delay-300">🎶</div>
                        <div className="text-6xl animate-float delay-600">🎵</div>
                    </div>
                </div>

                {/* Trending Section */}
                <div className="space-y-6 animate-fade-in-delay-4">
                    <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        🔥 Trending Now
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { emoji: '🎸', title: 'Rock Legends', plays: '2.5M' },
                            { emoji: '🎤', title: 'Pop Hits 2024', plays: '4.1M' },
                            { emoji: '🎹', title: 'Chill Vibes', plays: '3.2M' },
                            { emoji: '🥁', title: 'Hip-Hop Heat', plays: '5.8M' },
                        ].map((playlist, index) => (
                            <div 
                                key={index}
                                className="group bg-slate-900/60 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/60 hover:bg-slate-900/80 transition-all duration-300 cursor-pointer"
                            >
                                <div className="text-5xl mb-2 group-hover:scale-110 transition-transform duration-300">
                                    {playlist.emoji}
                                </div>
                                <h4 className="font-bold text-white mb-1">{playlist.title}</h4>
                                <p className="text-sm text-purple-300">{playlist.plays} plays</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }

                .animate-fade-in-delay {
                    opacity: 0;
                    animation: fade-in 0.8s ease-out 0.3s forwards;
                }

                .animate-fade-in-delay-2 {
                    opacity: 0;
                    animation: fade-in 0.8s ease-out 0.6s forwards;
                }

                .animate-fade-in-delay-3 {
                    opacity: 0;
                    animation: fade-in 0.8s ease-out 0.9s forwards;
                }

                .animate-fade-in-delay-4 {
                    opacity: 0;
                    animation: fade-in 0.8s ease-out 1.2s forwards;
                }

                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }

                .delay-200 {
                    animation-delay: 200ms;
                }

                .delay-300 {
                    animation-delay: 300ms;
                }

                .delay-600 {
                    animation-delay: 600ms;
                }

                .delay-1000 {
                    animation-delay: 1000ms;
                }
            `}</style>
        </div>
    );
}