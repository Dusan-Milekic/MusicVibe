import { useState, useEffect } from 'react';
import MusicView from '../components/MusicView';
import Navigation from '../components/Navigation';

interface Track {
    id: string;
    name: string;
    artist_name: string;
    audio: string;
    image: string;
    duration: number;
}

interface Playlist {
    id: string;
    name: string;
    description: string;
    tracks: Track[];
    createdAt: string;
}

export default function Library() {
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [favorites, setFavorites] = useState<Track[]>([]);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [activeTab, setActiveTab] = useState<'favorites' | 'playlists'>('favorites');
    const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [newPlaylistDescription, setNewPlaylistDescription] = useState('');

    // Load favorites from localStorage
    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }

        const savedPlaylists = localStorage.getItem('playlists');
        if (savedPlaylists) {
            setPlaylists(JSON.parse(savedPlaylists));
        }
    }, []);

    const playTrack = (track: Track) => {
        console.log('Playing:', track.name);
        setCurrentTrack(track);
    };

    const closeVisualizer = () => {
        setCurrentTrack(null);
    };

    const removeFromFavorites = (trackId: string) => {
        const updated = favorites.filter(t => t.id !== trackId);
        setFavorites(updated);
        localStorage.setItem('favorites', JSON.stringify(updated));
    };

    const createPlaylist = () => {
        if (!newPlaylistName.trim()) return;

        const newPlaylist: Playlist = {
            id: Date.now().toString(),
            name: newPlaylistName,
            description: newPlaylistDescription,
            tracks: [],
            createdAt: new Date().toISOString(),
        };

        const updated = [...playlists, newPlaylist];
        setPlaylists(updated);
        localStorage.setItem('playlists', JSON.stringify(updated));

        // Reset form
        setNewPlaylistName('');
        setNewPlaylistDescription('');
        setShowCreatePlaylist(false);
    };

    const deletePlaylist = (playlistId: string) => {
        if (!confirm('Are you sure you want to delete this playlist?')) return;

        const updated = playlists.filter(p => p.id !== playlistId);
        setPlaylists(updated);
        localStorage.setItem('playlists', JSON.stringify(updated));
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navigation />

            {/* Main Content */}
            <div className="ml-64 p-8">
                {/* Fullscreen Player Modal */}
                {currentTrack && (
                    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center backdrop-blur-sm">
                        <button 
                            onClick={closeVisualizer}
                            className="absolute top-8 right-8 z-50 text-white text-4xl hover:text-red-500 transition-all hover:scale-110"
                        >
                            ✕
                        </button>
                        <div className="w-full max-w-6xl px-8">
                            <MusicView track={currentTrack} />
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">📚 Your Library</h1>
                    <p className="text-gray-400">Your favorite songs and playlists</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-gray-800">
                    <button
                        onClick={() => setActiveTab('favorites')}
                        className={`pb-4 px-2 font-semibold transition ${
                            activeTab === 'favorites'
                                ? 'text-green-500 border-b-2 border-green-500'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        ❤️ Favorites ({favorites.length})
                    </button>
                    
                </div>

                {/* Favorites Tab */}
                {activeTab === 'favorites' && (
                    <div>
                        {favorites.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="text-8xl mb-6">❤️</div>
                                <h2 className="text-3xl font-bold mb-3">No favorites yet</h2>
                                <p className="text-gray-400 text-lg mb-6">
                                    Start adding songs to your favorites
                                </p>
                                <button 
                                    onClick={() => window.location.href = '/search'}
                                    className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-full font-semibold transition"
                                >
                                    Browse Music
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {favorites.map((track) => (
                                    <div
                                        key={track.id}
                                        className={`bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-all group relative ${
                                            currentTrack?.id === track.id ? 'ring-2 ring-green-500 bg-gray-700' : ''
                                        }`}
                                    >
                                        {/* Remove Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeFromFavorites(track.id);
                                            }}
                                            className="absolute top-2 right-2 z-10 w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                                        >
                                            ✕
                                        </button>

                                        <div 
                                            className="cursor-pointer"
                                            onClick={() => playTrack(track)}
                                        >
                                            <div className="relative mb-3">
                                                <img
                                                    src={track.image}
                                                    alt={track.name}
                                                    className="w-full aspect-square object-cover rounded"
                                                />
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
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}