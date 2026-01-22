import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, Settings, Music, LogOut, User } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    
    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { path: '/dashboard', icon: <Home className="w-5 h-5" />, label: 'Home' },
        { path: '/search', icon: <Search className="w-5 h-5" />, label: 'Search' },
        { path: '/library', icon: <Library className="w-5 h-5" />, label: 'Your Library' },
        { path: '/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('rememberMe');
        window.location.href = '/login';
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-gray-900 rounded-lg border border-purple-500/30 flex items-center justify-center text-white"
            >
                <Music className="w-5 h-5" />
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-900/30 border-r border-purple-500/20 p-6 z-40 transition-transform duration-300 lg:translate-x-0 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Logo */}
                <Link
                    to="/dashboard"
                    className="flex items-center gap-3 mb-8 group"
                    onClick={() => setIsOpen(false)}
                >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Music className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        MusicVibe
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                                isActive(item.path)
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                            }`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Divider */}
                <div className="my-6 border-t border-gray-800"></div>

                {/* User Section */}
                <div className="space-y-2">
                    <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                            isActive('/profile')
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                                : 'text-gray-300 hover:text-white hover:bg-gray-800'
                        }`}
                    >
                        <User className="w-5 h-5" />
                        <span>Profile</span>
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-300 hover:text-white hover:bg-red-500/10 hover:border-red-500/30 border border-transparent transition-all duration-300"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>

                {/* Footer Info */}
                <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-xs text-green-400 font-medium">Premium Free</span>
                        </div>
                        <p className="text-xs text-gray-400">
                            Unlimited music streaming
                        </p>
                    </div>
                </div>
            </aside>
        </>
    );
}