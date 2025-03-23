export default function Projects() {
    return (
        <div className="min-h-screen bg-black text-white pt-16">
            <main className="px-6 py-32 md:px-24 max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold mb-12">Projects</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="rounded-lg border border-gray-800 p-6">
                        <h3 className="text-xl font-semibold mb-4">ChatWithJFKFiles</h3>
                        <p className="text-gray-400">Full project description...</p>
                    </div>
                    {/* Add more project cards */}
                </div>
            </main>
        </div>
    );
} 