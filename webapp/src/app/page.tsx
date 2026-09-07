import { FaXTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import AsciiField from "./AsciiField";

const link = "hover:text-link transition-colors";

const timeline = [
  {
    title: "CTO, Kling Capital",
    href: "https://klingcapital.com",
    date: "2025 —",
    current: true,
    points: [
      "Data infrastructure feeding autonomous research agents",
      "Live trading across equities, crypto, and options",
      "Closing the loop from raw data to production returns",
    ],
  },
  {
    title: "Chat With JFK Files",
    href: "https://chatwithjfkfiles.com",
    date: "Mar 2025",
    current: false,
    points: [
      "Built and launched within hours of the news dropping",
      "20k users overnight, went viral on X, millions of tokens processed",
    ],
  },
  {
    title: "AI Engineer, Cantor Fitzgerald",
    href: null,
    date: "2024",
    current: false,
    points: [
      "Led development of agentic text-to-SQL system for brokers",
      "Built LLM-as-a-judge evals platform before it was cool",
      "Scaled AI extraction platform 100x, saving ~8.5k hours annually",
    ],
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg-0 text-[13px] sm:text-[14px] font-semibold text-text-2 break-words">
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 0.32 }}>
        <AsciiField />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center max-w-2xl mx-auto px-5 sm:px-6 py-6">
        <header className="mb-8">
          <div className="flex items-baseline justify-between gap-4">
            <h1 className="text-[22px] font-bold text-text-1 tracking-[-0.01em]">
              Jamie Voynow
            </h1>
            <div className="flex gap-4 text-text-3 shrink-0">
              <a href="https://x.com/voynow" className="hover:text-link transition-colors"><FaXTwitter size={15} /></a>
              <a href="https://github.com/voynow" className="hover:text-link transition-colors"><FaGithub size={15} /></a>
              <a href="https://www.linkedin.com/in/voynow/" className="hover:text-link transition-colors"><FaLinkedinIn size={15} /></a>
            </div>
          </div>
          <div className="mono mt-3 flex flex-wrap items-center gap-x-4 text-[12px] text-text-3">
            <span>CTO, Kling Capital</span>
            <span>New York City</span>
          </div>
        </header>

        <section className="mb-8">
          <p className="label mb-4">About</p>
          <p className="text-text-1 font-bold text-[15px] sm:text-[16px] leading-snug">
            Currently building an AI-native hedge fund from the ground up.
          </p>
          <p className="mt-2 leading-normal">
            Most funds are weighed down by what made them. The principles I am betting on:
          </p>
          <ul className="mt-2 space-y-1 list-disc pl-5 marker:text-text-4">
            {["Building for agents first", "Complex infrastructure with simple interfaces", "Information flywheels that compound", "Tied together by real market taste"].map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>

        <section>
          <p className="label mb-4">Timeline</p>
          <div className="space-y-2">
            {timeline.map((t) => (
              <div key={t.title} className="grid grid-cols-[1fr_auto] gap-x-6 py-3">
                <div>
                  <p className="text-text-1 font-semibold">
                    {t.href ? <a href={t.href} className={link}>{t.title}</a> : t.title}
                  </p>
                  <ul className="mt-1.5 space-y-1 list-disc pl-5 marker:text-text-4">
                    {t.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
                <p className="mono text-[12px] text-text-3 text-right whitespace-nowrap pt-0.5">{t.date}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
