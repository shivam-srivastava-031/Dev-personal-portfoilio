import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { archive, caseStudies, CONTACT, scrollToId, type CaseStudy } from "./storyData";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const slug = (s: string) => `case-${s.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
const pad = (n: number) => String(n).padStart(2, "0");

const ExtLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="mono text-[var(--paper)] link-line">
    {children}
  </a>
);

const Block = ({ label, children }: { label: string; children: ReactNode }) => (
  <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
    <h4 className="mono text-[var(--faint)] mb-5">{label}</h4>
    {children}
  </motion.div>
);

/** Data flow drawn as labelled nodes joined by arrows; wraps on narrow screens. */
const Flow = ({ nodes }: { nodes: string[] }) => (
  <motion.ol
    className="flex flex-wrap items-center gap-y-3"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-40px" }}
    transition={{ staggerChildren: 0.08 }}
    aria-label="Architecture, in data-flow order"
  >
    {nodes.map((n, i) => (
      <motion.li key={n} variants={fadeUp} className="flex items-center">
        <span className="mono !normal-case !tracking-normal !text-xs px-3 py-2 border border-[var(--rule)] bg-[var(--ink-2)] text-[var(--paper)]">
          {n}
        </span>
        {i < nodes.length - 1 && (
          <span aria-hidden className="px-2 text-[var(--ember)]">
            →
          </span>
        )}
      </motion.li>
    ))}
  </motion.ol>
);

const CaseStudyEntry = ({ c, index }: { c: CaseStudy; index: number }) => (
  <article id={slug(c.title)} className="border-t border-[var(--rule)] py-16 sm:py-24 scroll-mt-16">
    <div className="flex flex-wrap items-baseline justify-between gap-3 mb-10">
      <span className="mono text-[var(--ember)]">
        {pad(index + 1)} / {pad(caseStudies.length)}
      </span>
      <span className="mono text-[var(--paper-dim)]">
        {c.category} · {c.year}
      </span>
    </div>

    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
      {/* Identity: stays in view while the detail column scrolls */}
      <div className="lg:col-span-5">
        <motion.div className="lg:sticky lg:top-28" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h3 className="display text-5xl sm:text-6xl mb-6">{c.title}</h3>
          <p className="text-xl font-light leading-relaxed text-[var(--paper)] mb-10">{c.summary}</p>
          <ul className="space-y-3 mb-10">
            {c.facts.map((f) => (
              <li key={f} className="flex gap-3 text-sm text-[var(--paper-dim)] leading-snug">
                <span aria-hidden className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-[var(--ember)]" />
                {f}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-6">
            {c.liveUrl && <ExtLink href={c.liveUrl}>Live site ↗</ExtLink>}
            <ExtLink href={c.repoUrl}>Source ↗</ExtLink>
          </div>
        </motion.div>
      </div>

      {/* Detail */}
      <div className="lg:col-span-7 space-y-14">
        <Block label="Context">
          <p className="text-lg leading-relaxed text-[var(--paper-dim)]">{c.context}</p>
        </Block>

        <Block label="What I built">
          <ol className="space-y-5">
            {c.built.map((b, i) => (
              <li key={i} className="grid grid-cols-[2rem_1fr] gap-2 leading-relaxed text-[var(--paper)]">
                <span className="mono text-[var(--faint)] pt-[0.2em]">{pad(i + 1)}</span>
                <span>{b}</span>
              </li>
            ))}
          </ol>
        </Block>

        <Block label="Architecture">
          <Flow nodes={c.architecture} />
        </Block>

        <Block label="Key decisions">
          <div className="space-y-8">
            {c.decisions.map((d) => (
              <div key={d.decision} className="border-l border-[var(--ember)] pl-5">
                <p className="text-[var(--paper)] leading-relaxed mb-2">{d.decision}</p>
                <p className="text-[var(--paper-dim)] leading-relaxed">
                  <span className="mono text-[var(--ember)] mr-2">Why</span>
                  {d.why}
                </p>
              </div>
            ))}
          </div>
        </Block>

        <Block label="Stack">
          <div className="flex flex-wrap gap-2">
            {c.stack.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
        </Block>
      </div>
    </div>
  </article>
);

const Archive = () => (
  <div className="border-t border-[var(--rule)] pt-16 sm:pt-24">
    <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
      <div>
        <p className="mono text-[var(--ember)] mb-4">Archive</p>
        <h3 className="display text-4xl sm:text-5xl">Other things I've built</h3>
      </div>
      <ExtLink href={CONTACT.github}>All repositories ↗</ExtLink>
    </div>

    <div role="table" aria-label="Other projects">
      <div role="row" className="hidden md:grid grid-cols-[4rem_minmax(0,1.3fr)_minmax(0,1fr)_9rem] gap-6 pb-3 border-b border-[var(--rule)] mono text-[var(--faint)]">
        <span role="columnheader">Year</span>
        <span role="columnheader">Project</span>
        <span role="columnheader">Built with</span>
        <span role="columnheader" className="text-right">Links</span>
      </div>
      {archive.map((a) => (
        <motion.div
          key={a.title}
          role="row"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-30px" }}
          className="group grid grid-cols-[4rem_minmax(0,1fr)] md:grid-cols-[4rem_minmax(0,1.3fr)_minmax(0,1fr)_9rem] gap-x-6 gap-y-3 py-6 border-b border-[var(--rule)]"
        >
          <span role="cell" className="mono text-[var(--faint)] pt-1">
            {a.year}
          </span>
          <div role="cell">
            <p className="text-xl text-[var(--paper)] group-hover:text-[var(--ember)] transition-colors">
              {a.title} <span className="mono !text-[0.62rem] text-[var(--faint)] ml-2 align-middle">{a.kind}</span>
            </p>
            <p className="mt-1 text-[var(--paper-dim)] leading-relaxed">{a.line}</p>
          </div>
          <p role="cell" className="col-start-2 md:col-start-auto mono !normal-case !tracking-normal !text-xs text-[var(--paper-dim)] md:pt-2 leading-relaxed">
            {a.stack.join(" · ")}
          </p>
          <div role="cell" className="col-start-2 md:col-start-auto flex md:justify-end gap-5 md:pt-1 whitespace-nowrap">
            {a.liveUrl && <ExtLink href={a.liveUrl}>Live ↗</ExtLink>}
            <ExtLink href={a.repoUrl}>Code ↗</ExtLink>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const SelectedWork = () => (
  <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:pl-40 pb-24 sm:pb-36">
    {/* Quick index for readers who want to jump straight to one project */}
    <nav aria-label="Case studies" className="flex flex-wrap gap-x-8 gap-y-3 mb-4">
      {caseStudies.map((c, i) => (
        <button key={c.title} onClick={() => scrollToId(slug(c.title))} className="group flex items-baseline gap-2 text-left">
          <span className="mono text-[var(--ember)]">{pad(i + 1)}</span>
          <span className="text-[var(--paper-dim)] group-hover:text-[var(--paper)] transition-colors">{c.title}</span>
        </button>
      ))}
    </nav>

    {caseStudies.map((c, i) => (
      <CaseStudyEntry key={c.title} c={c} index={i} />
    ))}

    <Archive />
  </div>
);

export default SelectedWork;
