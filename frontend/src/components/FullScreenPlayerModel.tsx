import { useState, useEffect } from 'react';
import { X, Heart, Check } from 'lucide-react';
import MusicView from './MusicView';
import type ITrack from '../interface/Track';
import URL from '../config/api/baseURL';

interface FullscreenPlayerModalProps {
    closeVisualizer: () => void;
    currentTrack: ITrack | null;
}

export default function FullscreenPlayerModal({ closeVisualizer, currentTrack }: FullscreenPlayerModalProps) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    // Check if track is already in favorites
    useEffect(() => {
        if (!currentTrack) return;
        
        const checkIfFavorite = async () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
                setIsFavorite(false);
                return;
            }

            try {
                // Koristi jamendo_track_id ako postoji (iz library), inače id (iz Jamendo API)
                const jamendoId = currentTrack.jamendo_track_id || currentTrack.id;
                
                const response = await fetch(`${URL}/library/check/${jamendoId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    setIsFavorite(false);
                    return;
                }

                const data = await response.json();
                setIsFavorite(data.isFavorite);
            } catch (error) {
                console.error('Error checking favorite status:', error);
                setIsFavorite(false);
            }
        };

        checkIfFavorite();
    }, [currentTrack]);

    const handleAddToFavorites = async () => {
        if (!currentTrack) return;

        const token = localStorage.getItem('token');
        
        if (!token) {
            showTemporaryNotification('Please login to add favorites');
            return;
        }

        try {
            // Koristi jamendo_track_id ako postoji, inače id
            const jamendoId = currentTrack.jamendo_track_id || currentTrack.id;

            if (isFavorite) {
                // Remove from favorites - DELETE request
                const response = await fetch(`${URL}/library/${jamendoId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to remove from favorites');
                }

                setIsFavorite(false);
                showTemporaryNotification('Removed from favorites');
                
                // Ako si na Library stranici, osveži nakon 500ms
                if (window.location.pathname === '/library') {
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                }

            } else {
                // Add to favorites - POST request
                const response = await fetch(`${URL}/library`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        jamendo_track_id: jamendoId,
                        name: currentTrack.name,
                        artist_name: currentTrack.artist_name,
                        audio: currentTrack.audio,
                        image: currentTrack.image,
                        duration: currentTrack.duration
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    
                    // Ako je pesma već u biblioteci (409 Conflict)
                    if (response.status === 409) {
                        showTemporaryNotification('Already in favorites');
                        setIsFavorite(true);
                        return;
                    }
                    
                    throw new Error(errorData.message || 'Failed to add to favorites');
                }

                setIsFavorite(true);
                showTemporaryNotification('Added to favorites');
            }

        } catch (error) {
            console.error('Error managing favorites:', error);
            showTemporaryNotification('Something went wrong');
        }
    };

    const showTemporaryNotification = (message: string) => {
        setNotificationMessage(message);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
    };

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (currentTrack) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [currentTrack]);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeVisualizer();
            }
        };

        if (currentTrack) {
            window.addEventListener('keydown', handleEscape);
        }

        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, [currentTrack, closeVisualizer]);

    if (!currentTrack) return null;

    return (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
            {/* Close Button */}
            <button
                onClick={closeVisualizer}
                className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-900/80 hover:bg-red-500/20 border border-gray-800 hover:border-red-500/50 flex items-center justify-center text-gray-400 hover:text-red-400 transition-all duration-300 hover:scale-110 group"
                aria-label="Close player"
            >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Add to Favorites Button */}
            <button
                onClick={handleAddToFavorites}
                className={`absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105 ${
                    isFavorite
                        ? 'bg-gradient-to-r from-pink-600 to-red-600 text-white hover:shadow-pink-500/50'
                        : 'bg-gray-900/80 border border-gray-800 hover:border-purple-500/50 text-gray-300 hover:text-white hover:bg-purple-500/20'
                }`}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                <Heart 
                    className={`w-5 h-5 transition-all duration-300 ${isFavorite ? 'fill-white scale-110' : ''}`} 
                />
                <span className="hidden sm:inline">
                    {isFavorite ? 'Saved' : 'Save'}
                </span>
            </button>

            {/* Notification Toast */}
            {showNotification && (
                <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
                    <div className="bg-gray-900/95 backdrop-blur-sm border border-purple-500/30 rounded-xl px-6 py-3 shadow-2xl flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Check className="w-5 h-5 text-green-400" />
                        </div>
                        <span className="text-white font-medium">
                            {notificationMessage}
                        </span>
                    </div>
                </div>
            )}

            {/* Music View */}
            <div className="w-full max-w-6xl px-4 sm:px-6 md:px-8">
                <MusicView track={currentTrack} />
            </div>

            {/* Background gradient effect */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>
            </div>

            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slide-down {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -20px);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, 0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }

                .animate-slide-down {
                    animation: slide-down 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
}