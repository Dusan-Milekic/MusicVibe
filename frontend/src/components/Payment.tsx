import { Check, X, Sparkles, Heart, Globe, Rocket, ArrowRight, Shield } from 'lucide-react';

export default function Payment() {
    const features = [
        { icon: <Check className="w-5 h-5" />, text: 'Unlimited song plays' },
        { icon: <Check className="w-5 h-5" />, text: 'Hi-Fi audio quality' },
        { icon: <Check className="w-5 h-5" />, text: 'AI-powered playlists' },
        { icon: <Check className="w-5 h-5" />, text: 'No ads, ever' },
        { icon: <Check className="w-5 h-5" />, text: 'Offline downloads' },
        { icon: <Check className="w-5 h-5" />, text: 'Unlimited skips' },
        { icon: <Check className="w-5 h-5" />, text: 'All devices supported' },
        { icon: <Check className="w-5 h-5" />, text: 'Social features included' },
    ];

    const whyFreeReasons = [
        {
            icon: <Heart className="w-8 h-8" />,
            title: 'We Love Music',
            description: 'Music should be accessible to everyone, everywhere, anytime.',
            color: 'from-purple-600/20 to-pink-600/20',
            border: 'border-purple-500/30'
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: 'Our Mission',
            description: 'To break down barriers and connect the world through sound.',
            color: 'from-pink-600/20 to-purple-600/20',
            border: 'border-pink-500/30'
        },
        {
            icon: <Rocket className="w-8 h-8" />,
            title: 'Community First',
            description: 'Built by music lovers, for music lovers. No corporate greed.',
            color: 'from-blue-600/20 to-purple-600/20',
            border: 'border-blue-500/30'
        },
    ];

    const comparisonData = [
        { feature: 'Monthly Cost', musicvibe: '$0', others: '$9.99+', highlight: true },
        { feature: 'Ad-Free Experience', musicvibe: true, others: false },
        { feature: 'Offline Mode', musicvibe: true, others: 'Premium only' },
        { feature: 'Hi-Fi Audio Quality', musicvibe: true, others: 'Extra $10/mo' },
        { feature: 'Unlimited Skips', musicvibe: true, others: '6 per hour' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/50 to-gray-950 text-white">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
                
                {/* Header Section */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-400/50 rounded-full text-green-300 font-semibold text-sm">
                        <Sparkles className="w-4 h-4" />
                        <span>100% FREE FOREVER</span>
                    </div>
                    
                    <div className="space-y-4">
                        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight">
                            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
                                $0
                            </span>
                        </h1>
                        <p className="text-2xl sm:text-3xl md:text-4xl font-light text-purple-200/90">
                            Yeah, you read that right. <span className="font-bold text-white">ZERO</span> dollars.
                        </p>
                    </div>
                    
                    <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
                        No credit card. No tricks. No premium tiers. Just pure music, forever free.
                    </p>
                </div>

                {/* Main Features Card */}
                <div className="max-w-5xl mx-auto">
                    <div className="bg-gradient-to-br from-gray-900/80 to-green-900/30 backdrop-blur-xl rounded-2xl p-6 sm:p-10 md:p-12 border border-green-500/30 shadow-2xl">
                        <div className="text-center space-y-8">
                            {/* Card Header */}
                            <div className="space-y-3">
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                                    <span className="bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                                        Everything. Unlimited. Free.
                                    </span>
                                </h2>
                                <p className="text-lg text-gray-300">
                                    Register once and enjoy unlimited access to all features
                                </p>
                            </div>

                            {/* Features Grid */}
                            <div className="grid sm:grid-cols-2 gap-4 pt-6">
                                {features.map((feature, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center gap-3 bg-gray-900/60 rounded-xl p-4 border border-green-500/20 hover:border-green-500/40 hover:bg-gray-900/80 transition-all duration-300"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 flex-shrink-0">
                                            {feature.icon}
                                        </div>
                                        <span className="text-base font-medium text-white">{feature.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <div className="pt-6 space-y-4">
                                <button className="group relative px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-bold text-lg sm:text-xl hover:scale-105 hover:shadow-xl hover:shadow-green-500/50 transition-all duration-300 flex items-center gap-3 mx-auto">
                                    <span>Start Listening Free</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                                <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <Shield className="w-4 h-4" />
                                        <span>No credit card required</span>
                                    </div>
                                    <span>•</span>
                                    <span>Sign up in 30 seconds</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Why Free Section */}
                <div className="max-w-6xl mx-auto text-center space-y-10">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Why Is It Free?
                        </span>
                    </h2>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {whyFreeReasons.map((reason, index) => (
                            <div 
                                key={index}
                                className={`bg-gradient-to-br ${reason.color} backdrop-blur-sm rounded-xl p-6 sm:p-8 border ${reason.border} hover:scale-105 transition-all duration-300`}
                            >
                                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-600/50 to-pink-600/50 flex items-center justify-center mx-auto mb-4">
                                    {reason.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">{reason.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{reason.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Comparison Table */}
                <div className="max-w-5xl mx-auto space-y-8">
                    <h3 className="text-3xl sm:text-4xl font-bold text-center">
                        <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                            Compare With Others
                        </span>
                    </h3>
                    
                    <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-green-500/20 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-green-900/30 border-b border-green-500/20">
                                    <tr>
                                        <th className="px-4 sm:px-6 py-4 text-left font-bold text-base sm:text-lg text-white">Feature</th>
                                        <th className="px-4 sm:px-6 py-4 text-center font-bold text-base sm:text-lg text-green-400">MusicVibe</th>
                                        <th className="px-4 sm:px-6 py-4 text-center font-bold text-base sm:text-lg text-gray-500">Others</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {comparisonData.map((row, index) => (
                                        <tr key={index} className="hover:bg-gray-800/50 transition-colors">
                                            <td className="px-4 sm:px-6 py-4 font-medium text-sm sm:text-base">{row.feature}</td>
                                            <td className="px-4 sm:px-6 py-4 text-center">
                                                {row.highlight ? (
                                                    <span className="text-green-400 font-bold text-base sm:text-lg">{row.musicvibe}</span>
                                                ) : row.musicvibe === true ? (
                                                    <Check className="w-6 h-6 text-green-400 mx-auto" />
                                                ) : (
                                                    <span className="text-green-400 font-semibold">{row.musicvibe}</span>
                                                )}
                                            </td>
                                            <td className="px-4 sm:px-6 py-4 text-center">
                                                {row.others === false ? (
                                                    <X className="w-6 h-6 text-red-400 mx-auto" />
                                                ) : (
                                                    <span className="text-gray-500 text-sm sm:text-base">{row.others}</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="text-center space-y-8 py-12">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black">
                        <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-green-400 bg-clip-text text-transparent">
                            What Are You Waiting For?
                        </span>
                    </h2>
                    <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto">
                        Join millions of happy listeners. Zero cost. Infinite music.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                        <button className="px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full font-bold text-lg sm:text-xl hover:scale-110 hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 flex items-center gap-2">
                            <span>Create Free Account</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="px-8 sm:px-10 py-4 sm:py-5 border-2 border-green-400/50 rounded-full font-bold text-lg sm:text-xl hover:bg-green-500/10 hover:border-green-400 transition-all duration-300">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}