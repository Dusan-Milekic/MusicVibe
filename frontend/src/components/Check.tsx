import { Search, Music, Zap, Target, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import FeatureCard from './FeatureCard';
import TrendingCard from './TrendingCard';
export default function Check() {
    const [searchQuery, setSearchQuery] = useState('');

    const genres = ['Pop', 'Rock', 'Hip-Hop', 'Jazz', 'Electronic', 'Classical'];
    
    const trendingPlaylists = [
        { icon: '🎸', title: 'Rock Legends', plays: '2.5M', color: 'from-red-600/20 to-orange-600/20' },
        { icon: '🎤', title: 'Pop Hits 2024', plays: '4.1M', color: 'from-pink-600/20 to-purple-600/20' },
        { icon: '🎹', title: 'Chill Vibes', plays: '3.2M', color: 'from-blue-600/20 to-cyan-600/20' },
        { icon: '🥁', title: 'Hip-Hop Heat', plays: '5.8M', color: 'from-purple-600/20 to-pink-600/20' },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Search logic here
        console.log('Searching for:', searchQuery);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/50 to-gray-950 text-white">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
                
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 mb-4">
                        <Search className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                        <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                            Discover Music
                        </span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
                        Search, play, and vibe to millions of songs from around the world
                    </p>
                </div>

                {/* Search Section */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-gray-900/80 to-purple-900/30 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-purple-500/30 shadow-xl">
                        <form onSubmit={handleSearch} className="space-y-6">
                            {/* Search Input */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                                    <Search className="w-5 h-5" />
                                </div>
                                
                                <input 
                                    type="text" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for songs, artists, albums..."
                                    className="w-full pl-12 pr-32 py-4 bg-gray-900/60 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                                />
                                
                                <button 
                                    type="submit"
                                    className="absolute inset-y-2 right-2 px-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2"
                                >
                                    <span className="hidden sm:inline">Search</span>
                                    <Search className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Genre Tags */}
                            <div className="flex flex-wrap gap-2 justify-center">
                                {genres.map((genre) => (
                                    <button 
                                        key={genre}
                                        type="button"
                                        className="px-4 py-2 bg-purple-500/20 border border-purple-400/30 rounded-full text-sm font-medium hover:bg-purple-500/30 hover:border-purple-400/50 transition-all duration-300"
                                    >
                                        {genre}
                                    </button>
                                ))}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={<Music className="w-8 h-8" />}
                        title="100M+ Songs"
                        description="Access to millions of tracks from every genre and era"
                        gradient="from-purple-600/20 to-pink-600/20"
                         borderColor="border-purple-500/30"
                    />
                    <FeatureCard
                        icon={<Zap className="w-8 h-8" />}
                        title="Instant Play"
                        description="Lightning-fast streaming with no buffering or delays"
                        gradient="from-pink-600/20 to-purple-600/20"
                        borderColor="border-purple-500/30"
                    />
                    <FeatureCard
                        icon={<Target className="w-8 h-8" />}
                        title="Smart Search"
                        description="AI-powered search finds exactly what you're looking for"
                        gradient="from-blue-600/20 to-purple-600/20"
                        borderColor="border-purple-500/30"
                    />
                </div>

                {/* Statement Section */}
                <div className="text-center space-y-6 py-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                        <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                            Your Music Universe Awaits
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Explore millions of songs, discover new artists, and create your perfect soundtrack
                    </p>
                </div>

                {/* Trending Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-center gap-3">
                        <TrendingUp className="w-6 h-6 text-purple-400" />
                        <h3 className="text-2xl sm:text-3xl font-bold text-center">
                            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Trending Now
                            </span>
                        </h3>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {trendingPlaylists.map((playlist, index) => (
                            <TrendingCard key={index} {...playlist} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


