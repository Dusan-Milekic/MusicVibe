import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Music, Menu, X, User, Home, Search, CreditCard, Mail } from 'lucide-react';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const navLinks = [
        { id: 'about', label: 'About', icon: <Music className="w-4 h-4" /> },
        { id: 'check', label: 'Discover', icon: <Search className="w-4 h-4" /> },
        { id: 'payment', label: 'Pricing', icon: <CreditCard className="w-4 h-4" /> },
        { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
        { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
    ];

    const scrollToSection = (sectionId: string) => {
        // If not on homepage, navigate to homepage first
        if (location.pathname !== '/') {
            navigate('/');
            // Wait for navigation to complete, then scroll
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        } else {
            // Already on homepage, just scroll
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        closeMobileMenu();
    };

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-purple-500/20 shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    {/* Logo */}
                    <Link 
                        to="/" 
                        className="flex items-center gap-2 group"
                        onClick={closeMobileMenu}
                    >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Music className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            MusicVibe
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:block">
                        <ul className="flex items-center gap-1">
                            {navLinks.map((link) => (
                                <li key={link.id}>
                                    <button
                                        onClick={() => scrollToSection(link.id)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 text-gray-300 hover:text-white hover:bg-gray-800 hover:scale-105"
                                    >
                                        {link.icon}
                                        <span>{link.label}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors duration-300"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6 text-white" />
                        ) : (
                            <Menu className="w-6 h-6 text-white" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <nav className="lg:hidden py-4 border-t border-gray-800 animate-fade-in">
                        <ul className="space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.id}>
                                    <button
                                        onClick={() => scrollToSection(link.id)}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 text-gray-300 hover:text-white hover:bg-gray-800"
                                    >
                                        {link.icon}
                                        <span>{link.label}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
}