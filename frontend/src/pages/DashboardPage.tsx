import { useState, useEffect } from 'react';
import { TrendingUp, Clock, Play, Loader2 } from 'lucide-react';
import FullscreenPlayerModal from '../components/FullScreenPlayerModel';
import Navigation from '../components/Navigation';
import { cliendID } from '../config/api/jamendo';
import type ITrack from '../interface/Track';

const CLIENT_ID = cliendID;
const BASE_URL = 'https://api.jamendo.com/v3.0';

export default function DashboardPage() {
    const [popularTracks, setPopularTracks] = useState<ITrack[]>([]);
    const [newReleases, setNewReleases] = useState<ITrack[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentTrack, setCurrentTrack] = useState<ITrack | null>(null);

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

    const playTrack = (track: ITrack) => {
        console.log('Playing track:', track.name);
        setCurrentTrack(track);
    };

    const closeVisualizer = () => {
        console.log('Closing visualizer');
        setCurrentTrack(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/50 to-gray-950 text-white flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Loader2 className="w-16 h-16 text-purple-500 animate-spin mx-auto" />
                    <p className="text-xl text-gray-300">Loading your music...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/50 to-gray-950 text-white">
            {/* Sidebar Navigation */}
            <Navigation />
                
            {/* Main Content */}
            <div className="lg:ml-64 p-4 sm:p-6 lg:p-8 pb-32">
                {/* Fullscreen Player Modal */}
                <FullscreenPlayerModal closeVisualizer={closeVisualizer} currentTrack={currentTrack} />
                
                {/* Welcome Header */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Welcome Back
                    </h1>
                    <p className="text-gray-400">Discover your next favorite track</p>
                </div>

                {/* Popular Tracks Section */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Popular Right Now</h2>
                            <p className="text-sm text-gray-400">{popularTracks.length} trending tracks</p>
                        </div>
                    </div>
                    
                    {popularTracks.length === 0 ? (
                        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-12 text-center">
                            <p className="text-gray-400">No tracks available</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {popularTracks.map((track) => (
                                <TrackCard 
                                    key={track.id}
                                    track={track}
                                    isPlaying={currentTrack?.id === track.id}
                                    onPlay={() => playTrack(track)}
                                />
                            ))}
                        </div>
                    )}
                </section>

                {/* New Releases Section */}
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">New Releases</h2>
                            <p className="text-sm text-gray-400">{newReleases.length} fresh tracks</p>
                        </div>
                    </div>
                    
                    {newReleases.length === 0 ? (
                        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-12 text-center">
                            <p className="text-gray-400">No tracks available</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {newReleases.map((track) => (
                                <TrackCard 
                                    key={track.id}
                                    track={track}
                                    isPlaying={currentTrack?.id === track.id}
                                    onPlay={() => playTrack(track)}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

// Track Card Component
interface TrackCardProps {
    track: ITrack;
    isPlaying: boolean;
    onPlay: () => void;
}

function TrackCard({ track, isPlaying, onPlay }: TrackCardProps) {
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