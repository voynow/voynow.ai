export default function Home() {
  return (
    <main className="min-h-screen bg-[#131316] font-[family-name:var(--font-mono)] text-[13px] text-neutral-500">
      <div className="max-w-xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <header className="mb-14">
          <div className="flex items-baseline justify-between mb-1">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Jamie Voynow
            </h1>
            <div className="flex gap-5 text-xs text-neutral-600">
              <a href="https://x.com/voynow" className="hover:text-emerald-500 transition-colors">x/twitter</a>
              <a href="https://github.com/voynow" className="hover:text-emerald-500 transition-colors">github</a>
              <a href="https://www.linkedin.com/in/voynow/" className="hover:text-emerald-500 transition-colors">linkedin</a>
            </div>
          </div>
          <p className="text-xs text-neutral-600">
            AI Agent Engineer &middot; NYC
          </p>
        </header>

        {/* About */}
        <section className="mb-14">
          <h2 className="text-[10px] text-emerald-500 font-bold tracking-[0.15em] uppercase mb-5">
            About
          </h2>
          <p className="leading-relaxed text-neutral-200 font-semibold text-[15px]">
            Currently designing autonomous multi-agent research and trading
            systems at House Kling.
          </p>
          <p className="leading-relaxed mt-2 text-neutral-500">
            Agents that generate hypotheses, write code, validate results,
            and compound knowledge across hundreds of iterations.
          </p>
        </section>

        <div className="border-t border-neutral-900 mb-10" />

        {/* Timeline */}
        <section>
          <h2 className="text-[10px] text-emerald-500 font-bold tracking-[0.15em] uppercase mb-8">
            Timeline
          </h2>
          <div className="space-y-10">
            {/* Cantor */}
            <div className="border-l-2 border-neutral-900 pl-5 hover:border-emerald-500/30 transition-colors duration-300">
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

            {/* JFK */}
            <div className="border-l-2 border-neutral-900 pl-5 hover:border-emerald-500/30 transition-colors duration-300">
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

            {/* House Kling */}
            <div className="border-l-2 border-emerald-500 pl-5">
              <div className="flex justify-between items-baseline mb-3">
                <p className="text-neutral-200 font-semibold">
                  Lead AI Agent Engineer &middot;{" "}
                  <a href="https://housekling.com" className="hover:text-emerald-500 transition-colors">
                    House Kling
                  </a>
                </p>
                <p className="text-xs text-neutral-600 whitespace-nowrap ml-4">
                  2025 &ndash;
                </p>
              </div>
              <ul className="space-y-1.5 text-neutral-500">
                <li>Autonomous multi-agent systems for quant research</li>
                <li>Live trading across equities, crypto, and options</li>
                <li>Long-horizon autonomy, agentic memory, context engineering</li>
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
