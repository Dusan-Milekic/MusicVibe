import { Play } from "lucide-react";
// Trending Card Component
interface TrendingCardProps {
    icon: string;
    title: string;
    plays: string;
    color: string;
}

function TrendingCard({ icon, title, plays, color }: TrendingCardProps) {
    return (
        <div className={`group relative bg-gradient-to-br ${color} backdrop-blur-sm rounded-xl p-5 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 cursor-pointer hover:scale-105`}>
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                </div>
            </div>
            
            {/* Content */}
            <div className="relative">
                <div className="text-4xl mb-3">{icon}</div>
                <h4 className="font-semibold text-white mb-1">{title}</h4>
                <p className="text-sm text-purple-300">{plays} plays</p>
            </div>
        </div>
    );
}
export default TrendingCard;