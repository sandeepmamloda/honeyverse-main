"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./heromoodboards.module.css";

const headings = [
  { text: "MOOD", style: "solid" },
  { text: "BOARDS", style: "outline" },
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

const Heromoodboard = ({ onReturnToGallery }) => {
  return (
    <section className={styles["heromoodboard-main"]}>
      <div className={styles["heromoodboard-image-wrapper"]}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles["moodboard-bg"]}
          src="/images/moodboard/heromoodboard.jpg"
          alt="Pink and teal sunset clouds"
        />
        <div className={styles["moodboard-overlay"]} />
      </div>

      <div className={styles["textual-content"]}>
        {/* Return link + Heading — saath mein group */}
        <div className={styles["headings-group"]}>
          <Reveal direction="up" delay={0}>
            <button
              type="button"
              onClick={onReturnToGallery}
              className={styles["return-link"]}
            >
              <span className={styles["return-arrow"]}>&larr;</span>
              <span>[ RETURN_TO_GALLERY ]</span>
            </button>
          </Reveal>

          <Reveal direction="up" delay={150}>
            <h1 className={styles["heading-row"]}>
              {headings.map((heading, index) => (
                <span
                  key={index}
                  className={
                    heading.style === "outline"
                      ? styles["text-outline"]
                      : styles["text-solid"]
                  }
                >
                  {heading.text}
                </span>
              ))}
            </h1>
          </Reveal>
        </div>

        {/* Description box — bottom pe */}
        <div className={styles["bottom-last"]}>
          <Reveal direction="up" delay={300}>
            <h2>
              Visual frequencies and tonal anchors. Aggregating texture,
              color, and light to establish the exact psychological space
              of a film before production begins.
            </h2>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Heromoodboard;