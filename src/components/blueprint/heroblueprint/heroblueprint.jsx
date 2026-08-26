"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./heroblueprint.module.css";

const headings = [
  { text: "THE", style: "solid" },
  { text: "BLUEPRINTS", style: "outline" },
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

const Heroblueprint = ({ onReturnToGallery }) => {
  return (
    <section className={styles["heroblueprint-main"]}>
      <div className={styles["heroblueprint-image-wrapper"]}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles["blueprint-bg"]}
          src="/images/blueprint/heroblueprint/heroblueprint.jpg"
          alt="Sunset clouds"
        />
        <div className={styles["blueprint-overlay"]} />
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
              Defining the optical vocabulary. A meticulous exploration of
              color science, structural framing, and raw cinematic texture.
            </h2>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Heroblueprint;