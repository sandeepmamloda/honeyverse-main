"use client";

import { useEffect, useState } from "react";
import styles from "./homeservices.module.css";

const headings = [
  { text: "SYSTEM", style: "solid" },
  { text: "SERVICES", style: "outline" },
];

/* ══════════════════════════════
   REVEAL ANIMATION HELPERS — TIMER BASED
   Ye hero section hai (page ka first section), isliye scroll-into-view
   wala IntersectionObserver yaha kaam ka nahi — page load ke turant baad
   hi section screen pe hota hai. Isliye ek shared "ready" timer use karte
   hain jo load ke 3000ms baad true hota hai, aur uske upar har element ka
   apna stagger delay hota hai.
══════════════════════════════ */
const HERO_START_DELAY = 3000; // ms — page load ke kitni der baad animation shuru ho

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

const Heroservices = () => {
  const ready = useDelayedReady(HERO_START_DELAY);

  return (
    <section className={styles["heroservices-main"]}>
      <div className={styles["heroservices-video-wrapper"]}>
        <video
          className={styles["services-video"]}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/awards/awards.mp4" type="video/mp4" />
        </video>
      </div>

      <div className={styles["textual-content"]}>
        {/* Badge + Heading — saath mein center mein */}
        <div className={styles["headings-group"]}>
          <Reveal
            as="div"
            ready={ready}
            direction="left"
            duration={1.2}
            delay={0}
            className={styles["top"]}
          >
            <h3>[ Archive // Vol. 05 ]</h3>
          </Reveal>

          {/* Single h1 — multiple spans (heroawards jaisa pattern) */}
          <h1 className={styles["heading-row"]}>
            {headings.map((heading, index) => (
              <Reveal
                key={index}
                as="span"
                ready={ready}
                direction="up"
                duration={1.3}
                delay={250 + index * 200}
                className={
                  heading.style === "outline"
                    ? styles["bottom"] // outline style — transparent fill + pink stroke
                    : styles["middle"]
                }
              >
                {heading.text}
              </Reveal>
            ))}
          </h1>
        </div>

        {/* Description box — bottom pe */}
        <Reveal
          as="div"
          ready={ready}
          direction="up"
          duration={1.3}
          delay={700}
          className={styles["bottom-last"]}
        >
          <h2>
            Our operational capabilities. From high-end cinematic
            acquisition to turnkey packaging and strategic co-productions.
          </h2>
        </Reveal>
      </div>
    </section>
  );
};

export default Heroservices;