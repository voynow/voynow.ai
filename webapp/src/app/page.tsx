import AsciiField from "./AsciiField";

const icons = {
  github: (
    <>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </>
  ),
  x: (
    <>
      <path d="M4 3h4.6L20 21h-4.6z" />
      <path d="M19.5 3 13.4 10" />
      <path d="M4.5 21 10.6 14" />
    </>
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  email: (
    <>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </>
  ),
};

const links = [
  { label: "GitHub", href: "https://github.com/voynow", icon: icons.github },
  { label: "X", href: "https://x.com/voynow", icon: icons.x },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/voynow/", icon: icons.linkedin },
  { label: "Email", href: "mailto:voynow99@gmail.com", icon: icons.email },
];

const timeline = [
  {
    title: "CTO, Kling Capital",
    href: "https://klingcapital.com",
    date: "2025 —",
    points: [
      "Built a coding-agent quant research platform that actually works",
      "Built a portfolio to 9 figures in monthly volume on 100% agentically derived strategies",
      <span key="hiring">
        I am looking for talented folks to{" "}
        <a href="https://klingcapital.com/careers" className="link">join our growing team</a>
      </span>,
    ],
  },
  {
    title: "Chat With JFK Files",
    href: "https://chatwithjfkfiles.com",
    date: "2025",
    points: [
      "Built and launched within hours of the news dropping",
      "20k users overnight, 1M+ views on X, 400M+ tokens processed",
    ],
  },
  {
    title: "AI Agent Engineer, Cantor",
    href: "https://x.com/voynow",
    date: "2024",
    points: [
      "Led development of agentic text-to-SQL system for brokers",
      "Built LLM-as-a-judge evals platform before it was cool",
      "Scaled AI extraction platform 100x, saving ~8.5k hours annually",
    ],
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg text-[13.5px] sm:text-[15px] leading-[1.6] text-text-2">
      <div className="field fixed inset-0 z-0 pointer-events-none">
        <AsciiField />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center max-w-[820px] mx-auto px-6 py-12">
        <header className="reveal" style={{ "--i": 0 } as React.CSSProperties}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
            <h1 className="text-[15px] font-semibold text-text-1">Jamie Voynow</h1>
            <nav className="flex gap-6">
              {links.map((l) => (
                <a key={l.label} href={l.href} aria-label={l.label} className="icon">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {l.icon}
                  </svg>
                </a>
              ))}
            </nav>
          </div>
          <p className="mono mt-2 text-[12px] text-text-3">CTO, Kling Capital · New York</p>
        </header>

        <section className="reveal mt-10 sm:mt-12" style={{ "--i": 1 } as React.CSSProperties}>
          <h2 className="text-[26px] sm:text-[34px] leading-[1.15] font-semibold text-text-1 tracking-[-0.02em] text-balance">
            Building an AI-native hedge fund.
          </h2>
          <p className="mt-5 max-w-[62ch] text-pretty">
            Agents already out-engineer and out-research the professionals, and the gap
            is growing every day. I am building an agentic flywheel that merges engineer
            and trader into one person who owns the whole stack.
          </p>
        </section>

        <section className="reveal mt-10 sm:mt-12" style={{ "--i": 2 } as React.CSSProperties}>
          <div className="space-y-5 sm:space-y-6">
            {timeline.map((t) => (
              <div key={t.title} className="sm:grid sm:grid-cols-[96px_1fr] sm:gap-x-6">
                <p className="mono hidden sm:block text-[12px] text-text-3 pt-[4px]">{t.date}</p>
                <div>
                  <p className="flex items-baseline justify-between gap-4 text-text-1 font-semibold">
                    {t.href ? <a href={t.href} className="link text-text-1">{t.title}</a> : <span>{t.title}</span>}
                    <span className="mono sm:hidden text-[11px] font-normal text-text-3 whitespace-nowrap">{t.date}</span>
                  </p>
                  <ul className="mt-1.5 space-y-1 list-disc pl-5 marker:text-text-3 text-text-2">
                    {t.points.map((p, i) => (
                      <li key={i} className="text-pretty">{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
