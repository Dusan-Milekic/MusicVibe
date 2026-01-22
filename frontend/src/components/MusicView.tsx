import { useEffect, useRef, useState } from 'react';
import type ITrack from '../interface/Track';

interface MusicViewProps {
    track: ITrack;
}

export default function MusicView({ track }: MusicViewProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1.0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // Load and play track
    useEffect(() => {
        if (!audioRef.current) return;

        const audio = audioRef.current;
        audio.volume = volume;
        audio.src = track.audio;
        audio.load();

        audio.play()
            .then(() => {
                console.log('✅ Playing:', track.name);
                setIsPlaying(true);
            })
            .catch((err) => {
                console.error('❌ Play error:', err);
            });
    }, [track.audio]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(err => console.error(err));
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-gradient-to-b from-gray-900 to-black rounded-2xl p-8 shadow-2xl">
            {/* Album Art */}
            <div className="flex justify-center mb-8">
                <img 
                    src={track.image}
                    alt={track.name}
                    className="w-80 h-80 rounded-2xl shadow-2xl object-cover"
                />
            </div>

            {/* Track Info */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-2 text-white">
                    {track.name}
                </h1>
                <h2 className="text-2xl text-gray-400">{track.artist_name}</h2>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
                <input 
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-8 mb-6">
                <button 
                    className="text-4xl text-gray-500 hover:text-white transition disabled:opacity-30"
                    disabled
                >
                    ⏮️
                </button>
                
                <button 
                    onClick={togglePlay}
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-4xl hover:bg-green-600 hover:scale-110 transition-all shadow-2xl active:scale-95"
                >
                    {isPlaying ? '⏸️' : '▶️'}
                </button>
                
                <button 
                    className="text-4xl text-gray-500 hover:text-white transition disabled:opacity-30"
                    disabled
                >
                    ⏭️
                </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center justify-center gap-4">
                <span className="text-xl">🔊</span>
                <input 
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-40 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <span className="text-sm text-gray-400 w-12">
                    {Math.round(volume * 100)}%
                </span>
            </div>

            {/* Status */}
            <div className="text-center mt-6">
                <div className="inline-flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full">
                    <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
                    <span className="text-sm">{isPlaying ? 'Playing' : 'Paused'}</span>
                </div>
            </div>

            {/* Audio Element */}
            <audio 
                ref={audioRef}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                onEnded={() => setIsPlaying(false)}
            />
        </div>
    );
}