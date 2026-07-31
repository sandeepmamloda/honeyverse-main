"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./teams.module.css";

const headings = [
  { text: "THE", style: "solid" },
  { text: "COLLECTIVE", style: "outline" },
  { text: "VISION", style: "solid-alt" },
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

const Heroteams = () => {
  return (
    <section className={styles["heroteams-main"]}>
      <div className={styles["heroteams-video-wrapper"]}>
        <video
          className={styles["heroteams-video"]}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/awards/awards.mp4" type="video/mp4" />
        </video>
      </div>

      <div className={styles["heroteams-textual-content"]}>
        {/* Badge + Heading — saath mein center mein */}
        <div className={styles["heroteams-headings-group"]}>
          <Reveal direction="up" delay={0}>
            <div className={styles["heroteams-top"]}>
              <h3>[ Our Identity // Vol. 01 ]</h3>
            </div>
          </Reveal>

          <Reveal direction="up" delay={150}>
            <h1 className={styles["heroteams-heading-row"]}>
              {headings.map((heading, index) => (
                <span
                  key={index}
                  className={
                    index === 2
                      ? styles["heroteams-text-solid-alt"] // "TELLING" hamesha solid pink rahega
                      : heading.style === "outline"
                      ? styles["heroteams-text-outline"]
                      : styles["heroteams-text-solid"]
                  }
                >
                  {heading.text}
                </span>
              ))}
            </h1>
          </Reveal>
        </div>

        {/* Description box — bottom pe */}
        <div className={styles["heroteams-bottom-last"]}>
          <Reveal direction="up" delay={300}>
            <h2>
              We are Film-Makers of emotion, building worlds that capture the human experience through the lens of cinema.
            </h2>
          </Reveal>
        </div>

      </div>
    </section>
  );
};

export default Heroteams;