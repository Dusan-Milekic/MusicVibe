export default function Payment() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white px-6 py-20">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-96 h-96 bg-green-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto space-y-16">
                {/* Header */}
                <div className="text-center space-y-6 animate-fade-in">
                    <div className="inline-block px-6 py-2 bg-green-500/20 border border-green-400/50 rounded-full text-green-300 font-bold text-sm mb-4">
                        💚 100% FREE FOREVER
                    </div>
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter">
                        <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
                            $0
                        </span>
                    </h1>
                    <p className="text-3xl md:text-4xl font-light text-purple-200/90">
                        Yeah, you read that right. ZERO dollars.
                    </p>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        No credit card. No tricks. No premium tiers. Just pure music, forever free.
                    </p>
                </div>

                {/* Main Card */}
                <div className="max-w-4xl mx-auto animate-fade-in-delay">
                    <div className="relative">
                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 rounded-3xl blur-2xl opacity-40"></div>
                        
                        <div className="relative bg-gradient-to-br from-slate-900/90 to-green-900/30 backdrop-blur-xl rounded-3xl p-12 border border-green-500/30">
                            <div className="text-center space-y-8">
                                <div className="space-y-4">
                                    <h2 className="text-4xl md:text-5xl font-bold">
                                        <span className="bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                                            Everything. Unlimited. Free.
                                        </span>
                                    </h2>
                                    <p className="text-lg text-gray-300">
                                        Register once and enjoy unlimited access to all features
                                    </p>
                                </div>

                                {/* Features List */}
                                <div className="grid md:grid-cols-2 gap-6 text-left pt-8">
                                    {[
                                        { icon: '✅', text: 'Unlimited song plays' },
                                        { icon: '✅', text: 'Hi-Fi audio quality' },
                                        { icon: '✅', text: 'AI-powered playlists' },
                                        { icon: '✅', text: 'No ads, ever' },
                                        { icon: '✅', text: 'Offline downloads' },
                                        { icon: '✅', text: 'Unlimited skips' },
                                        { icon: '✅', text: 'All devices supported' },
                                        { icon: '✅', text: 'Social features included' },
                                    ].map((feature, index) => (
                                        <div 
                                            key={index}
                                            className="flex items-center gap-4 bg-slate-900/50 rounded-xl p-4 border border-green-500/20 hover:border-green-500/50 hover:bg-slate-900/70 transition-all duration-300"
                                        >
                                            <span className="text-3xl">{feature.icon}</span>
                                            <span className="text-lg font-medium">{feature.text}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <div className="pt-8">
                                    <button className="group relative px-12 py-6 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <span className="relative flex items-center gap-3">
                                            <span>Start Listening Free</span>
                                            <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                                        </span>
                                    </button>
                                    <p className="text-sm text-gray-500 mt-4">
                                        No credit card required • Sign up in 30 seconds
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Why Free Section */}
                <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-delay-2">
                    <h2 className="text-4xl md:text-5xl font-bold">
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Why Is It Free?
                        </span>
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
                            <div className="text-5xl mb-4">💜</div>
                            <h3 className="text-xl font-bold mb-3 text-purple-200">We Love Music</h3>
                            <p className="text-gray-400">
                                Music should be accessible to everyone, everywhere, anytime.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-pink-900/40 to-slate-900/40 backdrop-blur-sm rounded-2xl p-8 border border-pink-500/20">
                            <div className="text-5xl mb-4">🌍</div>
                            <h3 className="text-xl font-bold mb-3 text-pink-200">Our Mission</h3>
                            <p className="text-gray-400">
                                To break down barriers and connect the world through sound.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
                            <div className="text-5xl mb-4">🚀</div>
                            <h3 className="text-xl font-bold mb-3 text-blue-200">Community First</h3>
                            <p className="text-gray-400">
                                Built by music lovers, for music lovers. No corporate greed.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Comparison Table */}
                <div className="max-w-5xl mx-auto animate-fade-in-delay-3">
                    <h3 className="text-3xl font-bold text-center mb-8">
                        <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                            Compare With Others
                        </span>
                    </h3>
                    <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-green-500/20 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-green-900/30 border-b border-green-500/20">
                                <tr>
                                    <th className="px-6 py-4 text-left font-bold text-lg">Feature</th>
                                    <th className="px-6 py-4 text-center font-bold text-lg text-green-400">MusicVibe</th>
                                    <th className="px-6 py-4 text-center font-bold text-lg text-gray-500">Others</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {[
                                    { feature: 'Monthly Cost', us: '$0', them: '$9.99+' },
                                    { feature: 'Ad-Free', us: '✅', them: '❌ (Free tier)' },
                                    { feature: 'Offline Mode', us: '✅', them: '💰 Premium only' },
                                    { feature: 'Hi-Fi Audio', us: '✅', them: '💰 Extra $10/mo' },
                                    { feature: 'Unlimited Skips', us: '✅', them: '❌ (6/hour)' },
                                ].map((row, index) => (
                                    <tr key={index} className="hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 font-medium">{row.feature}</td>
                                        <td className="px-6 py-4 text-center text-green-400 font-bold">{row.us}</td>
                                        <td className="px-6 py-4 text-center text-gray-500">{row.them}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="text-center space-y-6 py-12 animate-fade-in-delay-4">
                    <h2 className="text-5xl md:text-6xl font-black">
                        <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-green-400 bg-clip-text text-transparent">
                            What Are You Waiting For?
                        </span>
                    </h2>
                    <p className="text-2xl text-gray-300 max-w-2xl mx-auto">
                        Join millions of happy listeners. Zero cost. Infinite music.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                        <button className="px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full font-bold text-xl hover:scale-110 hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300">
                            Create Free Account
                        </button>
                        <button className="px-10 py-5 border-2 border-green-400/50 rounded-full font-bold text-xl hover:bg-green-500/10 hover:border-green-400 transition-all duration-300">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }

                .animate-fade-in-delay {
                    opacity: 0;
                    animation: fade-in 0.8s ease-out 0.3s forwards;
                }

                .animate-fade-in-delay-2 {
                    opacity: 0;
                    animation: fade-in 0.8s ease-out 0.6s forwards;
                }

                .animate-fade-in-delay-3 {
                    opacity: 0;
                    animation: fade-in 0.8s ease-out 0.9s forwards;
                }

                .animate-fade-in-delay-4 {
                    opacity: 0;
                    animation: fade-in 0.8s ease-out 1.2s forwards;
                }

                .delay-1000 {
                    animation-delay: 1000ms;
                }
            `}</style>
        </div>
    );
}