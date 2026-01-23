// Feature Card Component
interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    gradient: string;
    borderColor: string;
}

function FeatureCard({ icon, title, description, gradient, borderColor }: FeatureCardProps) {
    return (
        <div className={`group relative bg-gradient-to-br ${gradient} backdrop-blur-sm rounded-xl p-6 border ${borderColor} hover:border-opacity-60 transition-all duration-300 hover:scale-105`}>
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-purple-600/50 to-pink-600/50 mb-4 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            
            {/* Content */}
            <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm">{description}</p>
        </div>
    );
}

export default FeatureCard;


