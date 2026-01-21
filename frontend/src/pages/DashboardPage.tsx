import { useState, useEffect } from 'react';
import MusicView from '../components/MusicView';
import { cliendID } from '../config/api/jamendo';
import Navigation from '../components/Navigation';

const CLIENT_ID = cliendID;
const BASE_URL = 'https://api.jamendo.com/v3.0';

interface Track {
    id: string;
    name: string;
    artist_name: string;
    audio: string;
    image: string;
    duration: number;
}

export default function DashboardPage() {
    const [popularTracks, setPopularTracks] = useState<Track[]>([]);
    const [newReleases, setNewReleases] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

    const loadPopularTracks = async () => {
        const url = `${BASE_URL}/tracks/?client_id=${CLIENT_ID}&format=json&limit=20&order=popularity_total`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            setPopularTracks(data.results || []);
        } catch (error) {
            console.error('Error loading popular tracks:', error);
        }
    };

    const loadNewReleases = async () => {
        const url = `${BASE_URL}/tracks/?client_id=${CLIENT_ID}&format=json&limit=20&order=releasedate_desc`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            setNewReleases(data.results || []);
        } catch (error) {
            console.error('Error loading new releases:', error);
        }
    };

    useEffect(() => {
        const loadAllData = async () => {
            setLoading(true);
            await Promise.all([
                loadPopularTracks(),
                loadNewReleases()
            ]);
            setLoading(false);
        };
        
        loadAllData();
    }, []);

    const playTrack = (track: Track) => {
        console.log('Playing track:', track.name);
        setCurrentTrack(track);
    };

    const closeVisualizer = () => {
        console.log('Closing visualizer');
        setCurrentTrack(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p className="text-2xl">Loading music...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Sidebar Navigation */}
            <Navigation/>
                
            {/* Main Content */}
            <div className="ml-64 p-8">
                {/* VISUALIZER - Fullscreen Modal */}
                {currentTrack && (
                    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center backdrop-blur-sm">
                        <button 
                            onClick={closeVisualizer}
                            className="absolute top-8 right-8 z-50 text-white text-4xl hover:text-red-500 transition-all hover:scale-110"
                            aria-label="Close player"
                        >
                            ✕
                        </button>
                        <div className="w-full max-w-6xl px-8">
                            <MusicView track={currentTrack} />
                        </div>
                    </div>
                )}

                {/* Popular Tracks Section */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <span>🔥</span>
                        <span>Popular Right Now</span>
                        <span className="text-sm text-gray-400 font-normal">
                            ({popularTracks.length} tracks)
                        </span>
                    </h2>
                    
                    {popularTracks.length === 0 ? (
                        <p className="text-gray-400 text-center py-12">No tracks available</p>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {popularTracks.map((track) => (
                                <div 
                                    key={track.id} 
                                    className={`bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-all cursor-pointer group relative ${
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
                                        {/* Play overlay on hover */}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded">
                                            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-xl">
                                                <span className="text-2xl">▶️</span>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="font-semibold truncate text-white">{track.name}</h3>
                                    <p className="text-sm text-gray-400 truncate">{track.artist_name}</p>
                                    
                                    {/* Playing indicator */}
                                    {currentTrack?.id === track.id && (
                                        <div className="mt-2 flex items-center gap-2">
                                            <div className="flex gap-1">
                                                <div className="w-1 h-4 bg-green-500 animate-pulse"></div>
                                                <div className="w-1 h-4 bg-green-500 animate-pulse" style={{animationDelay: '0.15s'}}></div>
                                                <div className="w-1 h-4 bg-green-500 animate-pulse" style={{animationDelay: '0.3s'}}></div>
                                            </div>
                                            <span className="text-green-500 text-xs font-semibold">Now Playing</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* New Releases Section */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                        <span>🆕</span>
                        <span>New Releases</span>
                        <span className="text-sm text-gray-400 font-normal">
                            ({newReleases.length} tracks)
                        </span>
                    </h2>
                    
                    {newReleases.length === 0 ? (
                        <p className="text-gray-400 text-center py-12">No tracks available</p>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {newReleases.map((track) => (
                                <div 
                                    key={track.id} 
                                    className={`bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-all cursor-pointer group relative ${
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
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded">
                                            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-xl">
                                                <span className="text-2xl">▶️</span>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="font-semibold truncate text-white">{track.name}</h3>
                                    <p className="text-sm text-gray-400 truncate">{track.artist_name}</p>
                                    
                                    {currentTrack?.id === track.id && (
                                        <div className="mt-2 flex items-center gap-2">
                                            <div className="flex gap-1">
                                                <div className="w-1 h-4 bg-green-500 animate-pulse"></div>
                                                <div className="w-1 h-4 bg-green-500 animate-pulse" style={{animationDelay: '0.15s'}}></div>
                                                <div className="w-1 h-4 bg-green-500 animate-pulse" style={{animationDelay: '0.3s'}}></div>
                                            </div>
                                            <span className="text-green-500 text-xs font-semibold">Now Playing</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}