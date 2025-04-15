'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { BsPinFill } from 'react-icons/bs';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa6';

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
  featured?: boolean;
  image?: string;
};

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type ChatInterfaceProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

/** Refined navigation with subtle animations */
function Navbar() {
  const socialLinks: SocialLink[] = [
    { name: 'Twitter', url: 'https://twitter.com/jamievoynow', icon: <FaTwitter size={20} /> },
    { name: 'GitHub', url: 'https://github.com/voynow', icon: <FaGithub size={20} /> },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/voynow/', icon: <FaLinkedin size={20} /> }
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-4"
    >
      <nav className="max-w-5xl mx-auto rounded-full backdrop-blur-md bg-white/[0.02] border border-white/[0.05]">
        <div className="px-4 md:px-6 h-12 flex items-center justify-between">
          {/* Mobile: Icons only, Desktop: Icons with labels */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-white/10"
            >
              <Image
                src="/headshot.jpeg"
                alt="Jamie Voynow"
                width={40}
                height={40}
                className="object-cover w-full h-full"
                priority
              />
            </motion.div>
            {/* Only show name on medium+ screens */}
            <span className="hidden sm:block text-white/80 font-bold">
              Jamie Voynow
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-1 md:gap-2">
            {socialLinks.map(({ name, url, icon }) => (
              <motion.a
                key={name}
                whileHover={{ scale: 1.1 }}
                href={url}
                className="p-2 rounded-full hover:bg-white/[0.06] text-white/60 hover:text-white transition-all
                          flex items-center gap-2"
                aria-label={name}
              >
                {icon}
                {/* Only show labels on large screens */}
                <span className="hidden sm:block text-sm">
                  {name}
                </span>
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
      <div className={`relative w-full max-w-4xl mx-auto p-8 rounded-2xl transition-all duration-300
                    bg-gradient-to-br from-white/[0.02] to-transparent
                    border border-white/[0.06] hover:border-white/[0.1]`}>
        <div className="absolute -top-3 left-8 px-4 py-1 rounded-full 
                      bg-black border border-white/[0.06]
                      font-mono text-xs tracking-wider text-white/40">
          {formattedDate}
        </div>

        {item.featured && (
          <div className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
            <BsPinFill size={20} />
          </div>
        )}

        <a href={item.link} target="_blank" rel="noopener noreferrer"
          className="block group-hover:translate-x-1 transition-transform">
          <h3 className="text-2xl font-medium mb-3 bg-gradient-to-r from-white to-white/80 
                         bg-clip-text text-transparent">
            {item.title}
          </h3>
          <p className="text-white/60 text-lg leading-relaxed">{item.description}</p>

          {item.featured && item.image && (
            <div className="mt-6 rounded-xl overflow-hidden border border-white/10">
              <Image
                src={item.image}
                alt={item.title}
                width={1200}
                height={630}
                className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500"
                priority
              />
            </div>
          )}
        </a>

        <div className="mt-6 flex items-center justify-between">
          <span className="px-4 py-2 rounded-full bg-white/[0.03] 
                         text-sm font-medium uppercase tracking-wider text-white/40">
            {item.category}
          </span>
          <div className="flex items-center gap-3">
            {item.github_link && (
              <a href={item.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-1.5 rounded-full
                          bg-indigo-600/50 text-white/80 transition-colors
                          hover:bg-indigo-600/60 group">
                <FaGithub size={20} className="group-hover:scale-110 transition-transform" />
                <span className="text-md">Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const COOL_STUFF: CoolStuff[] = [
  {
    date: "2025-03-18",
    title: "Chat With JFK Files",
    description: "400M+ tokens processed, 1M+ Impressions on Twitter, 10s of thousands of users, 150+ GitHub stars",
    link: "https://chatwithjfkfiles.com",
    github_link: "https://github.com/voynow/chat-with-jfk-files",
    category: "project",
    featured: true,
    image: "/jfk-files.png"
  },
  {
    date: "2025-04-08",
    title: "Spicy Take on OpenAI Evals",
    description: "My opinions on the new OpenAI evals platform seemed to resonate with the community. Spoiler: I'm not a fan.",
    link: "https://x.com/jamievoynow/status/1909729715218153544",
    category: "tweet"
  },
  {
    date: "2025-03-23",
    title: "No-BS Shipping Chat Apps That Scale",
    description: "Agents who? Chat apps make up 95% of successful production LLM projects. Here's my guide to building them fast.",
    link: "https://x.com/jamievoynow/status/1903832332462649472",
    category: "article"
  },
  {
    date: "2025-02-23",
    title: "Complexity is the Enemy",
    description: "My sassy response to 'How to Build an LLM Chat App: The New Litmus Test for Junior Devs'",
    link: "https://x.com/jamievoynow/status/1893788406901285250",
    category: "tweet"
  },
  {
    date: "2025-02-03",
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

function ChatInterface({ isOpen, setIsOpen }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  // Auto-send initial message when chat opens
  useEffect(() => {
    if (isOpen && !hasInitialized.current) {
      hasInitialized.current = true;
      // Create a synthetic event object with the correct type
      const syntheticEvent = { preventDefault: () => { } } as React.FormEvent<HTMLFormElement>;
      handleSubmit(syntheticEvent, "Give me a hot take on building AI apps right now.", true);
    }
  }, [isOpen]);

  // Prevent background scroll when chat is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, overrideMessage?: string, hideMessage?: boolean) => {
    e.preventDefault();
    if ((!input.trim() && !overrideMessage) || isLoading) return;

    const userMessage = overrideMessage || input.trim();
    if (!overrideMessage) setInput('');
    if (!hideMessage) {
      setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    }
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          chat_history: messages.map(m => m.content),
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch response');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      let assistantMessage = '';
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const content = line.slice(6);
            assistantMessage += content;
            setMessages(prev => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1] = {
                role: 'assistant',
                content: assistantMessage,
              };
              return newMessages;
            });
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isOpen ? 0.5 : 0,
          display: isOpen ? 'block' : 'none'
        }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/80 z-40"
        onClick={() => setIsOpen(false)}
      />

      {/* Chat Interface */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          scale: isOpen ? 1 : 0.95,
          display: isOpen ? 'flex' : 'none'
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-[5vh] left-1/2 -translate-x-1/2 w-full max-w-6xl h-[90vh] z-50"
      >
        <div className="bg-neutral-950/95 backdrop-blur-xl border border-white/[0.06] rounded-3xl overflow-hidden shadow-2xl flex flex-col w-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06] bg-black/20">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
              </div>
              <div>
                <span className="text-white/90 font-medium text-xl">Voynow AI</span>
                <p className="text-white/40 text-sm">Disclaimer: Responses may not reflect actual views of Jamie Voynow</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/40 hover:text-white/60 p-2 hover:bg-white/[0.06] rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full space-y-8 text-center">
                <div className="w-20 h-20 rounded-full bg-indigo-600/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-400">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white/90 mb-3">Ship Fast, Stay Weird</h3>
                  <p className="text-white/60 text-lg">
                    Ask me about building AI apps, fighting complexity, or my latest experiments.
                  </p>
                </div>
              </div>
            )}
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-3`}
              >
                {message.role === 'assistant' && (
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                    <Image
                      src="/headshot.jpeg"
                      alt="Voynow AI"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[70%] p-4 rounded-2xl ${message.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-sm'
                    : 'bg-white/[0.03] text-white/90 rounded-bl-sm'
                    }`}
                >
                  <p className="text-lg leading-relaxed">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={(e) => handleSubmit(e)} className="px-6 py-5 border-t border-white/[0.06] bg-black/20">
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-6 py-4 text-white/90 text-lg focus:outline-none focus:border-indigo-500/50 placeholder:text-white/40"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-colors disabled:opacity-50 font-medium text-lg flex items-center gap-3"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/20 border-t-white/90 rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
}

/** Main component with enhanced layout and animations */
export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-white/20">
      <Navbar />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-45 px-6 max-w-3xl mx-auto"
      >
        <div className="text-center space-y-8">
          <motion.h1
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-7xl font-black tracking-tight 
                       bg-gradient-to-b from-white to-white/80 
                       bg-clip-text text-transparent"
          >
            Hi, Im Jamie
          </motion.h1>

          <motion.p
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-indigo-600"
          >
            I ship fast, weird, and useful AI apps
          </motion.p>

          <motion.p
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto"
          >
            I occasionally help early-stage teams move fast and fight complexity when building applied AI applications.
          </motion.p>

          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="flex items-center justify-center gap-6 text-white/40 text-sm"
          >
            <div className="flex items-center gap-2">
              <LocationIcon />
              <span>New York City</span>
            </div>
            <div className="w-1 h-1 bg-white/20 rounded-full" />
            <div className="flex items-center gap-2">
              <WorkIcon />
              <span>ML Engineering @ <a href="https://www.cantor.com/" className="text-white/60 hover:text-white transition-colors">Cantor</a></span>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="pt-4 flex items-center justify-center gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
              whileTap={{ scale: 0.98 }}
              href="https://calendly.com/voynow99/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full
                        bg-white/[0.03] border border-white/10
                        text-white/80 hover:text-white font-medium
                        transition-all duration-300 text-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Schedule a call
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsChatOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full
                        bg-indigo-600 text-white font-medium
                        hover:bg-indigo-500 transition-all duration-300 text-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Chat with Voynow AI
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      <section className="py-24 px-6">
        <div className="space-y-8">
          {COOL_STUFF.map((item, index) => (
            <TimelineItem key={item.title} item={item} index={index} />
          ))}
        </div>
      </section>

      <section className="py-36 px-6
                    bg-indigo-600/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 
                         bg-clip-text text-transparent">
            Let&apos;s Build Something Great Together
          </h2>

          <p className="text-xl text-white/60 leading-relaxed">
            I help teams ship production-ready AI applications without the complexity.
            Whether you&apos;re starting from scratch or scaling up, let&apos;s chat.
          </p>

          <motion.div className="pt-8">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://calendly.com/voynow99/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full
                        bg-gradient-to-r from-blue-500 to-indigo-500
                        hover:from-blue-400 hover:to-indigo-400
                        text-white text-lg font-medium
                        transition-all duration-300 shadow-lg shadow-indigo-500/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Schedule a 30-min call
            </motion.a>
          </motion.div>
        </motion.div>
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

      <ChatInterface isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </main>
  );
}
