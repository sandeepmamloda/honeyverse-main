"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./heronews.module.css";

const headings = [
  { text: "THE", style: "solid" },
  { text: "NEWS", style: "outline" },
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

const Heronews = () => {
  return (
    <section className={styles["heronews-main"]}>
      <div className={styles["heronews-video-wrapper"]}>
        <video
          className={styles["news-video"]}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/news/news.mp4" type="video/mp4" />
        </video>
      </div>

      <div className={styles["textual-content"]}>
        {/* Badge + Heading — saath mein center mein */}
        <div className={styles["headings-group"]}>
          <Reveal direction="up" delay={0}>
            <div className={styles["top"]}>
              <h3>SYS.DOC.000 // CORE_DIRECTIVE</h3>
            </div>
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
              Interviews, press releases, and editorial profiles. The public facing documentation of our internal architecture.
            </h2>
          </Reveal>
        </div>

      </div>
    </section>
  );
};

export default Heronews;