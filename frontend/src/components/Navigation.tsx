export default function Navigation(){
    return (
       
        <div className="fixed left-0 top-0 h-full w-64 bg-black p-6 z-10">
            <h1 className="text-2xl font-bold mb-8 text-green-500">🎵 MusicVibe</h1>
            <nav>
                <ul className="space-y-4">
                    <li className="cursor-pointer hover:text-green-400 transition p-2 rounded hover:bg-gray-800" onClick={() => {
                        window.location.href = "/dashboard"
                    }}>
                        🏠 Home
                    </li>
                    <li className="cursor-pointer hover:text-green-400 transition p-2 rounded hover:bg-gray-800" onClick={() => {
                        window.location.href = "/search"
                    }}>
                        🔍 Search
                    </li>
                    <li className="cursor-pointer hover:text-green-400 transition p-2 rounded hover:bg-gray-800" onClick={() => {
                        window.location.href="/library"
                    }}>
                        📚 Your Library
                    </li>
                    <li className="cursor-pointer hover:text-green-400 transition p-2 rounded hover:bg-gray-800" onClick={()=>
                        window.location.href="/settings"
                    }>
                        ⚙️ Settings
                    </li>
                </ul>
            </nav>
        </div>    
        
    )
}