import Image from 'next/image';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

type CoolStuff = {
  date: string;
  title: string;
  description: string;
  link: string;
  category: string;
  github_link?: string;
  image?: string;
};

/** Simple navigation */
function Navbar() {
  const socialLinks = [
    { name: 'Twitter', url: 'https://twitter.com/jamievoynow', icon: <FaTwitter size={20} /> },
    { name: 'GitHub', url: 'https://github.com/voynow', icon: <FaGithub size={20} /> },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/voynow/', icon: <FaLinkedin size={20} /> }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 pt-4">
      <nav className="max-w-4xl mx-auto backdrop-blur-sm border border-white/10 rounded-full">
        <div className="px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src="/headshot.jpeg"
                alt="Jamie Voynow"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <span className="text-white font-medium">Jamie Voynow</span>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map(({ name, url, icon }) => (
              <a
                key={name}
                href={url}
                className="text-white/60 hover:text-white transition-colors"
                aria-label={name}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

/** Simple card item */
const TimelineItem = ({ item }: { item: CoolStuff }) => {
  const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="group p-7 bg-gradient-to-br from-slate-800/60 to-slate-900/40 border border-slate-700/40 rounded-2xl h-[420px] hover:border-violet-400/40 hover:bg-slate-800/70 hover:shadow-2xl hover:shadow-violet-500/10 hover:-translate-y-1 transition-all duration-500 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.02] to-blue-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-2">
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
          </a>

          <div className="flex items-center gap-2 ml-4">
            <span className="text-xs text-white/40 whitespace-nowrap">
              {formattedDate}
            </span>
            {item.github_link && (
              <a
                href={item.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2 py-1 bg-slate-700/40 border border-slate-600/40 rounded-md text-white/60 hover:text-white hover:bg-slate-600/40 hover:border-slate-500/40 transition-all duration-200 text-xs whitespace-nowrap"
              >
                <FaGithub size={12} />
                <span>Code</span>
              </a>
            )}
          </div>
        </div>

        <a href={item.link} target="_blank" rel="noopener noreferrer" className="block hover:text-blue-400 transition-colors">
          <p className="text-white/70 text-sm mb-3">{item.description}</p>

          {item.image && (
            <div className="mb-3 rounded overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={200}
                className="w-full h-64 object-cover"
              />
            </div>
          )}
        </a>
      </div>
    </div>
  );
};

const COOL_STUFF: CoolStuff[] = [
  {
    date: "2025-07-12",
    title: "Poker Bench",
    description: "I simulated 100 games of Texas Hold 'em between several different frontier LLMs.",
    link: "https://x.com/jamievoynow/status/1944082679831433670",
    github_link: "https://github.com/voynow/poker-bench",
    category: "project",
    image: "/poker-bench.jpeg"
  },
  {
    date: "2025-03-18",
    title: "Chat With JFK Files",
    description: "400M+ tokens processed, 1M+ Impressions on Twitter, 10s of thousands of users, 150+ GitHub stars",
    link: "https://chatwithjfkfiles.com",
    github_link: "https://github.com/voynow/chat-with-jfk-files",
    category: "project",
    image: "/jfk-files.png"
  },
  {
    date: "2025-02-02",
    title: "Launched CrushYourRace.com",
    description: "I built an AI running coach application (deployed to the iOS App Store) helping runners train for the marathon.",
    link: "https://crushyourrace.com",
    github_link: "https://github.com/voynow/crushyourrace",
    category: "project",
    image: "/crushyourrace.png"
  },
  {
    date: "2024-11-24",
    title: "20 min+ Marathon PR",
    description: "Competed in my second marathon, the Philadelphia Marathon, and finished in under 4 hours for the first time.",
    link: "https://www.strava.com/activities/12974216838",
    category: "race",
    image: "/philly-marathon.png"
  }
];

/** Main page component */
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white relative overflow-hidden">
      {/* Global background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/[0.02] via-transparent to-blue-500/[0.02]"></div>
      <div className="absolute top-32 left-1/4 w-96 h-96 bg-violet-500/[0.015] rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500/[0.015] rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-36 pb-16 px-6 relative">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-slate-50 mb-6 tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent animate-in fade-in duration-1000">
                Jamie Voynow
              </h1>

              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-500/15 to-blue-500/15 border border-violet-400/30 rounded-full mb-8 backdrop-blur-sm shadow-lg shadow-violet-500/10 animate-in slide-in-from-bottom-3 duration-700 delay-300">
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
                <span className="text-violet-300 font-mono text-sm font-medium">Voynow LLC</span>
              </div>

              <h2 className="text-2xl text-slate-200 font-light mb-10 max-w-2xl mx-auto animate-in fade-in duration-1000 delay-500">
                AI Engineer <span className="text-violet-400">•</span> Agentic Systems
              </h2>
            </div>

            <p className="text-xl text-slate-300/90 max-w-3xl mx-auto leading-relaxed mb-10 font-light animate-in fade-in duration-1000 delay-700">
              AI/ML Engineer at the frontier of AI Agent Engineering, building production Agents for Quant Research, Data Analysis, and Code Generation.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 text-slate-400 text-sm animate-in fade-in duration-1000 delay-900 mb-12">
              <div className="flex items-center gap-3 px-3 py-2 rounded-full bg-slate-800/30 border border-slate-700/30">
                <div className="w-1.5 h-1.5 bg-violet-400 rounded-full"></div>
                <span>New York City</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-full bg-slate-800/30 border border-slate-700/30">
                <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse"></div>
                <span>Leading Agent Eng @ <a href="https://housekling.com" className="text-slate-300 hover:text-violet-300 transition-colors font-medium">House Kling</a></span>
              </div>
            </div>


          </div>
        </section>

        {/* Content Section */}
        <section className="pt-16 pb-24 px-8 relative">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center">
              <h3 className="text-3xl font-semibold text-slate-100">Recent Work</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {COOL_STUFF.map((item, index) => (
                <div key={item.title} className="animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 200}ms` }}>
                  <TimelineItem item={item} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 relative">
          <div className="bg-gradient-to-br from-gray-950/90 to-gray-900/90 backdrop-blur-xl border-t border-slate-600/20 p-12 text-center">
            <div className="mb-8 mt-6">
              <h3 className="text-2xl font-semibold text-slate-100 mb-4">Let's Connect</h3>
              <p className="text-slate-300/80 text-lg max-w-2xl mx-auto">
                Want to chat about AI, agents, or explore collaboration opportunities?
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
              <a
                href="https://twitter.com/jamievoynow"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-violet-500/20 to-blue-500/20 border border-violet-400/30 rounded-full hover:border-violet-400/50 hover:from-violet-500/30 hover:to-blue-500/30 transition-all duration-300"
              >
                <svg className="w-5 h-5 text-violet-300 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="text-violet-300 group-hover:text-violet-200 font-medium">Let's chat on Twitter</span>
              </a>

              <a
                href="https://twitter.com/jamievoynow"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-slate-400 hover:text-violet-300 transition-colors"
              >
                <span>Follow for live updates</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

            <div className="mt-12 pt-8">
              <p className="text-slate-500 text-sm">
                Building the future of AI agents, one line of code at a time.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
