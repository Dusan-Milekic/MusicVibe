import { useState } from 'react';
import { Search, Loader2, Music, Play, Sparkles } from 'lucide-react';
import Navigation from '../components/Navigation';
import FullscreenPlayerModal from '../components/FullScreenPlayerModel';
import { cliendID } from '../config/api/jamendo';
import type ITrack from '../interface/Track';
import { isAuth } from '../functions/auth';

const CLIENT_ID = cliendID;
const BASE_URL = 'https://api.jamendo.com/v3.0';

export default function SearchMusicPage() {

    if (!isAuth())
        window.location.href='/'

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<ITrack[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentTrack, setCurrentTrack] = useState<ITrack | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const quickSearchSuggestions = [
        { label: 'Jazz', icon: '🎷' },
        { label: 'Rock', icon: '🎸' },
        { label: 'Electronic', icon: '🎹' },
        { label: 'Piano', icon: '🎼' },
        { label: 'Guitar', icon: '🎵' },
    ];

    const searchTracks = async (query: string) => {
        if (!query.trim()) return;

        setLoading(true);
        setHasSearched(true);

        const url = `${BASE_URL}/tracks/?client_id=${CLIENT_ID}&format=json&limit=50&search=${encodeURIComponent(query)}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log('Search results:', data.results);
            setSearchResults(data.results || []);
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        searchTracks(searchQuery);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleQuickSearch = (query: string) => {
        setSearchQuery(query);
        searchTracks(query);
    };

    const playTrack = (track: ITrack) => {
        console.log('Playing:', track.name);
        setCurrentTrack(track);
    };

    const closeVisualizer = () => {
        setCurrentTrack(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/50 to-gray-950 text-white">
            <Navigation />

            <div className="lg:ml-64 p-4 sm:p-6 lg:p-8 pb-32">
                <FullscreenPlayerModal closeVisualizer={closeVisualizer} currentTrack={currentTrack} />

                {/* Search Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                            <Search className="w-6 h-6" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Search Music
                        </h1>
                    </div>
                    
                    {/* Search Form */}
                    <form onSubmit={handleSearch} className="max-w-3xl">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleInputChange}
                                placeholder="Search for songs, artists, albums..."
                                className="w-full pl-14 pr-32 py-4 rounded-xl bg-gray-900/60 border border-purple-500/30 text-white text-base placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                            />
                            <button
                                type="submit"
                                disabled={!searchQuery.trim() || loading}
                                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span className="hidden sm:inline">Searching...</span>
                                    </>
                                ) : (
                                    <span>Search</span>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Quick Search Suggestions */}
                    <div className="mt-4 flex items-center gap-2 flex-wrap">
                        <span className="text-sm text-gray-400 flex items-center gap-1">
                            <Sparkles className="w-4 h-4" />
                            Quick search:
                        </span>
                        {quickSearchSuggestions.map((suggestion) => (
                            <button
                                key={suggestion.label}
                                onClick={() => handleQuickSearch(suggestion.label.toLowerCase())}
                                className="px-4 py-2 bg-gray-900/60 border border-purple-500/20 hover:bg-purple-500/10 hover:border-purple-500/40 rounded-lg text-sm transition-all duration-300 flex items-center gap-2"
                            >
                                <span>{suggestion.icon}</span>
                                <span>{suggestion.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-16 h-16 text-purple-500 animate-spin mb-4" />
                        <p className="text-xl text-gray-400">Searching for tracks...</p>
                    </div>
                )}

                {/* No Results */}
                {!loading && hasSearched && searchResults.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center mb-6">
                            <Search className="w-12 h-12 text-purple-400" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3">No results found</h2>
                        <p className="text-gray-400 mb-6">Try searching with different keywords</p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setHasSearched(false);
                            }}
                            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold transition-colors"
                        >
                            Clear Search
                        </button>
                    </div>
                )}

                {/* Search Results */}
                {!loading && searchResults.length > 0 && (
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">
                                Search Results
                            </h2>
                            <span className="text-sm text-gray-400 bg-gray-900/60 px-4 py-2 rounded-full border border-gray-800">
                                {searchResults.length} tracks found
                            </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {searchResults.map((track) => (
                                <SearchResultCard
                                    key={track.id}
                                    track={track}
                                    isPlaying={currentTrack?.id === track.id}
                                    onPlay={() => playTrack(track)}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* Empty State (before search) */}
                {!loading && !hasSearched && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center mb-6">
                            <Music className="w-16 h-16 text-purple-400" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-3">Discover Music</h2>
                        <p className="text-gray-400 text-lg text-center max-w-md">
                            Search for your favorite songs, artists, and albums from our library
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Search Result Card Component
interface SearchResultCardProps {
    track: ITrack;
    isPlaying: boolean;
    onPlay: () => void;
}

function SearchResultCard({ track, isPlaying, onPlay }: SearchResultCardProps) {
    return (
        <div
            className={`group relative bg-gray-900/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 hover:bg-gray-800/80 transition-all duration-300 cursor-pointer ${
                isPlaying ? 'ring-2 ring-purple-500 bg-gray-800/80' : ''
            }`}
            onClick={onPlay}
        >
            {/* Album Art */}
            <div className="relative mb-3 overflow-hidden rounded-lg">
                <img
                    src={track.image}
                    alt={track.name}
                    className="w-full aspect-square object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Play Button Overlay */}
                <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                    isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                    </div>
                </div>

                {/* Playing Indicator Badge */}
                {isPlaying && (
                    <div className="absolute top-2 right-2 px-2 py-1 bg-purple-600 rounded-full flex items-center gap-1">
                        <div className="flex gap-0.5">
                            <div className="w-0.5 h-3 bg-white animate-pulse"></div>
                            <div className="w-0.5 h-3 bg-white animate-pulse" style={{animationDelay: '0.15s'}}></div>
                            <div className="w-0.5 h-3 bg-white animate-pulse" style={{animationDelay: '0.3s'}}></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Track Info */}
            <div className="space-y-1">
                <h3 className="font-semibold text-sm sm:text-base text-white truncate group-hover:text-purple-300 transition-colors">
                    {track.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 truncate">
                    {track.artist_name}
                </p>
            </div>
        </div>
    );
}