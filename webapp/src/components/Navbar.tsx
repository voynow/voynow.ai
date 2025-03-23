import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-50 border-b border-gray-800">
            <div className="px-6 md:px-24 max-w-5xl mx-auto h-16 flex items-center justify-between">
                <Link href="/" className="font-semibold hover:text-gray-400">
                    Jamie Voynow
                </Link>

                <div className="flex gap-8">
                    <Link href="/aboutme" className="hover:text-gray-400">
                        About Me
                    </Link>
                    <Link href="/projects" className="hover:text-gray-400">
                        Projects
                    </Link>
                    <Link href="/writing" className="hover:text-gray-400">
                        Writing
                    </Link>
                </div>
            </div>
        </nav>
    );
} 