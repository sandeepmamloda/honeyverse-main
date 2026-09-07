"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./visualmapping.module.css";

const panels = [
  {
    label: "PANEL_01",
    src: "/images/visual-mapping/panel-01.jpg",
    alt: "Storyboard panel one — hand sketching character pose",
  },
  {
    label: "PANEL_02",
    src: "/images/visual-mapping/panel-02.jpg",
    alt: "Storyboard panel two — hand sketching character pose",
  },
  {
    label: "PANEL_03",
    src: "/images/visual-mapping/panel-03.jpg",
    alt: "Storyboard panel three — hand sketching character pose",
  },
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

/* Character-level mask-slide — sirf badge text ke liye */
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

const VisualMapping = () => {
  return (
    <section className={styles["visualmapping-main"]}>
      {/* ── HEADER GROUP: badge + heading + paragraph, right aligned ── */}
      <div className={styles["header-group"]}>
        <Reveal as="div" direction="right" duration={1.2} delay={0} className={styles["top"]}>
          <h3>
            <RevealLetters text="[ 02 // Storyboards ]" step={10} />
          </h3>
          <svg
            className={styles["badge-icon"]}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="3"
              y="3"
              width="7"
              height="7"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <rect
              x="14"
              y="3"
              width="7"
              height="7"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <rect
              x="3"
              y="14"
              width="7"
              height="7"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <rect
              x="14"
              y="14"
              width="7"
              height="7"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.6"
            />
          </svg>
        </Reveal>

        <h1 className={styles["heading-row"]}>
          <Reveal
            as="span"
            direction="up"
            duration={1.2}
            delay={150}
            className={styles["text-solid"]}
          >
            VISUAL
          </Reveal>
          <Reveal
            as="span"
            direction="up"
            duration={1.2}
            delay={300}
            className={styles["text-outline"]}
          >
            MAPPING
          </Reveal>
        </h1>

        <Reveal as="p" direction="up" duration={1} delay={420} className={styles["paragraph"]}>
          Translating text into sequential frames. Establishing
          composition, lens choice, and camera movement before arriving
          on set.
        </Reveal>
      </div>

      {/* ── PANEL GRID ── */}
      <div className={styles["panels-grid"]}>
        {panels.map((panel, index) => (
          <Reveal
            key={panel.label}
            as="div"
            direction="up"
            duration={1.2}
            delay={550 + index * 150}
            className={styles["panel"]}
          >
            <div className={styles["panel-image-wrapper"]}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles["panel-image"]}
                src={panel.src}
                alt={panel.alt}
              />
              <span className={styles["panel-tag"]}>{panel.label}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default VisualMapping;