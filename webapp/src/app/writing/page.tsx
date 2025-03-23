export default function Writing() {
    return (
        <div className="min-h-screen bg-black text-white pt-16">
            <main className="px-6 py-32 md:px-24 max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold mb-12">Writing</h1>
                <div className="space-y-12">
                    <article className="border-l-2 border-gray-800 pl-6">
                        <h3 className="text-xl font-semibold">Article Title</h3>
                        <p className="text-gray-400 mt-2">Full article preview...</p>
                    </article>
                    {/* Add more articles */}
                </div>
            </main>
        </div>
    );
} 