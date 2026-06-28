import { FaXTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa6";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#131316] font-[family-name:var(--font-mono)] text-[13px] text-neutral-500">
      <div className="max-w-xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <header className="mb-14">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Jamie Voynow
            </h1>
            <div className="flex gap-4 text-neutral-600">
              <a href="https://x.com/voynow" className="hover:text-emerald-500 transition-colors"><FaXTwitter size={16} /></a>
              <a href="https://github.com/voynow" className="hover:text-emerald-500 transition-colors"><FaGithub size={16} /></a>
              <a href="https://www.linkedin.com/in/voynow/" className="hover:text-emerald-500 transition-colors"><FaLinkedinIn size={16} /></a>
            </div>
          </div>
          <p className="text-xs text-neutral-600">
            New York City
          </p>
        </header>

        {/* About */}
        <section className="mb-14">
          <h2 className="text-[10px] text-emerald-500 font-bold tracking-[0.15em] uppercase mb-5">
            About
          </h2>
          <p className="leading-relaxed text-neutral-200 font-semibold text-[15px]">
            Currently designing autonomous multi-agent research and trading
            systems at Kling Capital.
          </p>
          <p className="leading-relaxed mt-2 text-neutral-500">
            Orchestrating data infrastructure and agents into a single loop
            that turns raw data into validated signals and live trades &mdash;
            engineered to be fast, secure, and profitable.
          </p>
        </section>

        <div className="border-t border-neutral-900 mb-10" />

        {/* Timeline */}
        <section>
          <h2 className="text-[10px] text-emerald-500 font-bold tracking-[0.15em] uppercase mb-8">
            Timeline
          </h2>
          <div className="space-y-10">
            {/* Kling Capital */}
            <div className="rounded-lg bg-emerald-500/[0.04] ring-1 ring-emerald-500/10 -mx-4 px-4 py-4">
              <div className="flex justify-between items-baseline mb-3">
                <p className="text-neutral-200 font-semibold">
                  CTO &middot; Kling Capital
                </p>
                <p className="text-xs text-neutral-600 whitespace-nowrap ml-4">
                  2025 &ndash;
                </p>
              </div>
              <ul className="space-y-1.5 text-neutral-500">
                <li>Data infrastructure feeding autonomous research agents</li>
                <li>Live trading across equities, crypto, and options</li>
                <li>Closing the loop from raw data to production returns</li>
                <li>Learn more &mdash; <a href="https://klingcapital.com" className="text-neutral-300 hover:text-emerald-500 transition-colors">klingcapital.com</a></li>
              </ul>
            </div>

            {/* JFK */}
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <p className="text-neutral-200 font-semibold">
                  <a href="https://chatwithjfkfiles.com" className="hover:text-emerald-500 transition-colors">
                    Chat With JFK Files
                  </a>
                </p>
                <p className="text-xs text-neutral-600 whitespace-nowrap ml-4">
                  Mar 2025
                </p>
              </div>
              <ul className="space-y-1.5 text-neutral-500">
                <li>Built and launched within hours of the news dropping</li>
                <li>20k users overnight, went viral on X, millions of tokens processed</li>
                <li>Try it yourself &mdash; <a href="https://chatwithjfkfiles.com" className="text-neutral-300 hover:text-emerald-500 transition-colors">chatwithjfkfiles.com</a></li>
              </ul>
            </div>

            {/* Cantor */}
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <p className="text-neutral-200 font-semibold">
                  AI Engineer &middot; Cantor Fitzgerald
                </p>
                <p className="text-xs text-neutral-600 whitespace-nowrap ml-4">
                  2024
                </p>
              </div>
              <ul className="space-y-1.5 text-neutral-500">
                <li>Led development of agentic text-to-SQL system for brokers</li>
                <li>Built LLM-as-a-judge evals platform before it was cool</li>
                <li>Scaled AI extraction platform 100x, saving ~8.5k hours annually</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="border-t border-neutral-900 mt-14 pt-10">
          <p className="text-neutral-200 font-semibold text-[15px]">
            Want to work together?
          </p>
          <p className="mt-2 text-neutral-500">
            DM me on{" "}
            <a href="https://x.com/voynow" className="text-neutral-300 hover:text-emerald-500 transition-colors">X</a>
            {" "}or email{" "}
            <a href="mailto:jamie@voynow.ai" className="text-neutral-300 hover:text-emerald-500 transition-colors">jamie@voynow.ai</a>
          </p>
        </div>
      </div>
    </main>
  );
}
