"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./textualarchitecture.module.css";

const specs = [
  { label: "Format", value: "Standard" },
  { label: "Typeface", value: "Courier 12pt" },
  { label: "Pacing", value: "1 Min / Page" },
];

/* ══════════════════════════════
   REVEAL ANIMATION HELPERS
   (archive-stills.jsx wale hi pattern se — clip-path directional wipe +
   mask-slide letters, scroll-triggered, inline style se — CSS module
   ko bilkul touch nahi karte)
══════════════════════════════ */
const useRevealVisible = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -2% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
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
  delay = 0,
  as = "div",
  direction = "left",
  duration = 1.1,
  style: extraStyle = {},
}) => {
  const Tag = as;
  const [ref, visible] = useRevealVisible();

  const style = {
    clipPath: visible ? "inset(0 0 0 0)" : clipStart[direction],
    WebkitClipPath: visible ? "inset(0 0 0 0)" : clipStart[direction],
    opacity: visible ? 1 : 0,
    transitionProperty: "clip-path, -webkit-clip-path, opacity",
    transitionDuration: `${duration}s, ${duration}s, 0.1s`,
    transitionTimingFunction: "cubic-bezier(0.83,0,0.17,1)",
    transitionDelay: `${delay}ms`,
    willChange: "clip-path, opacity",
    ...extraStyle,
  };

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
};

/* Character-level mask-slide — sirf badge text ke liye. Heading pe
   letter-split NAHI kiya, kyunki .heading-row span:first-child rule
   sirf 2 top-level word-spans ke beech gap ke liye hai; letter-split
   isko galat trigger kar deta (colortheory mein yahi bug mila tha). */
const RevealLetters = ({ text, delay = 0, step = 16, className = "" }) => {
  const [ref, visible] = useRevealVisible();

  return (
    <span ref={ref} className={className} style={{ display: "inline-block" }}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            lineHeight: 1,
            verticalAlign: "bottom",
          }}
        >
          <i
            style={{
              display: "inline-block",
              fontStyle: "normal",
              transform: visible ? "translateY(0%)" : "translateY(115%)",
              transition: `transform 1.4s cubic-bezier(0.19,1,0.22,1) ${delay + i * step}ms`,
              willChange: "transform",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </i>
        </span>
      ))}
    </span>
  );
};

const TextualArchitecture = () => {
  return (
    <section className={styles["textualarchitecture-main"]}>
      {/* ── HEADER GROUP: badge + heading, apna alag wrap ── */}
      <div className={styles["header-group"]}>
        <Reveal as="div" direction="left" duration={1.2} delay={0} className={styles["top"]}>
          <svg
            className={styles["badge-icon"]}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path
              d="M14 2v5h5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path
              d="M8 12h8M8 15.5h8M8 18.5h5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          <h3>
            <RevealLetters text="[ 01 // Screenplay ]" step={10} />
          </h3>
        </Reveal>

        <h1 className={styles["heading-row"]}>
          <Reveal
            as="span"
            direction="up"
            duration={1.2}
            delay={150}
            className={styles["text-solid"]}
          >
            TEXTUAL
          </Reveal>
          <Reveal
            as="span"
            direction="up"
            duration={1.2}
            delay={300}
            className={styles["text-outline"]}
          >
            ARCHITECTURE
          </Reveal>
        </h1>
      </div>

      {/* ── CONTENT GROUP: text-column + image, apna alag wrap ── */}
      <div className={styles["grid"]}>
        <div className={styles["left-col"]}>
          <Reveal as="h2" direction="up" duration={1} delay={250} className={styles["subheading"]}>
            Dialogue &amp; Direction
          </Reveal>

          <Reveal as="p" direction="up" duration={1} delay={330} className={styles["paragraph"]}>
            Every film starts as formatting. Scene headings. Action
            blocks. Character names. Parentheticals. The Courier Prime
            monospace dictates the rhythm. We treat the script not as
            literature, but as technical documentation for emotional
            payload.
          </Reveal>

          <Reveal as="div" direction="up" duration={1.1} delay={430} className={styles["spec-card"]}>
            {specs.map((spec, index) => (
              <div key={index} className={styles["spec-row"]}>
                <span className={styles["spec-label"]}>{spec.label}</span>
                <span className={styles["spec-value"]}>{spec.value}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal as="div" direction="right" duration={1.3} delay={150} className={styles["right-col"]}>
          <div className={styles["image-wrapper"]}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles["still-image"]}
              src="/images/blueprint/textualarchitecture/textualarchitecture.jpg"
              alt="Handwritten calligraphy script grid"
            />
            <span className={styles["scene-pill"]}>
              EXT. INDUSTRIAL PARK - NIGHT
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default TextualArchitecture;