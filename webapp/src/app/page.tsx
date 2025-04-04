import Image from 'next/image';
import { FaGithub, FaTwitter } from 'react-icons/fa';

type SocialLink = {
  name: string;
  url: string;
  icon: React.ReactNode;
};

type CoolStuff = {
  date: string;
  title: string;
  description: string;
  link: string;
  category: string;
  github_link?: string;
};

/** Simple navigation bar with social media icons */
function Navbar() {
  const socialLinks: SocialLink[] = [
    {
      name: 'Twitter',
      url: 'https://twitter.com/jamievoynow',
      icon: <FaTwitter size={25} />
    },
    {
      name: 'GitHub',
      url: 'https://github.com/voynow',
      icon: <FaGithub size={25} />
    }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-neutral-950/80 backdrop-blur-sm z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="text-xl text-gray-400 font-bold">Jamie Voynow</div>
        <div className="flex items-center gap-4">
          {socialLinks.map(({ name, url, icon }) => (
            <a
              key={name}
              href={url}
              className="text-gray-400 hover:text-white transition-colors p-2"
              aria-label={name}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/** Timeline item showing a project, article, tweet or life event */
const TimelineItem = ({ item, index }: { item: CoolStuff; index: number }) => {
  const formattedDate = new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  const dotColor = {
    'project': 'bg-blue-500',
    'article': 'bg-green-500',
    'tweet': 'bg-yellow-400',
    'life event': 'bg-red-500'
  }[item.category] || 'bg-red-500';

  return (
    <div className={`group relative flex items-start gap-8 py-10 ${index !== 0 ? 'border-t border-gray-800' : ''}`}>
      <div className="w-24 shrink-0 text-sm font-mono text-gray-500">{formattedDate}</div>
      <div className="relative mt-1">
        <div className={`w-3 h-3 rounded-full ${dotColor}`} />
      </div>
      <div className="flex-1 space-y-2">
        <div className="block group-hover:brightness-125 group-hover:scale-101 transition-all duration-300">
          <a href={item.link} target="_blank" className="block">
            <h3 className="text-xl font-bold tracking-tight text-gray-300">{item.title}</h3>
            <p className="mt-2 text-gray-400">{item.description}</p>
          </a>
          <div className="mt-4 flex items-center gap-4">
            <span className="uppercase text-xs font-bold tracking-wider px-2 py-1 rounded bg-gray-800 text-gray-400">
              {item.category}
            </span>
            {item.github_link && (
              <a href={item.github_link} target="_blank"
                className="text-gray-500 bg-gray-900 hover:text-gray-400 hover:bg-gray-800 transition-all duration-300 px-2 py-1 rounded-md flex items-center gap-1 text-sm">
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

const COOL_STUFF: CoolStuff[] = [
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
  },
  {
    date: "2024-11-24",
    title: "20 min+ Marathon PR",
    description: "Competed in my second marathon, the Philadelphia Marathon, and finished in under 4 hours for the first time.",
    link: "https://www.strava.com/activities/12974216838",
    category: "life event"
  }
];

/** Location and work icons for profile section */
const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const WorkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />

      <section className="mt-20 bg-neutral-800/20 rounded-xl flex flex-col items-center justify-center px-6 pb-12 max-w-7xl mx-auto">
        <div className="mt-12 relative w-32 h-32 rounded-xl overflow-hidden border-2 border-gray-800">
          <Image src="/headshot.jpeg" alt="Jamie Voynow" fill className="object-cover" priority />
        </div>

        <h1 className="mt-6 text-6xl text-gray-300 font-bold tracking-tighter">Jamie Voynow</h1>
        <p className="mt-4 text-2xl font-bold text-gray-500 text-center max-w-2xl">ML Engineer // Builder</p>

        <p className="mt-12 text-lg text-gray-300 leading-relaxed mb-8 text-center max-w-2xl">
          ML Engineer, Builder, & Founder. Built and launched <a href="https://chatwithjfkfiles.com" className="text-blue-400 hover:underline">chatwithjfkfiles.com</a> in less than 4 hours. Training for the NYC Marathon.
        </p>

        <div className="mb-4 flex flex-col sm:flex-row justify-center gap-8 text-gray-400">
          <div className="flex items-center gap-2 justify-center">
            <LocationIcon />
            <span>New York City, NY</span>
          </div>

          <div className="flex items-center gap-2 justify-center">
            <WorkIcon />
            <span>ML Engineering <a href="https://www.cantor.com/" className="text-blue-400 hover:underline">@Cantor</a></span>
          </div>
        </div>
      </section>

      <section className="w-full max-w-4xl mx-auto px-6 py-8">
        <div className="relative">
          <div className="space-y-2">
            {COOL_STUFF.map((item, index) => (
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
            <div className="text-sm text-gray-500">© {new Date().getFullYear()} Jamie Voynow</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
