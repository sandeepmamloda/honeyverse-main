"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./textualarchitecture.module.css";

const specs = [
  { label: "Format", value: "Standard" },
  { label: "Typeface", value: "Courier 12pt" },
  { label: "Pacing", value: "1 Min / Page" },
];

/* Fades an element into place the first time it scrolls into view.
   direction: "up" (fade + rise), "left" (fade in from the left),
   "right" (fade in from the right). `delay` (ms) staggers siblings. */
const Reveal = ({
  children,
  className = "",
  delay = 0,
  as = "div",
  direction = "up",
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const Tag = as;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const directionClass =
    direction === "left"
      ? styles["reveal-left"]
      : direction === "right"
      ? styles["reveal-right"]
      : styles["reveal-up"];

  return (
    <Tag
      ref={ref}
      className={`${className} ${directionClass} ${
        visible ? styles["reveal-visible"] : ""
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

const TextualArchitecture = () => {
  return (
    <section className={styles["textualarchitecture-main"]}>
      {/* ── HEADER GROUP: badge + heading, apna alag wrap ── */}
      <div className={styles["header-group"]}>
        <Reveal direction="up" delay={0}>
          <div className={styles["top"]}>
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
            <h3>[ 01 // Screenplay ]</h3>
          </div>
        </Reveal>

        <Reveal direction="up" delay={120}>
          <h1 className={styles["heading-row"]}>
            <span className={styles["text-solid"]}>TEXTUAL</span>
            <span className={styles["text-outline"]}>ARCHITECTURE</span>
          </h1>
        </Reveal>
      </div>

      {/* ── CONTENT GROUP: text-column + image, apna alag wrap ── */}
      <div className={styles["grid"]}>
        <div className={styles["left-col"]}>
          <Reveal direction="up" delay={220}>
            <h2 className={styles["subheading"]}>Dialogue &amp; Direction</h2>
          </Reveal>

          <Reveal direction="up" delay={300}>
            <p className={styles["paragraph"]}>
              Every film starts as formatting. Scene headings. Action
              blocks. Character names. Parentheticals. The Courier Prime
              monospace dictates the rhythm. We treat the script not as
              literature, but as technical documentation for emotional
              payload.
            </p>
          </Reveal>

          <Reveal direction="up" delay={400}>
            <div className={styles["spec-card"]}>
              {specs.map((spec, index) => (
                <div key={index} className={styles["spec-row"]}>
                  <span className={styles["spec-label"]}>{spec.label}</span>
                  <span className={styles["spec-value"]}>{spec.value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal direction="right" delay={150} className={styles["right-col"]}>
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