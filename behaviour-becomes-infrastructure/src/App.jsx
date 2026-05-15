* {
  box-sizing: border-box;
}

html,
body,
#root {
  margin: 0;
  width: 100%;
  min-height: 100%;
  font-family: Helvetica, Arial, sans-serif;
}

body {
  overflow: auto;
}

.page {
  width: 100vw;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.dark {
  background: #0a0a0a;
  color: #ffffff;
}

.light {
  background: #f5f5f5;
  color: #111111;
}

.grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(128,128,128,0.16) 1px, transparent 1px),
    linear-gradient(90deg, rgba(128,128,128,0.16) 1px, transparent 1px);
  background-size: 40px 40px;
}

.shell {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.topbar,
.footer-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.kicker {
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0.55;
  margin-bottom: 12px;
}

h1 {
  font-size: 22px;
  margin: 0;
  font-weight: 500;
}

.stage {
  flex: 1;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 56px;
  align-items: center;
}

.text-area {
  text-align: left;
  font-size: clamp(38px, 6.2vw, 104px);
  line-height: 0.96;
  letter-spacing: -0.06em;
  font-weight: 600;
  max-width: 920px;
  min-height: 3em;
}

.cursor {
  opacity: 0.7;
  animation: blink 1s infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

.emoji-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.emoji {
  font-size: clamp(110px, 18vw, 280px);
  line-height: 1;
}

.pill {
  margin-top: 12px;
  background: currentColor;
  color: inherit;
  filter: invert(1);
  padding: 10px 16px;
  border-radius: 999px;
  font-size: 14px;
  white-space: nowrap;
}

.top-buttons,
.nav-buttons {
  display: flex;
  gap: 10px;
}

button {
  border: 1px solid currentColor;
  background: transparent;
  color: inherit;
  border-radius: 999px;
  padding: 10px 18px;
  cursor: pointer;
  font: inherit;
  opacity: 0.78;
}

.footer {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.progress {
  width: 100%;
  height: 4px;
  background: rgba(128,128,128,0.25);
  border-radius: 999px;
  overflow: hidden;
}

.progress-inner {
  height: 100%;
  background: currentColor;
}

.counter {
  opacity: 0.5;
}

@media (max-width: 900px) {
  .shell {
    padding: 24px;
  }

  .stage {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .text-area {
    font-size: clamp(42px, 13vw, 78px);
  }

  .emoji {
    font-size: clamp(100px, 36vw, 190px);
  }
}