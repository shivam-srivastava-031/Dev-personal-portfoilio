import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ChapterRail from "@/components/story/ChapterRail";
import StoryChapter from "@/components/story/StoryChapter";
import SelectedWork from "@/components/story/SelectedWork";
import ScrollWords from "@/components/story/ScrollWords";
import { chapters, CONTACT, scrollToId } from "@/components/story/storyData";
import portrait from "@/assets/shivam-photo.jpg";
import "@/components/story/story.css";

const ease = [0.22, 1, 0.36, 1] as const;

const Prologue = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const lines = [
    <>Every system</>,
    <>has a <em>story.</em></>,
    <>This one is mine.</>,
  ];

  return (
    <section id="prologue" ref={ref} className="relative min-h-[100svh] flex flex-col justify-end px-5 sm:px-8 lg:pl-40 pb-16 pt-28 overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[42rem] h-[42rem] rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle, rgba(233,162,59,0.45), transparent 65%)" }}
      />
      <motion.div style={{ y, opacity }} className="relative max-w-6xl">
        <motion.p
          className="mono text-[var(--ember)] mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Prologue · A developer's story in six chapters
        </motion.p>
        <h1 className="display text-[clamp(3.2rem,11vw,10rem)]">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.35 + i * 0.14, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div
          className="mt-12 grid sm:grid-cols-2 gap-8 max-w-4xl border-t border-[var(--rule)] pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease }}
        >
          <p className="text-lg text-[var(--paper-dim)] leading-relaxed">
            I'm <span className="text-[var(--paper)]">Shivam Kumar Srivastava</span>, a full-stack developer and data analyst
            from Lucknow. I build backend systems, APIs, and dashboards that turn messy data into decisions.
          </p>
          <div className="flex sm:justify-end items-end">
            <button onClick={() => scrollToId("contents")} className="mono text-[var(--paper)] flex items-center gap-4 group">
              <span className="relative h-10 w-px bg-[var(--rule)] overflow-hidden">
                <motion.span
                  className="absolute inset-x-0 top-0 h-1/2 bg-[var(--ember)]"
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
              </span>
              <span className="link-line">Begin reading</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const Contents = () => (
  <section id="contents" className="border-t border-[var(--rule)] px-5 sm:px-8 lg:pl-40 py-24 sm:py-32">
    <div className="max-w-4xl">
      <p className="mono text-[var(--ember)] mb-10">Contents</p>
      <ol>
        {[...chapters, { id: "epilogue", numeral: "VII", title: "The next chapter", era: "Now" }].map((c, i) => (
          <motion.li
            key={c.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.06, ease }}
          >
            <button
              onClick={() => scrollToId(c.id)}
              className="group w-full flex items-baseline gap-4 py-4 border-b border-[var(--rule)] text-left"
            >
              <span className="numeral text-2xl w-12 shrink-0">{c.numeral}</span>
              <span className="text-2xl sm:text-3xl font-light group-hover:text-[var(--ember)] group-hover:translate-x-2 transition-all duration-300">
                {c.title}
              </span>
              <span className="flex-1 border-b border-dotted border-[var(--faint)] translate-y-[-0.3em] hidden sm:block" />
              <span className="mono text-[var(--paper-dim)] shrink-0 ml-auto sm:ml-0">{c.era}</span>
            </button>
          </motion.li>
        ))}
      </ol>
    </div>
  </section>
);

const Epilogue = () => {
  const links = [
    { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { label: "LinkedIn", value: "Shivam Kumar Srivastava", href: CONTACT.linkedin },
    { label: "GitHub", value: "shivam-srivastava-031", href: CONTACT.github },
    { label: "Phone", value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/-/g, "")}` },
    { label: "Resume", value: "Download resume", href: CONTACT.resume },
  ];

  return (
    <section id="epilogue" className="relative border-t border-[var(--rule)] px-5 sm:px-8 lg:pl-40 pt-28 sm:pt-40 pb-16 overflow-hidden">
      <div
        aria-hidden
        className="absolute -bottom-60 -left-40 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, rgba(233,162,59,0.5), transparent 65%)" }}
      />
      <div className="relative max-w-6xl">
        <div className="numeral text-7xl sm:text-8xl mb-6">VII</div>
        <p className="mono text-[var(--ember)] mb-6">Now · Epilogue</p>
        <h2 className="display text-[clamp(2.8rem,8vw,7rem)] mb-12">
          The next chapter
          <br />
          is <em>unwritten.</em>
        </h2>
        <ScrollWords
          className="lead max-w-4xl mb-20"
          text="I'm looking for roles in software development and data analytics, where backend engineering meets real business problems. If you're building something like that, let's write the next chapter together."
        />

        <div className="grid lg:grid-cols-12 gap-14">
          <ul className="lg:col-span-7 border-t border-[var(--rule)]">
            {links.map((l) => (
              <li key={l.label} className="border-b border-[var(--rule)]">
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-4 py-5"
                >
                  <span className="mono text-[var(--paper-dim)] w-24 shrink-0">{l.label}</span>
                  <span className="flex-1 text-lg sm:text-2xl font-light break-all group-hover:text-[var(--ember)] transition-colors">{l.value}</span>
                  <span className="text-[var(--faint)] group-hover:text-[var(--ember)] group-hover:translate-x-1 transition-all">↗</span>
                </a>
              </li>
            ))}
          </ul>

          <motion.aside
            className="lg:col-span-5 flex gap-6 items-start"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            <img src={portrait} alt="Shivam Kumar Srivastava" className="w-28 sm:w-32 aspect-[3/4] object-cover grayscale rounded-sm border border-[var(--rule)]" />
            <div>
              <p className="mono text-[var(--ember)] mb-3">About the author</p>
              <p className="text-[var(--paper-dim)] leading-relaxed">
                B.Tech CSE, BBD Engineering College (2026). Software Developer Intern at Gravityer. Founder of ListenInn
                Foundation. Works in Python, Django, SQL and React. Lives in {CONTACT.location.split(",")[0]}.
              </p>
            </div>
          </motion.aside>
        </div>

        <footer className="mt-28 pt-8 border-t border-[var(--rule)] flex flex-col sm:flex-row gap-4 justify-between mono text-[var(--faint)]">
          <span>© {new Date().getFullYear()} Shivam Kumar Srivastava · Fin.</span>
          <button onClick={() => scrollToId("prologue")} className="link-line text-[var(--paper-dim)] w-fit">
            Back to the beginning ↑
          </button>
        </footer>
      </div>
    </section>
  );
};

const Story = () => (
  <main className="story">
    <div className="grain" aria-hidden />
    <ChapterRail />
    <Prologue />
    <Contents />
    {chapters.map((c) => (
      <StoryChapter key={c.id} chapter={c}>
        {c.id === "work" && <SelectedWork />}
      </StoryChapter>
    ))}
    <Epilogue />
  </main>
);

export default Story;
