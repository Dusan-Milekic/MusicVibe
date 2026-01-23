import { useState, useEffect } from 'react';
import { Heart, Library as LibraryIcon, Play, X, Search, Music } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import FullscreenPlayerModal from '../components/FullScreenPlayerModel';
import type ITrack from '../interface/Track';
import URL from '../config/api/baseURL';

export default function Library() {
    const [currentTrack, setCurrentTrack] = useState<ITrack | null>(null);
    const [favorites, setFavorites] = useState<ITrack[]>([]);
    const [activeTab, setActiveTab] = useState<'favorites' | 'playlists'>('favorites');
    const navigate = useNavigate();

    // Load favorites from backend
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch(`${URL}/library`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch favorites');
                }

                const data = await response.json();
                console.log(data)
                const savedFavorites: ITrack[] = data.data;
                setFavorites(savedFavorites);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, []);

    const playTrack = (track: ITrack) => {
        console.log('Playing:', track.name);
        setCurrentTrack(track);
    };

    const closeVisualizer = () => {
        setCurrentTrack(null);
    };

    const removeFromFavorites = async (jamendoTrackId: string) => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            console.error('User not authenticated');
            return;
        }

        try {
            const response = await fetch(`${URL}/library/${jamendoTrackId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to remove from favorites');
            }

            // Ukloni iz lokalnog state-a - traži po jamendo_track_id
            const updated = favorites.filter(t => t.jamendo_track_id !== jamendoTrackId);
            setFavorites(updated);
            
        } catch (error) {
            console.error('Error removing from favorites:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/50 to-gray-950 text-white">
            <Navigation />
           
            {/* Main Content */}
            <div className="lg:ml-64 p-4 sm:p-6 lg:p-8 pb-32">
                {/* Fullscreen Player Modal */}
                <FullscreenPlayerModal closeVisualizer={closeVisualizer} currentTrack={currentTrack} />

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                            <LibraryIcon className="w-6 h-6" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Your Library
                        </h1>
                    </div>
                    <p className="text-gray-400 ml-15">Your favorite songs and collections</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 bg-gray-900/50 backdrop-blur-sm rounded-xl p-1 border border-gray-800 w-fit">
                    <button
                        onClick={() => setActiveTab('favorites')}
                        className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                            activeTab === 'favorites'
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                        }`}
                    >
                        <Heart className={`w-5 h-5 ${activeTab === 'favorites' ? 'fill-white' : ''}`} />
                        <span className="hidden sm:inline">Favorites</span>
                        <span className="inline sm:hidden">({favorites.length})</span>
                        <span className="hidden sm:inline bg-white/20 px-2 py-0.5 rounded-full text-xs">
                            {favorites.length}
                        </span>
                    </button>
                </div>

                {/* Favorites Tab */}
                {activeTab === 'favorites' && (
                    <div>
                        {favorites.length === 0 ? (
                            <EmptyState onBrowse={() => navigate('/search')} />
                        ) : (
                            <div className="space-y-6">
                                {/* Stats */}
                                <div className="flex items-center gap-6 text-sm text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <Music className="w-4 h-4" />
                                        <span>{favorites.length} songs</span>
                                    </div>
                                </div>

                                {/* Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                    {favorites.map((track: ITrack) => (
                                        <FavoriteTrackCard
                                            key={track.id}
                                            track={track}
                                            isPlaying={currentTrack?.jamendo_track_id === track.jamendo_track_id}
                                            onPlay={() => playTrack(track)}
                                            onRemove={() => removeFromFavorites(track.jamendo_track_id)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// Empty State Component
interface EmptyStateProps {
    onBrowse: () => void;
}

function EmptyState({ onBrowse }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center mb-6">
                <Heart className="w-12 h-12 text-purple-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center">No favorites yet</h2>
            <p className="text-gray-400 text-base sm:text-lg mb-6 text-center max-w-md">
                Start adding songs to your favorites and build your perfect music collection
            </p>
            <button 
                onClick={onBrowse}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
            >
                <Search className="w-5 h-5" />
                <span>Browse Music</span>
            </button>
        </div>
    );
}

// Favorite Track Card Component
interface FavoriteTrackCardProps {
    track: ITrack;
    isPlaying: boolean;
    onPlay: () => void;
    onRemove: () => void;
}

function FavoriteTrackCard({ track, isPlaying, onPlay, onRemove }: FavoriteTrackCardProps) {
    return (
        <div
            className={`group relative bg-gray-900/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 hover:bg-gray-800/80 transition-all duration-300 ${
                isPlaying ? 'ring-2 ring-purple-500 bg-gray-800/80' : ''
            }`}
        >
            {/* Remove Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                }}
                className="absolute top-2 right-2 z-10 w-8 h-8 bg-red-500/90 hover:bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Remove from favorites"
            >
                <X className="w-4 h-4 text-white" />
            </button>

            {/* Main Content */}
            <div 
                className="cursor-pointer"
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
                        <div className="absolute top-2 left-2 px-2 py-1 bg-purple-600 rounded-full flex items-center gap-1">
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
        </div>
    );
}