import { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Volume1 } from 'lucide-react';
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
    const [isMuted, setIsMuted] = useState(false);

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

        return () => {
            audio.pause();
        };
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
        setIsMuted(newVolume === 0);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const toggleMute = () => {
        if (!audioRef.current) return;
        
        if (isMuted) {
            audioRef.current.volume = volume || 0.5;
            setIsMuted(false);
        } else {
            audioRef.current.volume = 0;
            setIsMuted(true);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };

    const skipForward = () => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
    };

    const skipBackward = () => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
    };

    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getVolumeIcon = () => {
        if (isMuted || volume === 0) return <VolumeX className="w-5 h-5" />;
        if (volume < 0.5) return <Volume1 className="w-5 h-5" />;
        return <Volume2 className="w-5 h-5" />;
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="w-full max-w-2xl mx-auto bg-gradient-to-b from-gray-900/95 to-purple-900/50 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl border border-purple-500/20">
            {/* Album Art */}
            <div className="flex justify-center mb-6 sm:mb-8">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition duration-300"></div>
                    <img 
                        src={track.image}
                        alt={track.name}
                        className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl shadow-2xl object-cover"
                    />
                </div>
            </div>

            {/* Track Info */}
            <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white truncate px-4">
                    {track.name}
                </h1>
                <h2 className="text-lg sm:text-xl md:text-2xl text-gray-400 truncate px-4">
                    {track.artist_name}
                </h2>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
                <div className="relative">
                    {/* Background track */}
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        {/* Progress fill */}
                        <div 
                            className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-100"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    {/* Invisible range input overlay */}
                    <input 
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
                    />
                </div>
                <div className="flex justify-between text-xs sm:text-sm text-gray-400 mt-2 px-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 sm:gap-8 mb-6">
                <button 
                    onClick={skipBackward}
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                    aria-label="Skip backward 10 seconds"
                >
                    <SkipBack className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>
                
                <button 
                    onClick={togglePlay}
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 transition-all shadow-xl active:scale-95"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                    {isPlaying ? (
                        <Pause className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white" />
                    ) : (
                        <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white ml-1" />
                    )}
                </button>
                
                <button 
                    onClick={skipForward}
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                    aria-label="Skip forward 10 seconds"
                >
                    <SkipForward className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center justify-center gap-3 sm:gap-4">
                <button
                    onClick={toggleMute}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                    {getVolumeIcon()}
                </button>
                
                <div className="relative w-32 sm:w-40 h-2">
                    {/* Background track */}
                    <div className="absolute inset-0 bg-gray-800 rounded-full overflow-hidden">
                        {/* Volume fill */}
                        <div 
                            className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-100"
                            style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                        />
                    </div>
                    {/* Invisible range input overlay */}
                    <input 
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
                    />
                </div>
                
                <span className="text-xs sm:text-sm text-gray-400 w-10 sm:w-12 text-right">
                    {Math.round((isMuted ? 0 : volume) * 100)}%
                </span>
            </div>

            {/* Status */}
            <div className="text-center mt-6">
                <div className="inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-500/20">
                    <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
                    <span className="text-xs sm:text-sm font-medium">
                        {isPlaying ? 'Now Playing' : 'Paused'}
                    </span>
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