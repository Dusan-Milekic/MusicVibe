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

export default StatCard