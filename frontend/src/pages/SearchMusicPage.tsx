import { useState } from 'react';
import { cliendID } from '../config/api/jamendo';
import Navigation from '../components/Navigation';
import type ITrack from '../interface/Track';
import FullscreenPlayerModal from '../components/FullScreenPlayerModel';
const CLIENT_ID = cliendID;
const BASE_URL = 'https://api.jamendo.com/v3.0';



export default function SearchMusicPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<ITrack[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentTrack, setCurrentTrack] = useState<ITrack | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

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

    const playTrack = (track: ITrack) => {
        console.log('Playing:', track.name);
        setCurrentTrack(track);
    };

    const closeVisualizer = () => {
        setCurrentTrack(null);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Sidebar Navigation */}
            <Navigation />

            {/* Main Content */}
            <div className="ml-64 p-8">
                {/* Fullscreen Player Modal */}
                <FullscreenPlayerModal closeVisualizer={closeVisualizer} currentTrack={currentTrack} />

                {/* Search Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-6">🔍 Search Music</h1>
                    
                    {/* Search Form */}
                    <form onSubmit={handleSearch} className="relative">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleInputChange}
                                placeholder="Search for songs, artists, albums..."
                                className="w-full max-w-2xl px-6 py-4 pr-32 rounded-full bg-gray-800 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                            />
                            <button
                                type="submit"
                                disabled={!searchQuery.trim() || loading}
                                className="absolute right-2 top-1/2 -translate-y-1/2 px-8 py-2 bg-green-500 hover:bg-green-600 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                {loading ? 'Searching...' : 'Search'}
                            </button>
                        </div>
                    </form>

                    {/* Quick Search Suggestions */}
                    <div className="mt-4 flex gap-2 flex-wrap">
                        <span className="text-sm text-gray-400">Try:</span>
                        {['jazz', 'rock', 'electronic', 'piano', 'guitar'].map((genre) => (
                            <button
                                key={genre}
                                onClick={() => {
                                    setSearchQuery(genre);
                                    searchTracks(genre);
                                }}
                                className="px-4 py-1 bg-gray-800 hover:bg-gray-700 rounded-full text-sm transition"
                            >
                                {genre}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mb-4"></div>
                        <p className="text-xl text-gray-400">Searching...</p>
                    </div>
                )}

                {/* No Results */}
                {!loading && hasSearched && searchResults.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <h2 className="text-2xl font-bold mb-2">No results found</h2>
                        <p className="text-gray-400">Try searching with different keywords</p>
                    </div>
                )}

                {/* Search Results */}
                {!loading && searchResults.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-6">
                            Search Results 
                            <span className="text-gray-400 font-normal text-lg ml-3">
                                ({searchResults.length} tracks)
                            </span>
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {searchResults.map((track) => (
                                <div
                                    key={track.id}
                                    className={`bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-all cursor-pointer group ${
                                        currentTrack?.id === track.id ? 'ring-2 ring-green-500 bg-gray-700' : ''
                                    }`}
                                    onClick={() => playTrack(track)}
                                >
                                    <div className="relative mb-3">
                                        <img
                                            src={track.image}
                                            alt={track.name}
                                            className="w-full aspect-square object-cover rounded"
                                        />
                                        {/* Play overlay */}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded">
                                            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-xl">
                                                <span className="text-2xl">▶️</span>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="font-semibold truncate text-white">
                                        {track.name}
                                    </h3>
                                    <p className="text-sm text-gray-400 truncate">
                                        {track.artist_name}
                                    </p>

                                    {/* Playing indicator */}
                                    {currentTrack?.id === track.id && (
                                        <div className="mt-2 flex items-center gap-2">
                                            <div className="flex gap-1">
                                                <div className="w-1 h-4 bg-green-500 animate-pulse"></div>
                                                <div className="w-1 h-4 bg-green-500 animate-pulse" style={{animationDelay: '0.15s'}}></div>
                                                <div className="w-1 h-4 bg-green-500 animate-pulse" style={{animationDelay: '0.3s'}}></div>
                                            </div>
                                            <span className="text-green-500 text-xs font-semibold">Playing</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Empty State (before search) */}
                {!loading && !hasSearched && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="text-8xl mb-6">🎵</div>
                        <h2 className="text-3xl font-bold mb-3">Search for music</h2>
                        <p className="text-gray-400 text-lg">
                            Find your favorite songs, artists, and albums
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}