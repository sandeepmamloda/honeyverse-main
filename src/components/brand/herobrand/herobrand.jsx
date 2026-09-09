"use client";
import { useEffect, useState } from "react";
import styles from "./herobrand.module.css";

const headings = [
  { text: "VISUAL", style: "solid" },
  { text: "STORY", style: "outline" },
  { text: "TELLING", style: "solid-alt" },
];

/* ══════════════════════════════
   REVEAL ANIMATION HELPERS — TIMER BASED
   Hero section (page ka first section) hai, isliye scroll-into-view wala
   IntersectionObserver kaam ka nahi — load ke turant baad hi section
   screen pe hota hai. Isliye shared "ready" timer jo load ke 3000ms
   baad true hota hai, uske upar har element ka apna stagger delay.
══════════════════════════════ */
const HERO_START_DELAY = 3000; // ms

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

/* heading.style -> CSS module class */
const styleClassMap = {
  solid: "herobrands-text-solid",
  outline: "herobrands-text-outline",
  "solid-alt": "herobrands-text-solid-alt",
};

const Herobrands = () => {
  const ready = useDelayedReady(HERO_START_DELAY);

  return (
    <section
      className={styles["herobrands-main"]}
      style={{ overflowX: "hidden", overflowY: "hidden" }}
    >
      <div className={styles["herobrands-video-wrapper"]}>
        <video
          className={styles["herobrands-video"]}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/awards/awards.mp4" type="video/mp4" />
        </video>
      </div>

      <div className={styles["herobrands-textual-content"]}>
        {/* Badge + Heading — saath mein center mein */}
        <div className={styles["herobrands-headings-group"]}>
          <Reveal
            as="div"
            ready={ready}
            direction="left"
            duration={1.2}
            delay={0}
            className={styles["herobrands-top"]}
          >
            <h3>[ Our Identity // Vol. 01 ]</h3>
          </Reveal>

          <h1 className={styles["herobrands-heading-row"]}>
            {headings.map((heading, index) => (
              <Reveal
                key={index}
                as="span"
                ready={ready}
                direction="up"
                duration={1.3}
                delay={250 + index * 200}
                className={styles[styleClassMap[heading.style]]}
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
          delay={250 + headings.length * 200 + 200}
          className={styles["herobrands-bottom-last"]}
        >
          <h2>
            We are Film-Makers of emotion, building worlds that capture the
            human experience through the lens of cinema.
          </h2>
        </Reveal>
      </div>
    </section>
  );
};

export default Herobrands;