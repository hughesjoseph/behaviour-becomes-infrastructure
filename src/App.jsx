import "./App.css";
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lines = [
  {
    text: "The elbow bump spread faster than most branding campaigns ever will.",
    visual: "💪",
    note: "gesture as protocol",
  },
  {
    text: "No rollout deck. No brand guidelines. No universal language committee.",
    visual: "📄",
    note: "anti-system system",
  },
  {
    text: "Just bodies, fear, repetition, media, imitation.",
    visual: "🦠",
    note: "pressure makes language",
  },
  {
    text: "Esperanto was designed to be universal.",
    visual: "🗣️",
    note: "designed universality",
  },
  {
    text: "The elbow bump became universal because it was needed.",
    visual: "🤜",
    note: "emergent behaviour",
  },
  {
    text: "That difference matters.",
    visual: "⚠️",
    note: "small sentence, big hinge",
  },
  {
    text: "Some things become global because they are useful under pressure.",
    visual: "🌍",
    note: "distributed by necessity",
  },
  {
    text: "Others get pushed through platforms, devices, systems, defaults.",
    visual: "📱",
    note: "distributed by infrastructure",
  },
  {
    text: "The U2 album appearing on every iPhone was not really about U2.",
    visual: "🎧",
    note: "culture pretending to be a gift",
  },
  {
    text: "It was about suddenly realising the device in your pocket was not fully yours.",
    visual: "🔓",
    note: "ownership glitch",
  },
  {
    text: "A gift becomes invasive the second it removes choice.",
    visual: "🎁",
    note: "consent is the interface",
  },
  {
    text: "Maybe universal design is less interesting than universal behaviour.",
    visual: "👀",
    note: "working thesis",
  },
  {
    text: "Swipe gestures. Loading spinners. QR codes. Floor arrows. Notification dots.",
    visual: "➡️",
    note: "tiny rituals",
  },
  {
    text: "Little learnt movements repeated until they start to feel biological.",
    visual: "🧬",
    note: "behaviour hardens",
  },
  {
    text: "Most systems stay invisible until they break, or get forced upon you.",
    visual: "🕳️",
    note: "infrastructure becomes visible",
  },
  {
    text: "I think I’m writing about how behaviour becomes infrastructure.",
    visual: "✍️",
    note: "visual notes in progress",
  },
];

function useTypewriter(text, speed = 18) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");

    let i = 0;

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i += 1;

      if (i >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayed;
}

export default function App() {
  const [index, setIndex] = useState(0);
  const [isAuto, setIsAuto] = useState(true);
  const [theme, setTheme] = useState("dark");

  const current = lines[index];
  const typed = useTypewriter(current.text, 18);

  useEffect(() => {
    if (!isAuto) return;

    const readingTime = current.text.length * 110 + 2600;

    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % lines.length);
    }, readingTime);

    return () => clearTimeout(timer);
  }, [index, current.text, isAuto]);

  const progress = useMemo(() => {
    return ((index + 1) / lines.length) * 100;
  }, [index]);

  const nextLine = () => {
    setIndex((prev) => (prev + 1) % lines.length);
  };

  const prevLine = () => {
    setIndex((prev) => (prev - 1 + lines.length) % lines.length);
  };

  const cycleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("reflective");
    } else {
      setTheme("dark");
    }
  };

  return (
    <main className={theme}>
      <div className="grid" />

      <div className="shell">
        <header className="header">
          <div>
            <div className="kicker">
              VISUAL NOTES · IN CONSTRUCTION 🚧
            </div>

            <h1 className="title">
              Behaviour becomes infrastructure
            </h1>
          </div>

          <div className="controls-top">
            <button
              className="theme-toggle"
              onClick={cycleTheme}
            >
              <span className="dot grid-dot" />
              <span className="dot black-dot" />
              <span className="dot white-dot" />
              <span className="dot reflective-dot" />
            </button>

            <button
              className="minimal-button"
              onClick={() => setIsAuto((v) => !v)}
            >
              {isAuto ? "II" : "▶"}
            </button>
          </div>
        </header>

        <section className="stage">
          <div className="text-wrap">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-area">
                  {typed}
                  <span className="cursor">|</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="visual-wrap">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.visual}
                className="visual-inner"
                initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.2, rotate: 6 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 14,
                }}
              >
                <div className="emoji">
                  {current.visual}
                </div>

                <div className="note">
                  {current.note}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <footer className="footer">
          <div className="progress">
            <motion.div
              className="progress-inner"
              animate={{ width: `${progress}%` }}
            />
          </div>

          <div className="footer-row">
            <div className="counter">
              <strong>
                {String(index + 1).padStart(2, "0")}
              </strong>
              {" / "}
              {String(lines.length).padStart(2, "0")}
            </div>

            <div className="buttons">
              <button onClick={prevLine}>
                ←
              </button>

              <button onClick={nextLine}>
                →
              </button>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}