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

const VisualMapping = () => {
  return (
    <section className={styles["visualmapping-main"]}>
      {/* ── HEADER GROUP: badge + heading + paragraph, right aligned ── */}
      <div className={styles["header-group"]}>
        <Reveal direction="up" delay={0}>
          <div className={styles["top"]}>
            <h3>[ 02 // Storyboards ]</h3>
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
          </div>
        </Reveal>

        <Reveal direction="up" delay={120}>
          <h1 className={styles["heading-row"]}>
            <span className={styles["text-solid"]}>VISUAL</span>
            <span className={styles["text-outline"]}>MAPPING</span>
          </h1>
        </Reveal>

        <Reveal direction="up" delay={220}>
          <p className={styles["paragraph"]}>
            Translating text into sequential frames. Establishing
            composition, lens choice, and camera movement before arriving
            on set.
          </p>
        </Reveal>
      </div>

      {/* ── PANEL GRID ── */}
      <div className={styles["panels-grid"]}>
        {panels.map((panel, index) => (
          <Reveal
            key={panel.label}
            direction="up"
            delay={300 + index * 120}
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