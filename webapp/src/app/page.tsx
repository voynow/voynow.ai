import Image from 'next/image';

type CoolStuff = {
  date: string;
  title: string;
  description: string;
  link: string;
  category: string;
  github_link?: string;
};

type TimelineItemProps = {
  item: CoolStuff;
  index: number;
};

const TimelineItem = ({ item, index }: TimelineItemProps) => {
  const date = new Date(item.date);
  const formattedDate = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  return (
    <div className={`group relative flex items-start gap-8 py-10 ${index !== 0 ? 'border-t border-gray-800' : ''}`}>
      <div className="w-24 shrink-0 text-sm font-mono text-gray-500">
        {formattedDate}
      </div>

      <div className="relative mt-1">
        <div className={`w-3 h-3 rounded-full ${item.category === 'project' ? 'bg-blue-500' :
          item.category === 'article' ? 'bg-green-500' :
            'bg-yellow-400'
          }`} />
        <div className="absolute top-0 left-1.5 h-full w-px bg-gray-800 -z-10" />
      </div>

      <div className="flex-1 space-y-2">
        <div className="block group-hover:brightness-125 transition-all duration-300">
          <a
            href={item.link}
            target="_blank"
            className="block"
          >
            <h3 className="text-xl font-bold tracking-tight text-white">{item.title}</h3>
            <p className="mt-2 text-gray-400">{item.description}</p>
          </a>

          <div className="mt-4 flex items-center gap-4">
            <span className="uppercase text-xs font-bold tracking-wider px-2 py-1 rounded bg-gray-800 text-gray-400">
              {item.category}
            </span>

            {item.github_link && (
              <a
                href={item.github_link}
                target="_blank"
                className="text-gray-500 bg-gray-900 hover:text-gray-400 hover:bg-gray-800 transition-all duration-300 px-2 py-1 rounded-md flex items-center gap-1 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const cool_stuff: CoolStuff[] = [
    {
      date: "2025-03-23",
      title: "No-BS Shipping Chat Apps That Scale",
      description: "Agents who? Chat apps make up 95% of successful production LLM projects. Here's my guide to building them fast.",
      link: "https://x.com/jamievoynow/status/1903832332462649472",
      category: "article"
    },
    {
      date: "2025-03-18",
      title: "Chat With JFK Files",
      description: "400M+ tokens processed, 1M+ Impressions on Twitter, 10s of thousands of users, 150+ stars on GitHub",
      link: "https://chatwithjfkfiles.com",
      github_link: "https://github.com/voynow/chat-with-jfk-files",
      category: "project"
    },
    {
      date: "2025-02-23",
      title: "Complexity is the Enemy",
      description: "My sassy response to 'How to Build an LLM Chat App: The New Litmus Test for Junior Devs'",
      link: "https://x.com/jamievoynow/status/1893788406901285250",
      category: "tweet"
    },
    {
      date: "2025-02-23",
      title: "I Was Plagiarized",
      description: "@ntdillon plagiarized my work, stole my virtual identity, ran a crypto scam, and dissapeared.",
      link: "https://x.com/jamievoynow/status/1886555832814641255",
      category: "tweet"
    },
    {
      date: "2025-02-02",
      title: "Launched CrushYourRace.com",
      description: "I built an AI running coach application (deployed to the iOS App Store) helping runners train for the marathon.",
      link: "https://crushyourrace.com",
      github_link: "https://github.com/voynow/crushyourrace",
      category: "project"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="flex flex-col items-center justify-center px-6 pt-20 pb-12">
        <div className="mt-12 relative w-32 h-32 rounded-xl overflow-hidden border-2 border-gray-800">
          <Image
            src="/headshot.jpeg"
            alt="Jamie Voynow"
            fill
            className="object-cover"
            priority
          />
        </div>
        <h1 className="mt-6 text-7xl text-gray-300 font-bold tracking-tighter">
          Jamie Voynow
        </h1>
        <p className="mt-4 text-2xl font-bold text-yellow-400 text-center max-w-2xl">
          ML Engineer // Builder
        </p>
      </section>

      <section className="w-full max-w-4xl mx-auto px-6 py-8">
        <div className="mtrelative">
          <div className="absolute top-0 left-[calc(24px+1.5rem-1px)] w-px h-full bg-gray-800" />

          <div className="space-y-2">
            {cool_stuff.map((item, index) => (
              <TimelineItem key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800 mt-16">
        <div className="px-6 py-16 md:px-24 max-w-5xl mx-auto">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex gap-6">
              <a href="https://twitter.com/jamievoynow" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              <a href="https://github.com/voynow" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
            </div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Jamie Voynow
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
