export default function Header() {
    return (
        <header className="bg-gray-900 text-white py-4 px-6">
            <div className="container mx-auto flex justify-between items-center">
                <h2 className="text-2xl font-bold">MusicVibe</h2>
                
                <nav>
                    <ul className="flex gap-6">
                        <li className="hover:text-purple-400 cursor-pointer transition">About</li>
                        <li className="hover:text-purple-400 cursor-pointer transition">Check</li>
                        <li className="hover:text-purple-400 cursor-pointer transition">Payment</li>
                        <li className="hover:text-purple-400 cursor-pointer transition">Profile</li>
                        <li className="hover:text-purple-400 cursor-pointer transition">Contact</li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}