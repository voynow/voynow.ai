import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white pt-16">
      {/* Hero Section */}
      <header className="px-6 py-32 md:px-24 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:gap-12">
          <div className="mb-8 md:mb-0">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
              <Image
                src="/headshot.jpeg"
                alt="Jamie Voynow"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div>
            <h1 className="text-6xl font-bold tracking-tight">
              Jamie Voynow
            </h1>
            <p className="mt-6 text-xl text-gray-400 max-w-2xl">
              Former Data Scientist turned Full Stack Machine Learning Engineer
            </p>
          </div>
        </div>
      </header>
    </div>
  );
}
