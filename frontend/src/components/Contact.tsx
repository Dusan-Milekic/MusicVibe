export default function Contact() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white flex items-center justify-center px-6">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-2xl w-full">
                {/* Card */}
                <div className="relative animate-fade-in">
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-3xl blur-2xl opacity-40"></div>
                    
                    <div className="relative bg-gradient-to-br from-slate-900/90 to-blue-900/50 backdrop-blur-xl rounded-3xl p-12 border border-blue-500/30">
                        {/* Header */}
                        <div className="text-center space-y-4 mb-12">
                            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                                Contact
                            </h1>
                            <p className="text-lg text-gray-400">
                                Get in touch with the developer
                            </p>
                        </div>

                        {/* Developer Info */}
                        <div className="space-y-6">
                            {/* Name */}
                            <div className="flex items-center gap-4 bg-slate-900/60 rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300">
                                <div className="text-4xl">👨‍💻</div>
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">Developer</div>
                                    <div className="text-2xl font-bold">Dušan Milekić</div>
                                </div>
                            </div>

                            {/* Phone */}
                            <a 
                                href="tel:+381613241748"
                                className="flex items-center gap-4 bg-slate-900/60 rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/50 hover:bg-slate-900/80 transition-all duration-300 group"
                            >
                                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">📱</div>
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">Phone</div>
                                    <div className="text-xl font-bold text-blue-300">061 324 1748</div>
                                </div>
                            </a>

                            {/* Email */}
                            <a 
                                href="mailto:dusanmilekic0511@gmail.com"
                                className="flex items-center gap-4 bg-slate-900/60 rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/50 hover:bg-slate-900/80 transition-all duration-300 group"
                            >
                                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">📧</div>
                                <div>
                                    <div className="text-sm text-gray-400 mb-1">Email</div>
                                    <div className="text-xl font-bold text-blue-300 break-all">dusanmilekic0511@gmail.com</div>
                                </div>
                            </a>
                        </div>

                        {/* Footer */}
                        <div className="text-center mt-12 pt-8 border-t border-slate-700">
                            <p className="text-gray-500">
                                Feel free to reach out anytime! 🚀
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }

                .delay-1000 {
                    animation-delay: 1000ms;
                }
            `}</style>
        </div>
    );
}