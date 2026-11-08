import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface TerminalLine {
  id: number;
  type: "input" | "output" | "system";
  content: string;
}

const COMMANDS: Record<string, string[]> = {
  help: [
    "Available commands:",
    "",
    "  about      Who I am",
    "  projects   Featured work",
    "  skills     Tech stack",
    "  contact    Get in touch",
    "  clear      Clear terminal",
    "  help       Show this message",
  ],
  about: [
    "┌─ About ─────────────────────────────────────────┐",
    "│                                                  │",
    "│  Rohith Gowda S.                                 │",
    "│  Full-Stack Developer & AI Engineer               │",
    "│                                                  │",
    "│  BCA, Computer Applications                      │",
    "│  NMIT Bangalore · 2022–2025                      │",
    "│                                                  │",
    "│  Building local LLM tools, ML regression         │",
    "│  models, and full-stack web applications.         │",
    "│                                                  │",
    "└──────────────────────────────────────────────────┘",
  ],
  projects: [
    "┌─ Projects ───────────────────────────────────────┐",
    "│                                                  │",
    "│  ★ HumanIntent              [FLAGSHIP]           │",
    "│    Intent-preserving adaptive prompt optimizer    │",
    "│    Local Ollama/Llama 3 · 442/442 tests passed   │",
    "│                                                  │",
    "│  ◆ Food Delivery Time Predictor     [LIVE]       │",
    "│    ML-based ETA prediction · ~45k records         │",
    "│    Haversine distance + Scikit-learn Pipeline     │",
    "│                                                  │",
    "│  ◆ LocalLens                        [LIVE]       │",
    "│    Aspect-based restaurant sentiment analyzer     │",
    "│    5 aspects · VADER + clause splitting           │",
    "│                                                  │",
    "└──────────────────────────────────────────────────┘",
  ],
  skills: [
    "┌─ Skills ─────────────────────────────────────────┐",
    "│                                                  │",
    "│  Programming    Python · TypeScript · JavaScript  │",
    "│  AI / ML        Ollama · Llama 3 · Scikit-learn  │",
    "│                 VADER · NLP · Prompt Engineering  │",
    "│  Frameworks     React · Next.js · FastAPI         │",
    "│                 Streamlit                         │",
    "│  Data & Tools   Pandas · NumPy · Git · SQLite    │",
    "│                                                  │",
    "└──────────────────────────────────────────────────┘",
  ],
  contact: [
    "┌─ Contact ────────────────────────────────────────┐",
    "│                                                  │",
    "│  ✉  rohithmohith78@gmail.com                     │",
    "│  ◆  github.com/Rohith1833                        │",
    "│                                                  │",
    "└──────────────────────────────────────────────────┘",
  ],
};

const WELCOME_LINES: TerminalLine[] = [
  {
    id: 0,
    type: "system",
    content: "Welcome to Spidey Terminal v2.1 — Type 'help' to get started.",
  },
];

let lineId = 1;
function nextId() {
  return lineId++;
}

export function InteractiveTerminal() {
  const prefersReducedMotion = useReducedMotion();
  const [lines, setLines] = useState<TerminalLine[]>(WELCOME_LINES);
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);

  // Auto-scroll the terminal's internal container only on user interaction (never on initial mount)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const inputLine: TerminalLine = {
      id: nextId(),
      type: "input",
      content: cmd.trim(),
    };

    if (trimmed === "clear") {
      setLines([]);
      return;
    }

    const response = COMMANDS[trimmed];
    const outputLines: TerminalLine[] = response
      ? response.map((line) => ({ id: nextId(), type: "output" as const, content: line }))
      : [
          {
            id: nextId(),
            type: "output" as const,
            content: `Command not found: '${cmd.trim()}'. Type 'help' for available commands.`,
          },
        ];

    setLines((prev) => [...prev, inputLine, ...outputLines]);
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const scrollContainerStyle: React.CSSProperties = {
    maxHeight: "400px",
    overflowY: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: "#eb4a42 rgba(255,255,255,0.05)",
  };

  return (
    <div
      className="glass-card w-full overflow-hidden"
      onClick={focusInput}
      style={{ cursor: "text" }}
    >
      {/* ── Terminal header bar ── */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span
          className="inline-block h-3 w-3 rounded-full"
          style={{ backgroundColor: "#ff5f57" }}
        />
        <span
          className="inline-block h-3 w-3 rounded-full"
          style={{ backgroundColor: "#febc2e" }}
        />
        <span
          className="inline-block h-3 w-3 rounded-full"
          style={{ backgroundColor: "#28c840" }}
        />
        <span
          className="ml-3 select-none font-mono text-xs tracking-wide"
          style={{ color: "#888" }}
        >
          rohith@spidey-v2 ~ %
        </span>
      </div>

      {/* ── Terminal body ── */}
      <div ref={containerRef} className="p-4" style={scrollContainerStyle}>
        {lines.map((line) => (
          <div key={line.id} className="font-mono leading-relaxed">
            {line.type === "input" ? (
              <div className="flex gap-2 text-sm">
                <span style={{ color: "#28c840" }}>❯</span>
                <span style={{ color: "#ccc" }}>{line.content}</span>
              </div>
            ) : line.type === "system" ? (
              <p
                className="text-sm"
                style={{ color: "#eb4a42", opacity: 0.9 }}
              >
                {line.content}
              </p>
            ) : (
              <p className="whitespace-pre text-sm" style={{ color: "#a0a0a0" }}>
                {line.content}
              </p>
            )}
          </div>
        ))}

        {/* ── Input line ── */}
        <div className="mt-1 flex items-center gap-2 font-mono text-sm">
          <span style={{ color: "#28c840" }}>❯</span>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              spellCheck={false}
              autoComplete="off"
              className="w-full border-none bg-transparent font-mono text-sm outline-none"
              style={{ color: "#ccc", caretColor: "transparent" }}
              aria-label="Terminal input"
            />
            {/* Custom blinking cursor */}
            <motion.span
              className="pointer-events-none absolute top-0 inline-block"
              style={{
                left: `${input.length * 0.6}em`,
                width: "8px",
                height: "1.2em",
                backgroundColor: isFocused ? "#eb4a42" : "transparent",
              }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: [1, 0, 1] }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                      duration: 0.9,
                      repeat: Infinity,
                      ease: "linear",
                    }
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
