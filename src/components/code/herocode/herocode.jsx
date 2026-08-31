"use client";

import { useEffect, useState } from "react";
import styles from "./herocode.module.css";

const headings = [
  { text: "THE", style: "solid" },
  { text: "CODE", style: "outline" },
];

/* Page-load-timed reveal: short delay after mount (hero is above the fold,
   so scroll-trigger wouldn't fire meaningfully), then reveals with a
   restrained blur-to-focus. Only opacity/transform/filter are touched —
   never width or max-width, so nothing in the CSS module gets overridden. */
const REVEAL_BASE_DELAY = 3000;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)"; /* premium "expo-out" easing */

/* IMPORTANT: Reveal applies the animation directly to the element that
   needs a className (via `as` + `className`) instead of wrapping an
   existing div in another div. Wrapping was creating two nested divs
   for .top / .bottom-last, which is what was throwing the layout off. */
const Reveal = ({
  children,
  className = "",
  delay = 0,
  as = "div",
  direction = "up",
  duration = 1.1,
}) => {
  const Tag = as;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), REVEAL_BASE_DELAY + delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const hiddenTransform =
    direction === "left"
      ? "translateX(-18px)"
      : direction === "right"
      ? "translateX(18px)"
      : "translateY(20px)";

  const style = {
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : hiddenTransform,
    filter: visible ? "blur(0px)" : "blur(4px)",
    transition: `opacity ${duration}s ${EASE}, transform ${duration}s ${EASE}, filter ${duration * 0.8}s ${EASE}`,
    willChange: "opacity, transform, filter",
  };

  return (
    <Tag className={className} style={style}>
      {children}
    </Tag>
  );
};

/* Splits a word into letters, each fading/rising in with its own stagger —
   a tighter, quicker stagger reads as deliberate typesetting rather than
   a sluggish cascade. */
const RevealLetters = ({ text, baseDelay = 0, step = 22, className = "" }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), REVEAL_BASE_DELAY + baseDelay);
    return () => clearTimeout(timer);
  }, [baseDelay]);

  return (
    <span className={className} style={{ display: "inline-flex" }}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(14px)",
            filter: visible ? "blur(0px)" : "blur(3px)",
            transition: `opacity 0.7s ${EASE}, transform 0.7s ${EASE}, filter 0.55s ${EASE}`,
            transitionDelay: `${i * step}ms`,
            willChange: "opacity, transform, filter",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

const Herocode = () => {
  return (
    /* overflow guard on the section only — doesn't touch any element's
       own width/max-width, so .bottom-last keeps its CSS-defined 40rem cap */
    <section
      className={styles["herocode-main"]}
      aria-label="Our core production philosophy"
      style={{ overflowX: "hidden", overflowY: "hidden" }}
    >
      <div className={styles["herocode-video-wrapper"]}>
        {/* Decorative background video — aria-hidden keeps it out of
            the accessibility tree without changing anything visual */}
        <video
          className={styles["code-video"]}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src="/videos/code/code.mp4" type="video/mp4" />
        </video>
      </div>

      <div className={styles["textual-content"]}>
        {/* Badge + Heading — saath mein center mein */}
        <div className={styles["headings-group"]}>
          <Reveal as="div" direction="up" delay={0} duration={0.9} className={styles["top"]}>
            <h3>SYS.DOC.000 // CORE_DIRECTIVE</h3>
          </Reveal>

          <h1 className={styles["heading-row"]} style={{ overflow: "hidden" }}>
            {headings.map((heading, index) => (
              <RevealLetters
                key={index}
                text={heading.text}
                baseDelay={200 + index * 180}
                step={22}
                className={
                  heading.style === "outline"
                    ? styles["text-outline"]
                    : styles["text-solid"]
                }
              />
            ))}
          </h1>
        </div>

        {/* Description box — bottom pe */}
        <Reveal
          as="div"
          direction="up"
          delay={550}
          duration={1}
          className={styles["bottom-last"]}
        >
          <h2>
            We do not compromise. We build structural integrity into narrative. These are the fundamental laws governing our production architecture.
          </h2>
        </Reveal>

      </div>
    </section>
  );
};

export default Herocode;