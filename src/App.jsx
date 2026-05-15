import "./App.css";
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lines = [
  { text: "The elbow bump spread faster than most branding campaigns ever will.", visual: "💪", note: "gesture as protocol" },
  { text: "No rollout deck. No brand guidelines. No universal language committee.", visual: "📄", note: "anti-system system" },
  { text: "Just bodies, fear, repetition, media, imitation.", visual: "🦠", note: "pressure makes language" },
  { text: "Esperanto was designed to be universal.", visual: "🗣️", note: "designed universality" },
  { text: "The elbow bump became universal because it was needed.", visual: "🤜", note: "emergent behaviour" },
  { text: "That difference matters.", visual: "⚠️", note: "small sentence, big hinge" },
  { text: "Some things become global because they are useful under pressure.", visual: "🌍", note: "distributed by necessity" },
  { text: "Others get pushed through platforms, devices, systems, defaults.", visual: "📱", note: "distributed by infrastructure" },
  { text: "The U2 album appearing on every iPhone was not really about U2.", visual: "🎧", note: "culture pretending to be a gift" },
  { text: "It was about suddenly realising the device in your pocket was not fully yours.", visual: "🔓", note: "ownership glitch"},
  { text: "A gift becomes invasive the second it removes choice.", visual: "🎁", note: "consent is the interface" },
  { text: "I think I’m writing about how behaviour becomes infrastructure.", visual: "✍️", note: "visual notes in progress" },
];

function useTypewriter(text, speed = 60) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;

    const interval = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayed;
}

export default function App() {
  const [index, setIndex] = useState(0);
  const [isAuto, setIsAuto] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [gridOn, setGridOn] = useState(true);

  const current = lines[index];
  const typed = useTypewriter(current.text, 90);

  const storyFill = useMemo(() => {
    return ((index + 1) / lines.length) * 100;
  }, [index]);

  useEffect(() => {
    if (!isAuto) return;

    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % lines.length);
    }, current.text.length * 140 + 2800);

    return () => clearTimeout(timer);
  }, [index, current.text, isAuto]);

const nextLine = () => {
  setIndex((prev) => (prev + 1) % lines.length);
};

const prevLine = () => {
  setIndex((prev) => (prev - 1 + lines.length) % lines.length);
};

  return (
    <main className={theme}>
      {gridOn && <div className="grid" />}

      <div className="shell">
        <header className="header">
          <div>
            <div className="kicker">VISUAL NOTES · IN CONSTRUCTION 🚧</div>
            <h1 className="title">Behaviour becomes infrastructure</h1>
          </div>

          <div className="controls-top">
            <button
              type="button"
              className={`theme-dot grid-dot-button ${gridOn ? "active" : ""}`}
              onClick={() => setGridOn((v) => !v)}
              aria-label="toggle grid"
            />

            <button
              type="button"
              className={`theme-dot black-dot ${theme === "dark" ? "active" : ""}`}
              onClick={() => setTheme("dark")}
              aria-label="black background"
            />

            <button
              type="button"
              className={`theme-dot white-dot ${theme === "light" ? "active" : ""}`}
              onClick={() => setTheme("light")}
              aria-label="white background"
            />

            <button
              type="button"
              className={`theme-dot reflective-dot-button ${theme === "reflective" ? "active" : ""}`}
              onClick={() => setTheme("reflective")}
              aria-label="gradient background"
            />

            <button
              type="button"
              className="pause-button"
              onClick={() => setIsAuto((v) => !v)}
              aria-label="pause or play"
            >
              {isAuto ? "II" : "›"}
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
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
              >
                <div className="emoji">{current.visual}</div>
                <div className="note">{current.note}</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <footer className="footer">
          <div className="story-progress">
            {lines.map((_, i) => (
              <div key={i} className="story-segment">
                <motion.div
                  className="story-fill"
                  animate={{
                    width: i < index ? "100%" : i === index ? "100%" : "0%",
                  }}
                  transition={{
                    duration: i === index ? 0.6 : 0.15,
                  }}
                />
              </div>
            ))}
          </div>

          <div className="footer-row">
            <div className="counter">
              <strong>{String(index + 1).padStart(2, "0")}</strong>
              {" / "}
              {String(lines.length).padStart(2, "0")}
            </div>

            <a
              className="site-link"
              href="https://www.hughesjoseph.com"
              target="_blank"
              rel="noreferrer"
            >
              hughesjoseph.com
            </a>

            <div className="buttons">
              <button type="button" onClick={prevLine} aria-label="previous">
                ‹
              </button>

              <button type="button" onClick={nextLine} aria-label="next">
                ›
              </button>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}