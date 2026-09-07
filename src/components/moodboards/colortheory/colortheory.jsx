"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./colortheory.module.css";

const swatches = [
  { hex: "#FFFFFF", label: "Harsh White", bg: "transparent", hexColor: "rgba(255,202,26,1)" },
  { hex: "#18181B", label: "Magenta", bg: "rgba(196,0,83,1)", hexColor: "rgba(255,255,255,1)" },
  { hex: "#FF7722", label: "Dark Pink", bg: "rgba(217,24,106,1)", hexColor: "rgba(0,0,0,1)" },
  { hex: "#FFCA1A", label: "Harsh Yellow", bg: "rgba(255,202,26,1)", hexColor: "rgba(0,0,0,1)" },
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

/* Character-level mask-slide — sirf badge text ke liye use hota hai
   (.heading-row span:first-child jaisa koi CSS rule badge pe nahi hai,
   isliye yaha letter-split safe hai) */
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

const ColorTheory = () => {
  return (
    <section className={styles["colortheory-main"]}>
      {/* ── HEADER GROUP: badge + heading, left aligned ── */}
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
              d="M12 3a9 9 0 1 0 0 18c1.1 0 1.7-.9 1.2-1.85-.25-.47-.2-1.05.2-1.4.35-.32.83-.4 1.28-.28C17.4 17.9 21 16.1 21 12a9 9 0 0 0-9-9Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <circle cx="7.5" cy="11" r="1.4" fill="currentColor" />
            <circle cx="10.2" cy="7" r="1.4" fill="currentColor" />
            <circle cx="15" cy="7.5" r="1.4" fill="currentColor" />
            <circle cx="17" cy="12.2" r="1.4" fill="currentColor" />
          </svg>
          <h3>
            <RevealLetters text="[ 01 // Chromatic_Index ]" step={10} />
          </h3>
        </Reveal>

        {/* Heading ab poore-word clip-wipe se animate hoti hai —
            letter-split nahi, kyunki CSS ka `.heading-row span:first-child`
            rule sirf 2 top-level word-spans ke beech gap ke liye hai;
            letter-split ne isko galat trigger kar diya tha */}
        <h1 className={styles["heading-row"]}>
          <Reveal
            as="span"
            direction="up"
            duration={1.2}
            delay={150}
            className={styles["text-solid"]}
          >
            COLOR
          </Reveal>
          <Reveal
            as="span"
            direction="up"
            duration={1.2}
            delay={300}
            className={styles["text-outline"]}
          >
            THEORY
          </Reveal>
        </h1>
      </div>

      {/* ── CONTENT GROUP: image + text-column ── */}
      <div className={styles["grid"]}>
        <Reveal as="div" direction="left" duration={1.3} delay={150} className={styles["left-col"]}>
          <div className={styles["image-wrapper"]}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles["still-image"]}
              src="/images/moodboard/color-theory.jpg"
              alt="Sheer curtain lit room with armchair, warm sunset tones"
            />
            <span className={styles["gradient-pill"]}>GRADIENT_MAP_001</span>
          </div>
        </Reveal>

        <div className={styles["right-col"]}>
          <Reveal as="h2" direction="up" duration={1} delay={250} className={styles["subheading"]}>
            The Saffron Protocol
          </Reveal>

          <Reveal as="p" direction="up" duration={1} delay={330} className={styles["paragraph"]}>
            High contrast true blacks punctuated by sharp hits of
            industrial amber. This restriction forces composition to rely
            on luminance and geometric tension rather than mere color
            separation.
          </Reveal>

          <Reveal as="div" direction="up" duration={1.1} delay={430} className={styles["swatch-row"]}>
            {swatches.map((swatch, index) => (
              <div key={index} className={styles["swatch-col"]}>
                <div
                  className={styles["swatch-box"]}
                  style={{ background: swatch.bg }}
                >
                  <span
                    className={styles["swatch-hex"]}
                    style={{ color: swatch.hexColor }}
                  >
                    {swatch.hex}
                  </span>
                </div>
                <span className={styles["swatch-label"]}>
                  {swatch.label}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ColorTheory;