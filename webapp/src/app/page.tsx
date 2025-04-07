'use client';

import { motion } from 'framer-motion';
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

/** Refined navigation with subtle animations */
function Navbar() {
  const socialLinks: SocialLink[] = [
    { name: 'Twitter', url: 'https://twitter.com/jamievoynow', icon: <FaTwitter size={20} /> },
    { name: 'GitHub', url: 'https://github.com/voynow', icon: <FaGithub size={20} /> }
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className="h-20 backdrop-blur-md bg-black/60 border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-lg font-medium"
          >
            Hey Yall 👋
          </motion.div>
          <div className="flex items-center gap-6">
            {socialLinks.map(({ name, url, icon }) => (
              <motion.a
                key={name}
                whileHover={{ scale: 1.1 }}
                href={url}
                className="p-3 rounded-full hover:bg-white/[0.06] text-white/60 hover:text-white transition-all"
                aria-label={name}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>
      </nav>
    </motion.header>
  );
}

/** Enhanced timeline item with modern styling */
const TimelineItem = ({ item, index }: { item: CoolStuff; index: number }) => {
  const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div className="relative w-full max-w-5xl mx-auto p-8 rounded-2xl transition-all duration-300
                    bg-gradient-to-br from-white/[0.02] to-transparent
                    hover:from-white/[0.04] hover:to-transparent
                    border border-white/[0.06] hover:border-white/[0.1]">
        <div className="absolute -top-3 left-8 px-4 py-1 rounded-full 
                      bg-black border border-white/[0.06]
                      font-mono text-xs tracking-wider text-white/40">
          {formattedDate}
        </div>

        <a href={item.link} target="_blank" rel="noopener noreferrer"
          className="block group-hover:translate-x-1 transition-transform">
          <h3 className="text-2xl font-medium mb-3 bg-gradient-to-r from-white to-white/80 
                         bg-clip-text text-transparent">
            {item.title}
          </h3>
          <p className="text-white/60 text-lg leading-relaxed">{item.description}</p>
        </a>

        <div className="mt-6 flex items-center gap-4">
          <span className="px-4 py-1 rounded-full bg-white/[0.03] 
                         text-xs font-medium uppercase tracking-wider text-white/40">
            {item.category}
          </span>
          {item.github_link && (
            <a href={item.github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-1 rounded-full
                        text-white/40 hover:text-white/90 transition-colors
                        hover:bg-white/[0.03]">
              <FaGithub size={16} />
              <span className="text-sm">View Code</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

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
    category: "race"
  }
];

/** Location and work icons for profile section */
const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const WorkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

/** Main component with enhanced layout and animations */
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20">
      <Navbar />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-40 px-6 max-w-5xl mx-auto"
      >
        <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-12">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent 
                        blur-2xl transform -translate-x-1 -translate-y-1"></div>
          <div className="relative rounded-full overflow-hidden border-2 border-white/[0.1]
                        ring-4 ring-black ring-offset-2 ring-offset-black">
            <Image
              src="/headshot.jpeg"
              alt="Jamie Voynow"
              width={128}
              height={128}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-4xl font-semibold tracking-tight 
                     bg-gradient-to-r from-white via-white to-white/80 
                     bg-clip-text text-transparent"
          >
            Jamie Voynow
          </motion.h1>

          <motion.p
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="mt-4 text-xl text-white/60 font-light"
          >
            ML Engineer & Builder
          </motion.p>

          <motion.p
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="mt-8 text-xl text-white/80 leading-relaxed"
          >
            Building production ML systems that scale. Recently launched{' '}
            <a href="https://chatwithjfkfiles.com"
              className="text-white hover:text-white/80 transition-colors 
                        border-b border-white/20 hover:border-white/60">
              chatwithjfkfiles.com
            </a>{' '}
            in 4 hours. Training for NYC Marathon.
          </motion.p>

          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="mt-12 flex justify-center gap-8 text-white/40"
          >
            <div className="flex items-center gap-2">
              <LocationIcon />
              <span>New York City</span>
            </div>
            <div className="flex items-center gap-2">
              <WorkIcon />
              <span>
                ML Engineering{' '}
                <a href="https://www.cantor.com/"
                  className="text-white/60 hover:text-white transition-colors">
                  @Cantor
                </a>
              </span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <section className="py-32 px-6">
        <div className="space-y-8">
          {COOL_STUFF.map((item, index) => (
            <TimelineItem key={item.title} item={item} index={index} />
          ))}
        </div>
      </section>

      <footer className="border-t border-white/[0.06] py-12">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-6">
          <div className="flex gap-8">
            <a href="https://twitter.com/jamievoynow"
              className="text-white/40 hover:text-white transition-colors">
              Twitter
            </a>
            <a href="https://github.com/voynow"
              className="text-white/40 hover:text-white transition-colors">
              GitHub
            </a>
          </div>
          <div className="text-sm text-white/20">
            © {new Date().getFullYear()} Jamie Voynow
          </div>
        </div>
      </footer>
    </main>
  );
}
