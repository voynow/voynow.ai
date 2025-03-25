import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="flex flex-col items-center justify-center h-screen px-6">
        <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-xl overflow-hidden border-2 border-gray-800">
          <Image
            src="/headshot.jpeg"
            alt="Jamie Voynow"
            fill
            className="object-cover"
            priority
          />
        </div>
        <h1 className="mt-8 text-7xl font-bold tracking-tighter">
          Jamie Voynow
        </h1>
        <p className="mt-4 text-2xl text-gray-400 text-center max-w-2xl">
          Full Stack Machine Learning Engineer
        </p>
        <Link
          href="/timeline"
          className="mt-8 px-6 py-2 border border-gray-800 rounded-md 
            text-gray-400 hover:text-white hover:border-gray-700 
            transition-all duration-300
            group flex items-center gap-2"
        >
          Learn more
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </header>
    </div>
  );
}
