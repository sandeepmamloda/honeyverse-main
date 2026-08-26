"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./colortheory.module.css";

const swatches = [
  { hex: "#FFFFFF", label: "Harsh White", bg: "transparent", hexColor: "rgba(255,202,26,1)" },
  { hex: "#18181B", label: "Magenta", bg: "rgba(196,0,83,1)", hexColor: "rgba(255,255,255,1)" },
  { hex: "#FF7722", label: "Dark Pink", bg: "rgba(217,24,106,1)", hexColor: "rgba(0,0,0,1)" },
  { hex: "#FFCA1A", label: "Harsh Yellow", bg: "rgba(255,202,26,1)", hexColor: "rgba(0,0,0,1)" },
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

const ColorTheory = () => {
  return (
    <section className={styles["colortheory-main"]}>
      {/* ── HEADER GROUP: badge + heading, left aligned ── */}
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
            <h3>[ 01 // Chromatic_Index ]</h3>
          </div>
        </Reveal>

        <Reveal direction="up" delay={120}>
          <h1 className={styles["heading-row"]}>
            <span className={styles["text-solid"]}>COLOR</span>
            <span className={styles["text-outline"]}>THEORY</span>
          </h1>
        </Reveal>
      </div>

      {/* ── CONTENT GROUP: image + text-column ── */}
      <div className={styles["grid"]}>
        <Reveal direction="left" delay={150} className={styles["left-col"]}>
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
          <Reveal direction="up" delay={220}>
            <h2 className={styles["subheading"]}>The Saffron Protocol</h2>
          </Reveal>

          <Reveal direction="up" delay={300}>
            <p className={styles["paragraph"]}>
              High contrast true blacks punctuated by sharp hits of
              industrial amber. This restriction forces composition to rely
              on luminance and geometric tension rather than mere color
              separation.
            </p>
          </Reveal>

          <Reveal direction="up" delay={400}>
            <div className={styles["swatch-row"]}>
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
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ColorTheory;