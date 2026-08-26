"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./graintexture.module.css";

const panels = [
  {
    tag: "T_01 // GRIT",
    src: "/images/moodboard/grain-texture-1.jpg",
    alt: "Cracked textured stone pavement, close-up grain detail",
  },
  {
    tag: "T_02 // COLLAGE",
    src: "/images/moodboard/grain-texture-2.jpg",
    alt: "Fabric swatches, polaroids, and color chips collage",
  },
  {
    tag: "T_03 // GRID_SYS",
    src: "/images/moodboard/grain-texture-3.jpg",
    alt: "Person photographing a mountain landscape",
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

const GrainTexture = () => {
  return (
    <section className={styles["graintexture-main"]}>
      {/* ── HEADER GROUP: badge + heading + paragraph, right aligned ── */}
      <div className={styles["header-group"]}>
        <Reveal direction="up" delay={0}>
          <div className={styles["top"]}>
            <h3>[ 02 // Materiality ]</h3>
            <svg
              className={styles["badge-icon"]}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3 3 8l9 5 9-5-9-5Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path
                d="M3 12l9 5 9-5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path
                d="M3 16l9 5 9-5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Reveal>

        <Reveal direction="up" delay={120}>
          <h1 className={styles["heading-row"]}>
            <span className={styles["text-solid"]}>GRAIN &amp;</span>
            <span className={styles["text-outline"]}>TEXTURE</span>
          </h1>
        </Reveal>

        <Reveal direction="up" delay={220}>
          <p className={styles["paragraph"]}>
            Film is tactile. Identifying the correct grit, noise floor, and
            optical distortions that will physically manifest on the
            sensor.
          </p>
        </Reveal>
      </div>

      {/* ── PANEL GRID (even panels shifted down via margin) ── */}
      <div className={styles["panels-grid"]}>
        {panels.map((panel, index) => (
          <Reveal
            key={panel.tag}
            direction="up"
            delay={300 + index * 120}
            className={styles["panel"]}
          >
            <div className={styles["panel-image-wrapper"]}>
              <span className={styles["panel-tag"]}>{panel.tag}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles["panel-image"]}
                src={panel.src}
                alt={panel.alt}
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default GrainTexture;