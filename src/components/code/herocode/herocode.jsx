"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./herocode.module.css";

const headings = [
  { text: "THE", style: "solid" },
  { text: "CODE", style: "outline" },
];

/* Page-load-timed reveal: short delay after mount (hero is above the fold,
   so scroll-trigger wouldn't fire meaningfully), then reveals with a
   clip-path wipe combined with a restrained blur-to-focus. Only
   opacity/transform/filter/clip-path are touched — never width or
   max-width, so nothing in the CSS module gets overridden. */
const REVEAL_BASE_DELAY = 3000;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)"; /* premium "expo-out" easing */

/* clip-path starting states per direction — element is fully clipped
   (invisible) until `visible` flips, then wipes open to inset(0). */
const clipStart = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  up: "inset(100% 0 0 0)",
  down: "inset(0 0 100% 0)",
};

/* Respects prefers-reduced-motion: if the user has it enabled, skip the
   animation entirely and just show content immediately. */
const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
};

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
  const reducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [animDone, setAnimDone] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      setAnimDone(true);
      return;
    }
    const timer = setTimeout(() => setVisible(true), REVEAL_BASE_DELAY + delay);
    return () => clearTimeout(timer);
  }, [delay, reducedMotion]);

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
    clipPath: visible ? "inset(0 0 0 0)" : clipStart[direction],
    WebkitClipPath: visible ? "inset(0 0 0 0)" : clipStart[direction],
    transition: reducedMotion
      ? "none"
      : `opacity ${duration}s ${EASE}, transform ${duration}s ${EASE}, filter ${duration * 0.8}s ${EASE}, clip-path ${duration}s ${EASE}, -webkit-clip-path ${duration}s ${EASE}`,
    // Drop the GPU-layer hint once the reveal has finished animating,
    // so the element isn't promoted forever.
    willChange: animDone ? "auto" : "opacity, transform, filter, clip-path",
  };

  return (
    <Tag
      className={className}
      style={style}
      onTransitionEnd={() => setAnimDone(true)}
    >
      {children}
    </Tag>
  );
};

/* Splits a word into letters, each fading/rising in with its own stagger —
   a tighter, quicker stagger reads as deliberate typesetting rather than
   a sluggish cascade. Each letter now also wipes open via clip-path
   (bottom-up) instead of just fading, matching the Gallery hero's feel. */
const RevealLetters = ({ text, baseDelay = 0, step = 22, className = "" }) => {
  const reducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [animDone, setAnimDone] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      setAnimDone(true);
      return;
    }
    const timer = setTimeout(() => setVisible(true), REVEAL_BASE_DELAY + baseDelay);
    return () => clearTimeout(timer);
  }, [baseDelay, reducedMotion]);

  return (
    <span className={className} style={{ display: "inline-flex" }}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          onTransitionEnd={() => setAnimDone(true)}
          style={{
            display: "inline-block",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(14px)",
            filter: visible ? "blur(0px)" : "blur(3px)",
            clipPath: visible ? "inset(0 0 0 0)" : clipStart.up,
            WebkitClipPath: visible ? "inset(0 0 0 0)" : clipStart.up,
            transition: reducedMotion
              ? "none"
              : `opacity 0.7s ${EASE}, transform 0.7s ${EASE}, filter 0.55s ${EASE}, clip-path 0.7s ${EASE}, -webkit-clip-path 0.7s ${EASE}`,
            transitionDelay: reducedMotion ? "0ms" : `${i * step}ms`,
            willChange: animDone ? "auto" : "opacity, transform, filter, clip-path",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

const Herocode = () => {
  const videoRef = useRef(null);

  // Nudge autoplay on mount in case the browser paused it (e.g. after a
  // tab was backgrounded before the video had a chance to start).
  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.play().catch(() => {
        /* Autoplay can be blocked by the browser; muted+playsInline
           should prevent this in practice, so we just swallow it. */
      });
    }
  }, []);

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
          ref={videoRef}
          className={styles["code-video"]}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
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