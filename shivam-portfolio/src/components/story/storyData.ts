// All copy for the story page lives here so it can be edited without touching layout code.
// Career facts come from the resume; project facts were checked against each repo's source and git history.
// The narrative lines are a first draft, so rewrite them in your own voice.

export const CONTACT = {
  email: "shivamsrivastava1307@gmail.com",
  phone: "+91-945-043-3061",
  github: "https://github.com/shivam-srivastava-031",
  linkedin: "https://linkedin.com/in/shivam-kumar-srivastava-675893211",
  resume: "/shivam-resume.docx",
  location: "Lucknow, India",
};

export type Beat = { title: string; text: string };

export type Chapter = {
  id: string;
  numeral: string;
  era: string;
  title: string;
  place: string;
  lead: string;
  beats: Beat[];
  takeaway?: string;
  tags?: string[];
};

export const chapters: Chapter[] = [
  {
    id: "origins",
    numeral: "I",
    era: "2020 — 2022",
    title: "Where it started",
    place: "RPM Children's Academy",
    lead:
      "Before I wrote any code, I loved problems with one right answer and many ways to get there. Maths, physics, and chemistry taught me to break big problems into small, honest steps.",
    beats: [
      { title: "Class X · 2020", text: "Strong results across subjects, and a clear pull toward science and technology." },
      { title: "Class XII · 2022", text: "Mathematics, physics, chemistry. Analytical thinking turned into a habit." },
    ],
    takeaway: "I learned to trust the process before I trusted the tools.",
  },
  {
    id: "language",
    numeral: "II",
    era: "2022 — 2026",
    title: "Learning the language",
    place: "B.Tech CSE · BBD Engineering College, Lucknow",
    lead:
      "Computer Science gave those instincts a vocabulary. Data structures, algorithms, and software engineering showed me that good code is mostly clear thinking, written down.",
    beats: [
      { title: "Foundations", text: "Programming, data structures and algorithms, and modern development practice." },
      { title: "Two directions", text: "Full-stack development on one side, data analytics on the other. I didn't want to pick just one." },
      { title: "Outside class", text: "Technical workshops, seminars, and a steady run of side projects." },
    ],
    tags: ["Python", "SQL", "JavaScript", "DSA"],
  },
  {
    id: "founder",
    numeral: "III",
    era: "Founder",
    title: "Building something of my own",
    place: "ListenInn Foundation · Founder & Senior Developer",
    lead:
      "At some point, learning wasn't enough and I wanted to own something end to end. So I started ListenInn Foundation and became its first engineer, its architect, and the person who answered for every decision.",
    beats: [
      { title: "Idea → product", text: "I led planning, architecture, development, and deployment, the whole lifecycle." },
      { title: "Both halves of the stack", text: "Web apps built for scale, performance, and real users, frontend and backend." },
      { title: "Decisions", text: "Database design, API integrations, and the technical calls nobody else was going to make." },
      { title: "People", text: "I worked with teams and stakeholders to turn loose ideas into working software." },
    ],
    takeaway: "Leading taught me that shipping is a team sport, even when you're the one writing the code.",
  },
  {
    id: "first-client",
    numeral: "IV",
    era: "Internship",
    title: "Shipping for someone else",
    place: "Arka Build Constructions · Web Developer Intern",
    lead:
      "Building for a real business meant real constraints. Their customers didn't care about my stack. They cared that the site loaded fast and worked on their phone.",
    beats: [
      { title: "Responsive web", text: "I built and maintained the company's web presence so it worked well on every device." },
      { title: "UI & performance", text: "Usability fixes and site optimization aimed at real engagement." },
      { title: "Backend integration", text: "I wired up backend services and kept technical updates running smoothly." },
    ],
    tags: ["React", "Responsive UI", "Integrations"],
  },
  {
    id: "work",
    numeral: "V",
    era: "2025 — 2026",
    title: "Selected work",
    place: "Personal & client projects · github.com/shivam-srivastava-031",
    lead:
      "Outside my day job, I build systems so I can understand how they fail: a workflow engine, a statistics-first simulation, an LLM tool that checks its own output, and a live site for a mental-health foundation.",
    beats: [],
  },
  {
    id: "production",
    numeral: "VI",
    era: "2026 — Present",
    title: "Into production",
    place: "Gravityer · Software Developer Intern",
    lead:
      "Now the stakes are real. I build backend systems that businesses depend on every day, where an OAuth token expiring at 2 a.m. counts as a real problem.",
    beats: [
      { title: "Backend with Django", text: "API-driven services in Python, Django and REST, built on clean architecture." },
      { title: "Google Ads API", text: "OAuth 2.0 authentication, campaign workflows, lead sync, and analytics tracking." },
      { title: "Automation", text: "Third-party integrations that take manual work off people's plates." },
      { title: "Production engineering", text: "Git workflows, debugging live issues, and maintainable modules." },
    ],
    tags: ["Python", "Django", "REST", "OAuth 2.0", "Google Ads API"],
  },
];

export type CaseStudy = {
  title: string;
  category: string;
  year: string;
  summary: string;
  context: string;
  built: string[];
  decisions: { decision: string; why: string }[];
  architecture: string[];
  stack: string[];
  facts: string[];
  liveUrl?: string;
  repoUrl: string;
};

const GH = CONTACT.github;

export const caseStudies: CaseStudy[] = [
  {
    title: "Workflow Engine",
    category: "Backend · Workflow orchestration",
    year: "2026",
    summary:
      "A self-hostable workflow engine: DAG workflows built on a canvas, executed as Celery tasks with retries, cron and webhook triggers, and live run status.",
    context:
      "Chaining API calls, conditional branches, LLM steps and emails into automations that run on a webhook or a schedule, retry on transient failures, and can be watched while they run.",
    built: [
      "A pure engine layer with no DB or Celery imports: DAG validation (Kahn sort, cycle, entrypoint and per-node config checks), an OR-join readiness scheduler, and fixed, linear and exponential retry policies.",
      "Celery execution: one task per node, queues routed by node type (io_bound, llm, code_exec), retries on transient errors only, and a partial_failed status for continue-on-fail runs.",
      "8 plugin node types registered by decorator: HTTP, email, delay, conditional, sandboxed Jinja transform, restricted Python, Claude LLM call and webhook. User-created cron triggers are scheduled through RedBeat without restarting beat.",
      "Live monitoring: workers publish to Redis pub/sub, and one subscriber fans events out to WebSocket clients, sending a snapshot first. The React client reconnects with backoff and reconciles over REST.",
    ],
    decisions: [
      {
        decision: "Kept validation and scheduling as pure logic; the executor returns dispatch plans instead of calling Celery.",
        why: "The scheduler and validator can be unit-tested without Postgres or Redis, there's no import cycle with the task layer, and the same validator gates both hand-built and AI-generated workflows.",
      },
      {
        decision: "Natural-language workflow building uses forced tool use with the Pydantic schema, plus one retry that feeds the validator's error back.",
        why: "Generated workflows must pass the same DAG checks as hand-built ones, and the error message gives the model something concrete to fix.",
      },
      {
        decision: "Cookie auth uses argon2, 15-minute JWTs, hashed rotating refresh tokens and double-submit CSRF; stored credentials are Fernet-encrypted.",
        why: "A leaked token or database row is far less useful, and secrets are write-only through the API. They're decrypted only inside workers.",
      },
    ],
    architecture: ["React Flow canvas", "FastAPI", "PostgreSQL", "Celery workers", "Redis pub/sub", "WebSocket"],
    stack: ["Python 3.12", "FastAPI", "SQLAlchemy 2.0", "PostgreSQL", "Celery", "Redis", "Pydantic v2", "React", "TypeScript", "React Flow", "Docker", "nginx"],
    facts: [
      "44 backend unit + 27 frontend tests",
      "19 integration / e2e tests on real Postgres",
      "Dev + prod Docker Compose, nginx proxies API & WS",
      "8 plugin node types",
    ],
    repoUrl: `${GH}/Workflow-Automation-System`,
  },
  {
    title: "aiciv",
    category: "Research tooling · Simulation & statistics",
    year: "2026",
    summary:
      "A deterministic, seeded multi-agent simulation where agents propose knowledge claims and only a statistical Verifier can promote them.",
    context:
      "A testbed for whether agents can build up verified knowledge in a finite world without a model deciding what's true. This first version runs scripted and random policies; the LLM policy isn't built yet.",
    built: [
      "A tick loop (freeze, observe, propose, validate, execute, record evidence, verify, upkeep). Every agent decides against the same frozen snapshot, conflicts resolve in agent_id order, and each tick records a state hash.",
      "A Verifier that promotes claims with one-sided Welch tests or ANCOVA, applies Benjamini-Hochberg across each round, and enforces a Hedges' g floor as claims move through the discovery, confirmation and holdout stages.",
      "Evidence integrity: trial rows are HMAC-signed with a per-run secret, must be collected after the claim is registered, can't be reused, and can't be replicated by the claim's own author.",
      "An `aiciv run` CLI that prints JSON results with a reproducibility manifest: git commit, dirty flag, config hash and verification-spec hash.",
    ],
    decisions: [
      {
        decision: "Claim-state changes require a VerifierToken that only the Verifier's constructor can create.",
        why: "Policies and action handlers can't change what counts as 'known' by accident. Anything else trying to create a token raises PermissionError at runtime.",
      },
      {
        decision: "For causal claims, trials are grouped into fixed skill blocks instead of adding raw skill as a regression covariate.",
        why: "Earlier treatments raise skill, so regressing on it can absorb the very effect being measured. When blocks don't overlap, it falls back to a labelled, unblocked Welch test.",
      },
      {
        decision: "Each (seed, purpose, tick, agent) key gets its own RNG, and the state is hashed every tick.",
        why: "The same seed replays the same hash sequence, and the order random numbers are drawn in can't change results. An AST scan rejects global RNG use.",
      },
    ],
    architecture: ["Seeded world engine", "Policies", "Action validator", "Signed trials", "Statistical Verifier", "Knowledge base"],
    stack: ["Python 3.12", "NumPy", "SciPy", "pytest"],
    facts: [
      "107 pytest tests, incl. power & calibration checks",
      "Tests assert identical per-tick state hashes",
      "300-tick seeded run → 427 signed trials",
      "~490 lines of protocol & statistics specs",
    ],
    repoUrl: `${GH}/Dev-AI_world`,
  },
  {
    title: "LinkedIn Post Bot",
    category: "Applied LLM · Output validation",
    year: "2026",
    summary:
      "A Telegram bot that drafts LinkedIn posts with Gemini, measures each generated SVG card in headless Chromium, and asks the model to repair it when checks fail.",
    context:
      "Graphics drawn by an LLM often come back clipped, overlapping or hard to read. The bot treats model output as untrusted: every card goes through measured layout and contrast checks, and failures go back to the model with specific fixes.",
    built: [
      "Structured generation: the post copy and an image brief come back as one Pydantic model, passed to Gemini as its response schema. A second call draws the SVG.",
      "A static SVG guard built on lxml: it enforces the root element, namespace and viewBox; rejects scripts, foreignObject, images, event handlers, external hrefs, @import and @font-face; and normalises every font.",
      "Rendering in a shared Playwright Chromium: each text element is measured with getBoundingClientRect for overflow, overlap and zero size, and contrast is estimated from the rendered PNG. Failures trigger up to three repair rounds.",
      "Model discovery for /apikey: it ranks the models a key can see, probes up to 10, and builds a fallback chain of up to 6. Telegram access is default-deny.",
    ],
    decisions: [
      {
        decision: "Measured text with getBoundingClientRect instead of getBBox.",
        why: "getBBox ignores ancestor transforms, so text inside transformed groups would report the wrong position.",
      },
      {
        decision: "The optional critique rewrite has to pass the same checks, and the last passing SVG is kept if the rewrite fails.",
        why: "The design pass can make a card better, but it can never make it worse than a version that already passed.",
      },
      {
        decision: "Handled 429 and 5xx differently: out-of-quota models leave the chain, busy ones stay as fallbacks, and 5xx errors retry with backoff.",
        why: "Free-tier capacity changes constantly, and this keeps generation running when the preferred model is unavailable.",
      },
    ],
    architecture: ["Telegram handlers", "Gemini (schema output)", "SVG guard", "Chromium render", "Layout & contrast checks", "PNG reply"],
    stack: ["Python 3.12", "python-telegram-bot", "Gemini", "Pydantic v2", "Playwright", "lxml", "Pillow", "Docker"],
    facts: [
      "--self-test for guard + renderer, no API calls",
      "Non-root Docker image with Chromium & fonts",
      "Up to 3 automated repair rounds per card",
      "Default-deny Telegram allowlist",
    ],
    repoUrl: `${GH}/Telegram_linkedin_post`,
  },
  {
    title: "ListenInn Foundation",
    category: "Full-stack · Client work",
    year: "2026",
    summary:
      "The website for a mental-health NGO, with a scoped Gemini assistant behind a serverless proxy and a counseling page staff can edit, backed by Supabase.",
    context:
      "A small mental-health foundation needed a public site for its services, helpline, FAQ and ways to get involved. It also wanted an assistant for common questions and a way for staff to update counseling details without a code change.",
    built: [
      "A multi-page React 19 site with file-based TanStack Router routes for services, helpline, FAQ, get-involved and connect, deployed on Vercel as a static SPA.",
      "A serverless Gemini proxy that keeps the API key out of the client bundle. GET only reports whether it's enabled and which model it uses, and prompts are capped at 8,000 characters.",
      "Admin authentication moved into a serverless function after a secret-scanning alert, so no password ships to the browser. The same server-side secret gates content publishes.",
      "A counseling content API: public reads, and password-gated upserts to Supabase through PostgREST. The service-role key never leaves the server.",
    ],
    decisions: [
      {
        decision: "Called Supabase's PostgREST endpoint directly with on_conflict and merge-duplicates instead of adding the SDK.",
        why: "It needs one upsert and one read. Plain fetch keeps the function dependency-free, and the service-role key stays on the server.",
      },
      {
        decision: "Scoped the assistant with an embedded knowledge base, off-topic refusals, a ban on invented phone numbers, distress guidance, and a local fallback.",
        why: "For a mental-health audience, a made-up answer can cause real harm, and the widget has to keep answering when Gemini is down.",
      },
      {
        decision: "Public reads send a short Cache-Control with stale-while-revalidate, and fall back to built-in content if Supabase is unreachable.",
        why: "The content changes rarely, and the page should still render if the store is down.",
      },
    ],
    architecture: ["React SPA", "Vercel functions", "Gemini API", "Supabase (PostgREST)"],
    stack: ["React 19", "TypeScript", "Vite", "TanStack Router", "Tailwind CSS", "Vercel Functions", "Gemini API", "Supabase"],
    facts: [
      "Live on Vercel for the ListenInn Foundation",
      "47 of 54 commits mine · started from a Lovable template",
      "Assistant language picker: 5 Indian languages",
      "Iterated on client feedback, incl. their own artwork",
    ],
    liveUrl: "https://listeninnfoundation.vercel.app",
    repoUrl: `${GH}/listeninn-foundation-website`,
  },
];

export type ArchiveItem = {
  title: string;
  year: string;
  kind: string;
  line: string;
  stack: string[];
  liveUrl?: string;
  repoUrl: string;
};

export const archive: ArchiveItem[] = [
  {
    title: "Apex Arena",
    year: "2026",
    kind: "Backend · Payments",
    line: "Team project: a tournament API with JWT roles, Razorpay orders and a transactional, idempotent webhook.",
    stack: ["Node.js", "Express", "MongoDB", "Razorpay"],
    repoUrl: `${GH}/apex-arena`,
  },
  {
    title: "Bharat Feed",
    year: "2026",
    kind: "Frontend · Feed ranking",
    line: "A client-side feed ranker using recency half-life, affinity, trending velocity and diversity slots, with an offline cache.",
    stack: ["React", "IndexedDB", "Service Worker", "Capacitor"],
    liveUrl: "https://dev-bharat-app.vercel.app",
    repoUrl: `${GH}/Dev-bharat-app`,
  },
  {
    title: "Feature Analytics",
    year: "2026",
    kind: "Full-stack · Analytics",
    line: "Usage analytics with JWT auth, parameterised aggregate SQL, and Chart.js drill-down.",
    stack: ["Express", "SQLite", "JWT", "Chart.js"],
    repoUrl: `${GH}/Dev-analytics`,
  },
  {
    title: "Emotion Tracker",
    year: "2026",
    kind: "ML · Inference API",
    line: "A FastAPI service that tags text with a pretrained DistilRoBERTa model, evaluated against GoEmotions and MELD.",
    stack: ["FastAPI", "Transformers", "SQLAlchemy", "React"],
    repoUrl: `${GH}/Dev-Emotion-Detection`,
  },
  {
    title: "Local LLM Stack",
    year: "2026",
    kind: "LLM ops · Config",
    line: "An Ollama and Open WebUI setup, plus a filter that saves free-tier quota.",
    stack: ["Docker Compose", "Ollama", "Open WebUI", "Python"],
    repoUrl: `${GH}/Dev-Local_Llm`,
  },
  {
    title: "Document to Audio",
    year: "2026",
    kind: "Frontend · API client",
    line: "A vanilla-JS client for a Gradio text-to-speech Space, using its raw queue/SSE protocol with cold-start retries.",
    stack: ["JavaScript", "EventSource", "Gradio API"],
    liveUrl: "https://shivam-srivastava-031.github.io/Dev-audio/",
    repoUrl: `${GH}/Dev-audio`,
  },
];

export const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
