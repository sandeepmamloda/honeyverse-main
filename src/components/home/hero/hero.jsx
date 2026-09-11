"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./hero.module.css";
import Image from "next/image";

/* ══════════════════════════════
   REVEAL ANIMATION HELPERS — SCROLL BASED
   Ye section ab page ka 1st section nahi hai — ye 3 sections ke baad
   aata hai, isliye page load hote hi ye viewport se bahar hota hai.
   Isliye timer ki jagah IntersectionObserver use kar rahe hain: jab
   user scroll karke section ko dekhta hai, tabhi "ready" true hota hai
   aur reveal animation trigger hoti hai (sirf ek baar).
══════════════════════════════ */
const useInViewOnce = (options = { threshold: 0.25 }) => {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setReady(true);
        observer.unobserve(node);
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return [ref, ready];
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
  const [sectionRef, ready] = useInViewOnce({ threshold: 0.25 });

  return (
    <section ref={sectionRef} className={styles.wrapper}>

      {/* ══ SINGLE BACKGROUND VIDEO — no animation, static ══ */}
      <div className={styles.screen}>
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
      </div>

      {/* ══ HEADLINE — only text animates ═══════════════ */}
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

      {/* ══ FOOTER — no animation, static ═══════════════ */}
      <footer className={styles.bottom}>
        <div className={styles.logoRow}>
          <span className={styles.logoBox}>
            <Image className={styles.logoImg} src="/images/home/c.png" alt="Logo" fill />
          </span>
          <span className={styles.year}>2026</span>
        </div>
      </footer>

    </section>
  );
}