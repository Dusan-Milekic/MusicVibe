import { User, Phone, Mail, Send, Github, Linkedin, MapPin } from 'lucide-react';

export default function Contact() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/50 to-gray-950 text-white flex items-center justify-center px-4 sm:px-6 py-12">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-3xl w-full">
                <div className="bg-gradient-to-br from-gray-900/80 to-purple-900/30 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden">
                    
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 px-6 sm:px-12 py-8 sm:py-12 text-center border-b border-purple-500/20">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 mb-6">
                            <Mail className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                                Get In Touch
                            </span>
                        </h1>
                        <p className="text-lg text-gray-300">
                            Let's connect and discuss your project
                        </p>
                    </div>

                    {/* Content Section */}
                    <div className="px-6 sm:px-12 py-8 sm:py-12">
                        {/* Developer Profile Card */}
                        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-6 mb-8 border border-purple-500/30">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                                    <User className="w-10 h-10 text-white" />
                                </div>
                                <div className="text-center sm:text-left flex-1">
                                    <h2 className="text-2xl sm:text-3xl font-bold mb-2">Dušan Milekić</h2>
                                    <p className="text-purple-300 mb-3">Full-Stack Developer</p>
                                    <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-400">
                                        <MapPin className="w-4 h-4" />
                                        <span>Serbia</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Methods */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-300 mb-4">Contact Information</h3>
                            
                            {/* Phone */}
                            <ContactCard
                                href="tel:+381613241748"
                                icon={<Phone className="w-6 h-6" />}
                                label="Phone"
                                value="+381 61 324 1748"
                                color="blue"
                            />

                            {/* Email */}
                            <ContactCard
                                href="mailto:dusanmilekic0511@gmail.com"
                                icon={<Mail className="w-6 h-6" />}
                                label="Email"
                                value="dusanmilekic0511@gmail.com"
                                color="purple"
                            />
                        </div>

                        {/* Social Links */}
                        <div className="mt-8 pt-8 border-t border-gray-800">
                            <h3 className="text-lg font-semibold text-gray-300 mb-4">Connect on Social</h3>
                            <div className="flex flex-wrap gap-3">
                                <SocialButton
                                    href="#"
                                    icon={<Github className="w-5 h-5" />}
                                    label="GitHub"
                                />
                                <SocialButton
                                    href="#"
                                    icon={<Linkedin className="w-5 h-5" />}
                                    label="LinkedIn"
                                />
                                <SocialButton
                                    href="#"
                                    icon={<Send className="w-5 h-5" />}
                                    label="Telegram"
                                />
                            </div>
                        </div>

                        {/* Footer Message */}
                        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                            <p className="text-gray-400">
                                Available for freelance projects and collaborations
                            </p>
                            <div className="flex items-center justify-center gap-2 mt-3 text-sm">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-green-400">Available to work</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Contact Card Component
interface ContactCardProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    value: string;
    color: 'blue' | 'purple';
}

function ContactCard({ href, icon, label, value, color }: ContactCardProps) {
    const colorClasses = {
        blue: 'border-blue-500/30 hover:border-blue-500/60 hover:bg-blue-500/5',
        purple: 'border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/5'
    };

    const iconColorClasses = {
        blue: 'from-blue-600/50 to-purple-600/50',
        purple: 'from-purple-600/50 to-pink-600/50'
    };

    return (
        <a 
            href={href}
            className={`group flex items-center gap-4 bg-gray-900/40 rounded-xl p-5 border ${colorClasses[color]} transition-all duration-300 hover:scale-[1.02]`}
        >
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${iconColorClasses[color]} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-400 mb-1">{label}</div>
                <div className="text-base sm:text-lg font-semibold text-white truncate">
                    {value}
                </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Send className="w-5 h-5 text-gray-400" />
            </div>
        </a>
    );
}

// Social Button Component
interface SocialButtonProps {
    href: string;
    icon: React.ReactNode;
    label: string;
}

function SocialButton({ href, icon, label }: SocialButtonProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900/60 border border-purple-500/30 rounded-lg hover:bg-purple-500/10 hover:border-purple-500/50 transition-all duration-300 group"
        >
            <span className="group-hover:scale-110 transition-transform duration-300">
                {icon}
            </span>
            <span className="text-sm font-medium">{label}</span>
        </a>
    );
}