import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type LineData = { code: string; dim?: boolean };
type Snippet = { title: string; badge: string; badgeColor: string; lines: LineData[] };

const SNIPPETS: Snippet[] = [
  {
    title: "analytics_engine.py",
    badge: "Python",
    badgeColor: "#3b82f6",
    lines: [
      { code: "class AnalyticsDashboard:" },
      { code: "    def __init__(self, source):" },
      { code: "        self.db = DataSource(source)" },
      { code: '        self.cache = Redis("prod")' },
      { code: "" },
      { code: "    def fetch_insights(self, rng):" },
      { code: "        df = self.db.query(rng)" },
      { code: "        return (df", dim: true },
      { code: '            .groupby("category")', dim: true },
      { code: '            .agg({"revenue": "sum"}))', dim: true },
    ],
  },
  {
    title: "sales_report.sql",
    badge: "SQL",
    badgeColor: "#f59e0b",
    lines: [
      { code: "SELECT" },
      { code: "  product_category," },
      { code: "  ROUND(SUM(revenue), 2)  AS total," },
      { code: "  COUNT(*)               AS orders," },
      { code: "  ROUND(AVG(revenue), 2) AS avg_val" },
      { code: "FROM   sales_data" },
      { code: "WHERE  status = 'completed'" },
      { code: "  AND  date >= DATE_SUB(NOW(), INTERVAL 3 MONTH)" },
      { code: "GROUP  BY product_category" },
      { code: "ORDER  BY total DESC;" },
    ],
  },
  {
    title: "Dashboard.tsx",
    badge: "React",
    badgeColor: "#06b6d4",
    lines: [
      { code: "const Dashboard = ({ metrics }) => {" },
      { code: '  const [view, setView] = useState("month");' },
      { code: "  const kpis = useMemo(" },
      { code: "    () => computeKPIs(metrics, view)," },
      { code: "  [metrics, view]);" },
      { code: "" },
      { code: "  return (" },
      { code: '    <ChartPanel data={kpis}' },
      { code: '      colors={["#00D4AA","#FFD700"]}' },
      { code: "      onFilter={setView} />" },
    ],
  },
];

const LiveTerminal = () => {
  const [idx, setIdx] = useState(0);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const snippet = SNIPPETS[idx];

  // Reset state when switching to a new snippet
  useEffect(() => {
    setTypedLines([]);
    setLineIdx(0);
    setCharIdx(0);
    setDone(false);
  }, [idx]);

  // Typewriter engine
  useEffect(() => {
    clearTimeout(timer.current);

    if (done) {
      timer.current = setTimeout(() => setIdx((p) => (p + 1) % SNIPPETS.length), 2800);
      return;
    }

    const line = snippet.lines[lineIdx];
    if (!line) return;

    if (charIdx >= line.code.length) {
      // Line fully typed — pause then advance
      timer.current = setTimeout(
        () => {
          setTypedLines((p) => [...p, line.code]);
          const next = lineIdx + 1;
          if (next >= snippet.lines.length) {
            setDone(true);
          } else {
            setLineIdx(next);
            setCharIdx(0);
          }
        },
        line.code === "" ? 60 : 140,
      );
    } else {
      // Type next character
      timer.current = setTimeout(() => setCharIdx((p) => p + 1), 16 + Math.random() * 22);
    }

    return () => clearTimeout(timer.current);
  }, [charIdx, lineIdx, done, snippet, idx]);

  const activeLine = snippet.lines[lineIdx];
  const activeCode = activeLine ? activeLine.code.slice(0, charIdx) : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, delay: 0.15 }}
      className="glass-card rounded-2xl overflow-hidden border border-primary/15"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-card/80 border-b border-border/20">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={`title-${idx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs font-mono text-muted-foreground ml-2 flex-1"
          >
            {snippet.title}
          </motion.span>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.span
            key={`badge-${idx}`}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.2 }}
            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border shrink-0"
            style={{
              color: snippet.badgeColor,
              borderColor: `${snippet.badgeColor}55`,
              background: `${snippet.badgeColor}18`,
            }}
          >
            {snippet.badge}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Code body */}
      <div className="px-4 py-3 font-mono text-[11px] leading-[1.65] min-h-[196px] select-none overflow-hidden">
        {typedLines.map((code, i) => {
          const ld = snippet.lines[i];
          return (
            <div key={i} className="flex gap-3">
              <span className="text-muted-foreground/25 w-5 text-right shrink-0">{i + 1}</span>
              <span className={ld?.dim ? "text-muted-foreground/60" : "text-foreground/90"}>
                {code || " "}
              </span>
            </div>
          );
        })}

        {!done && activeLine && (
          <div className="flex gap-3">
            <span className="text-muted-foreground/25 w-5 text-right shrink-0">{typedLines.length + 1}</span>
            <span className={activeLine.dim ? "text-muted-foreground/60" : "text-foreground/90"}>
              {activeCode}
              <motion.span
                className="inline-block w-[2px] h-[11px] bg-primary align-text-bottom ml-px"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.55, repeat: Infinity, repeatType: "reverse" }}
              />
            </span>
          </div>
        )}

        {done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-1.5 mt-3 ml-8"
          >
            {SNIPPETS.map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-colors duration-500"
                style={{ background: i === idx ? snippet.badgeColor : "rgba(255,255,255,0.12)" }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default LiveTerminal;
