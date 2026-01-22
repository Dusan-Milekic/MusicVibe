import { Music, Headphones, Users, Sparkles, TrendingUp, Globe, Play } from 'lucide-react';

export default function About() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/50 to-gray-950 text-white">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
                {/* Simplified Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
                    {/* Logo/Icon */}
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 mb-4">
                        <Music className="w-10 h-10 text-white" />
                    </div>

                    {/* Heading */}
                    <div className="space-y-4">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                                MusicVibe
                            </span>
                        </h1>
                        <p className="text-xl sm:text-2xl md:text-3xl text-purple-200/80 font-light">
                            Your Music, Your Vibe
                        </p>
                    </div>

                    {/* Description */}
                    <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Discover millions of songs, create playlists, and enjoy high-quality streaming 
                        with an intuitive interface designed for music lovers.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                        <button className="group relative px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-base hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2">
                            <Play className="w-5 h-5" />
                            Start Listening
                        </button>
                        <button className="px-8 py-3.5 border border-purple-400/30 rounded-lg font-semibold text-base hover:bg-purple-500/10 hover:border-purple-400/60 transition-all duration-300">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-purple-400/40 rounded-full flex items-start justify-center p-2">
                        <div className="w-1 h-2 bg-purple-400 rounded-full"></div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Why Choose MusicVibe?
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Everything you need for the perfect music streaming experience
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Feature Card 1 */}
                        <FeatureCard
                            icon={<Sparkles className="w-8 h-8" />}
                            title="Smart Recommendations"
                            description="Discover new music tailored to your taste with intelligent algorithms."
                            gradient="from-purple-600/20 to-pink-600/20"
                            borderColor="border-purple-500/30"
                        />

                        {/* Feature Card 2 */}
                        <FeatureCard
                            icon={<Headphones className="w-8 h-8" />}
                            title="High-Quality Audio"
                            description="Stream in crystal-clear quality for an immersive listening experience."
                            gradient="from-pink-600/20 to-purple-600/20"
                            borderColor="border-pink-500/30"
                        />

                        {/* Feature Card 3 */}
                        <FeatureCard
                            icon={<Users className="w-8 h-8" />}
                            title="Share & Connect"
                            description="Create and share playlists with friends and discover together."
                            gradient="from-blue-600/20 to-purple-600/20"
                            borderColor="border-blue-500/30"
                        />

                        {/* Feature Card 4 */}
                        <FeatureCard
                            icon={<Music className="w-8 h-8" />}
                            title="Unlimited Library"
                            description="Access millions of songs across all genres and decades."
                            gradient="from-purple-600/20 to-blue-600/20"
                            borderColor="border-purple-500/30"
                        />

                        {/* Feature Card 5 */}
                        <FeatureCard
                            icon={<TrendingUp className="w-8 h-8" />}
                            title="Trending Charts"
                            description="Stay updated with the latest hits and trending tracks worldwide."
                            gradient="from-pink-600/20 to-purple-600/20"
                            borderColor="border-pink-500/30"
                        />

                        {/* Feature Card 6 */}
                        <FeatureCard
                            icon={<Globe className="w-8 h-8" />}
                            title="Offline Mode"
                            description="Download your favorite songs and listen anywhere, anytime."
                            gradient="from-blue-600/20 to-pink-600/20"
                            borderColor="border-blue-500/30"
                        />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-8 sm:p-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <StatCard number="50M+" label="Active Users" />
                            <StatCard number="100M+" label="Songs" />
                            <StatCard number="24/7" label="Streaming" />
                            <StatCard number="190+" label="Countries" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-300">
                        Join millions of music lovers worldwide. Start streaming today.
                    </p>
                    <div className="pt-4">
                        <button className="group px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-lg hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto">
                            Get Started Free
                            <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

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

// Stat Card Component
interface StatCardProps {
    number: string;
    label: string;
}

function StatCard({ number, label }: StatCardProps) {
    return (
        <div className="text-center space-y-2">
            <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {number}
            </div>
            <div className="text-gray-400 font-medium text-sm sm:text-base">{label}</div>
        </div>
    );
}