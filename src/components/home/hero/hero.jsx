"use client";

import { useEffect, useState } from "react";
import styles from "./hero.module.css";
import Image from "next/image";

/* ══════════════════════════════
   REVEAL ANIMATION HELPERS — TIMER BASED
   Ye bhi hero section hai (page ka first section), isliye scroll-into-view
   wala IntersectionObserver yaha kaam ka nahi — page load ke turant baad
   hi section screen pe hota hai. Isliye ek shared "ready" timer use karte
   hain jo load ke thodi der baad true hota hai, aur uske upar har element
   ka apna stagger delay hota hai.
══════════════════════════════ */
const HERO_START_DELAY = 100; // ms — page load ke kitni der baad animation shuru ho

const useDelayedReady = (delayMs = HERO_START_DELAY) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  return ready;
};

const clipStart = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  up: "inset(100% 0 0 0)",
  down: "inset(0 0 100% 0)",
};

const Reveal = ({
  children,
  className = "",
  ready = false,
  delay = 0,
  as = "div",
  direction = "left",
  duration = 1.1,
  style: extraStyle = {},
}) => {
  const Tag = as;

  const style = {
    clipPath: ready ? "inset(0 0 0 0)" : clipStart[direction],
    WebkitClipPath: ready ? "inset(0 0 0 0)" : clipStart[direction],
    opacity: ready ? 1 : 0,
    transitionProperty: "clip-path, -webkit-clip-path, opacity",
    transitionDuration: `${duration}s, ${duration}s, 0.1s`,
    transitionTimingFunction: "cubic-bezier(0.83,0,0.17,1)",
    transitionDelay: `${delay}ms`,
    willChange: "clip-path, opacity",
    ...extraStyle,
  };

  return (
    <Tag className={className} style={style}>
      {children}
    </Tag>
  );
};

const headlineWords = ["ENTER", "THE", "VERSE"];

export default function Hero() {
  const ready = useDelayedReady(HERO_START_DELAY);

  return (
    <section className={styles.wrapper}>

      {/* ══ SINGLE BACKGROUND VIDEO ════════════════════ */}
      <Reveal
        as="div"
        ready={ready}
        direction="up"
        duration={1.4}
        delay={0}
        className={styles.screen}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={styles.bg}
        >
          <source src="/videos/home/first.mp4" type="video/mp4" />
        </video>
        <div className={styles.vignette} />
      </Reveal>

      {/* ══ HEADLINE ═══════════════════════════════════ */}
      <div className={styles.headline}>
        <h1 className={styles.h1}>
          {headlineWords.map((word, index) => (
            <Reveal
              key={word}
              as="span"
              ready={ready}
              direction="up"
              duration={1.2}
              delay={250 + index * 200}
            >
              {word}
            </Reveal>
          ))}
        </h1>

        <Reveal
          as="p"
          ready={ready}
          direction="up"
          duration={1.2}
          delay={900}
          className={styles.sub}
        >
          An award winning production company that creates high-impact content that's impossible to ignore.
        </Reveal>
      </div>

      {/* ══ FOOTER ═════════════════════════════════════ */}
      <Reveal
        as="footer"
        ready={ready}
        direction="up"
        duration={1}
        delay={1200}
        className={styles.bottom}
      >
        <div className={styles.logoRow}>
          <span className={styles.logoBox}>
            <Image className={styles.logoImg} src="/images/home/c.png" alt="Logo" fill />
          </span>
          <span className={styles.year}>2026</span>
        </div>
      </Reveal>

    </section>
  );
}