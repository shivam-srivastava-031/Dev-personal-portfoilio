import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import ScrollWords from "./ScrollWords";
import type { Chapter } from "./storyData";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const StoryChapter = ({ chapter, children }: { chapter: Chapter; children?: ReactNode }) => (
  <section id={chapter.id} className="relative border-t border-[var(--rule)]">
    <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:pl-40 py-24 sm:py-36 grid lg:grid-cols-12 gap-10 lg:gap-16">
      {/* Sticky chapter heading */}
      <div className="lg:col-span-4">
        <motion.div
          className="lg:sticky lg:top-28"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <div className="numeral text-7xl sm:text-8xl lg:text-9xl mb-6">{chapter.numeral}</div>
          <div className="mono text-[var(--ember)] mb-3">{chapter.era}</div>
          <h2 className="display text-4xl sm:text-5xl mb-4">{chapter.title}</h2>
          <p className="mono !normal-case !tracking-normal !text-xs text-[var(--paper-dim)] leading-relaxed">{chapter.place}</p>
        </motion.div>
      </div>

      {/* Narrative */}
      <div className="lg:col-span-8">
        <ScrollWords text={chapter.lead} className="lead mb-16" />

        {chapter.beats.length > 0 && (
          <motion.ol
            className="border-t border-[var(--rule)]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ staggerChildren: 0.12 }}
          >
            {chapter.beats.map((b, i) => (
              <motion.li key={b.title} variants={fadeUp} className="grid sm:grid-cols-[3rem_12rem_1fr] gap-2 sm:gap-6 py-6 border-b border-[var(--rule)]">
                <span className="mono text-[var(--faint)]">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg text-[var(--paper)]">{b.title}</span>
                <span className="text-[var(--paper-dim)] leading-relaxed">{b.text}</span>
              </motion.li>
            ))}
          </motion.ol>
        )}

        {chapter.tags && (
          <motion.div className="flex flex-wrap gap-2 mt-8" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            {chapter.tags.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </motion.div>
        )}

        {chapter.takeaway && (
          <motion.blockquote
            className="mt-14 pl-6 border-l-2 border-[var(--ember)] text-2xl sm:text-3xl italic font-light text-[var(--paper)] leading-snug"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
          >
            “{chapter.takeaway}”
          </motion.blockquote>
        )}
      </div>
    </div>
    {children}
  </section>
);

export default StoryChapter;
