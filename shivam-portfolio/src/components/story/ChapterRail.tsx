import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { chapters, CONTACT, scrollToId } from "./storyData";

const railItems = [...chapters.map((c) => ({ id: c.id, numeral: c.numeral, title: c.title })), { id: "epilogue", numeral: "VII", title: "Unwritten" }];

/** Fixed header + chapter rail (desktop) / progress bar (mobile). */
const ChapterRail = () => {
  const [active, setActive] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    const ids = ["prologue", ...railItems.map((r) => r.id)];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const current = railItems.find((r) => r.id === active);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 px-5 sm:px-8 py-4 flex items-center justify-between bg-gradient-to-b from-[var(--ink)] to-transparent">
        <button onClick={() => scrollToId("prologue")} className="mono text-[var(--paper)] hover:text-[var(--ember)] transition-colors">
          S.K. Srivastava
        </button>
        <div className="mono text-[var(--paper-dim)] hidden sm:block truncate max-w-[40vw]">
          {current ? `${current.numeral} · ${current.title}` : "Prologue"}
        </div>
        <a href={CONTACT.resume} download className="mono text-[var(--paper)] link-line">
          Resume ↓
        </a>
        <motion.div style={{ scaleX: progress }} className="absolute left-0 bottom-0 h-px w-full origin-left bg-[var(--ember)] lg:hidden" />
      </header>

      <nav aria-label="Chapters" className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex items-stretch gap-4">
        <div className="relative w-px bg-[var(--rule)]">
          <motion.div style={{ scaleY: progress }} className="absolute inset-0 origin-top bg-[var(--ember)]" />
        </div>
        <ul className="flex flex-col gap-3 py-1">
          {railItems.map((r) => {
            const isActive = r.id === active;
            return (
              <li key={r.id}>
                <button onClick={() => scrollToId(r.id)} className="group flex items-center gap-3 text-left" aria-current={isActive ? "step" : undefined}>
                  <span className={`numeral text-lg w-8 transition-colors ${isActive ? "!text-[var(--ember)]" : "!text-[var(--faint)] group-hover:!text-[var(--paper)]"}`}>
                    {r.numeral}
                  </span>
                  <span className="mono !text-[0.62rem] whitespace-nowrap px-2 py-1 bg-[var(--ink)] text-[var(--paper)] opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100">
                    {r.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default ChapterRail;
