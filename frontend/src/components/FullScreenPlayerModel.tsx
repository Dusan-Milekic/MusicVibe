import MusicView from './MusicView';
import type ITrack from '../interface/Track';


const handleAddToFavorites = (currentTrack: ITrack) => {
    let existingFavorites: ITrack[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    existingFavorites.push(currentTrack);
    localStorage.setItem('favorites', JSON.stringify(existingFavorites));
}

export default function FullscreenPlayerModal({ closeVisualizer, currentTrack }: { closeVisualizer: () => void; currentTrack: ITrack | null }) {
    return (
        <div>
            {currentTrack && (
                <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center backdrop-blur-sm">
                    <button
                        onClick={closeVisualizer}
                        className="absolute top-8 right-8 z-50 text-white text-4xl hover:text-red-500 transition-all hover:scale-110"
                    >
                        ✕
                    </button>
                    <div>
                        {/* Add to favorites button */}
                        <div className="absolute top-8 left-8 z-50">
                            <button
                                onClick={() => handleAddToFavorites(currentTrack)}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition"
                            >
                                ❤️ Add to Favorites
                            </button>
                        </div>
                        <div className="w-full max-w-6xl px-8">
                            <MusicView track={currentTrack} />
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}