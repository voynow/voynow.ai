import Image from 'next/image';

export default function AboutMe() {
    return (
        <div className="min-h-screen bg-black text-white pt-16">
            <main className="px-6 py-32 md:px-24 max-w-5xl mx-auto">
                {/* Profile Header */}
                <div className="mb-16">
                    <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-xl overflow-hidden mb-8">
                        <Image
                            src="/headshot.jpeg"
                            alt="Jamie Voynow"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Jamie Voynow</h1>
                    <div className="flex gap-4 text-gray-400 text-lg mb-6">
                        <span>📍 Philadelphia</span>
                        <span>🎓 UPenn</span>
                    </div>
                    <p className="text-xl text-gray-400">
                        ML Engineer by day, open source enthusiast by night.
                        Always exploring the intersection of AI and real-world applications.
                    </p>
                </div>

                {/* Quick Facts */}
                <section className="mb-16">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="bg-gray-900 rounded-xl p-6">
                            <h3 className="text-gray-400 mb-2">Currently Reading</h3>
                            <p>The Pragmatic Programmer</p>
                        </div>
                        <div className="bg-gray-900 rounded-xl p-6">
                            <h3 className="text-gray-400 mb-2">Learning</h3>
                            <p>Rust & Systems Programming</p>
                        </div>
                        <div className="bg-gray-900 rounded-xl p-6">
                            <h3 className="text-gray-400 mb-2">Recent Achievement</h3>
                            <p>20k users on ChatWithJFKFiles! 🎉</p>
                        </div>
                    </div>
                </section>

                {/* About Me */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6">About</h2>
                    <div className="space-y-4 text-lg text-gray-400">
                        <p>
                            Former data scientist who found their passion in building AI-powered tools
                            that people actually use. When Im not coding, youll find me rock climbing
                            or diving into a new tech rabbit hole.
                        </p>
                        <p>
                            I believe in building in public and sharing knowledge. Currently exploring
                            the possibilities of LLMs and their practical applications.
                        </p>
                    </div>
                </section>

                {/* Interests */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6">Interests</h2>
                    <div className="flex flex-wrap gap-3">
                        {[
                            "🧗‍♂️ Rock Climbing",
                            "🤖 AI/ML",
                            "📚 Reading",
                            "🎮 Gaming",
                            "🏃‍♂️ Running",
                            "🎧 Music",
                            "✈️ Travel",
                            "🌱 Open Source"
                        ].map((interest) => (
                            <span
                                key={interest}
                                className="px-4 py-2 bg-gray-900 rounded-full text-gray-400"
                            >
                                {interest}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Recent Activity */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6">Recent Activity</h2>
                    <div className="space-y-6">
                        <div className="border-l-2 border-gray-800 pl-6">
                            <p className="text-gray-400">
                                🚀 Launched new feature on ChatWithJFKFiles
                            </p>
                            <p className="text-sm text-gray-500 mt-1">2 days ago</p>
                        </div>
                        <div className="border-l-2 border-gray-800 pl-6">
                            <p className="text-gray-400">
                                📝 Published new blog post about LLM applications
                            </p>
                            <p className="text-sm text-gray-500 mt-1">1 week ago</p>
                        </div>
                        <div className="border-l-2 border-gray-800 pl-6">
                            <p className="text-gray-400">
                                💪 Hit a new climbing grade at the gym!
                            </p>
                            <p className="text-sm text-gray-500 mt-1">2 weeks ago</p>
                        </div>
                    </div>
                </section>

                {/* Photos/Gallery (Optional) */}
                <section>
                    <h2 className="text-2xl font-semibold mb-6">Photos</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {/* Add your photos here */}
                        <div className="aspect-square bg-gray-900 rounded-xl"></div>
                        <div className="aspect-square bg-gray-900 rounded-xl"></div>
                        <div className="aspect-square bg-gray-900 rounded-xl"></div>
                    </div>
                </section>
            </main>
        </div>
    );
} 