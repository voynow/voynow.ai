import Image from 'next/image';

type TimelineEvent = {
    year: string;
    title: string;
    description: string;
    imagePath: string;
    category: 'work' | 'education' | 'personal' | 'travel';
};

export default function Timeline() {
    const timeline: TimelineEvent[] = [
        {
            year: '2024',
            title: 'First Solo Mountain Climb',
            description: 'Reached the summit of Mount Rainier. A personal milestone that taught me perseverance.',
            imagePath: '/images/rainier.jpg',
            category: 'personal'
        },
        {
            year: '2023',
            title: 'Backpacking Through Southeast Asia',
            description: 'Three months exploring Vietnam, Thailand, and Indonesia. Changed my perspective on life.',
            imagePath: '/images/asia.jpg',
            category: 'travel'
        },
        {
            year: '2022',
            title: 'Started Rock Climbing',
            description: 'Found my passion in climbing. Now a regular at the local gym and outdoor spots.',
            imagePath: '/images/climbing.jpg',
            category: 'personal'
        },
        // Add more personal events...
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            <main className="max-w-6xl mx-auto px-6 py-16">
                {/* Header */}
                <div className="mb-24 text-center">
                    <h1 className="text-4xl font-bold mb-4">Jamie Voynow</h1>
                    <p className="text-xl text-gray-400">A journey through time</p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Center line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-800" />

                    <div className="space-y-32">
                        {timeline.map((event, index) => (
                            <div key={event.year} className="relative">
                                {/* Year marker in center */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 -mt-4">
                                    <div className="w-16 h-16 rounded-full bg-gray-900 border-2 border-gray-700 flex items-center justify-center">
                                        <span className="text-xl font-bold">{event.year}</span>
                                    </div>
                                </div>

                                {/* Content - alternating sides */}
                                <div className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} gap-8`}>
                                    <div className={`w-[45%] ${index % 2 === 0 ? 'ml-0' : 'order-2'}`}>
                                        <div className="space-y-4">
                                            {/* Category tag */}
                                            <span className={`inline-block px-3 py-1 rounded-full text-sm
                                                ${event.category === 'personal' ? 'bg-purple-900 text-purple-200' :
                                                    event.category === 'travel' ? 'bg-blue-900 text-blue-200' :
                                                        event.category === 'work' ? 'bg-green-900 text-green-200' :
                                                            'bg-orange-900 text-orange-200'}`}>
                                                {event.category}
                                            </span>

                                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                                                <Image
                                                    src={event.imagePath}
                                                    alt={event.title}
                                                    fill
                                                    className="object-cover transition-transform hover:scale-105"
                                                />
                                            </div>
                                            <h2 className="text-2xl font-semibold">{event.title}</h2>
                                            <p className="text-gray-400 leading-relaxed">{event.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
} 