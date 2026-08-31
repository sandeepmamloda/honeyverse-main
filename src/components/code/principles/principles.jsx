"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./principles.module.css";

const principlesItems = [
  {
    id: 1,
    number: "01",
    title: "Brutal Honesty",
    description:
      "No artificial sweetener. No manufactured sentiment. We strip away the unnecessary to reveal the raw structural beams of the narrative. If it doesn't serve the core truth of the story, it is excised.",
  },
  {
    id: 2,
    number: "02",
    title: "Technical Precision",
    description:
      "Art without discipline is chaos. We treat cameras as scientific instruments and lights as surgical tools. Every frame is calculated, measured, and executed with absolute systemic rigor.",
  },
  {
    id: 3,
    number: "03",
    title: "Friction over Comfort",
    description:
      "Comfort is the enemy of progress. We actively seek out visual and narrative friction. We use high contrast, jarring edits, and challenging subject matter to force the audience into an active state of engagement.",
  },
  {
    id: 4,
    number: "04",
    title: "Data Integrity",
    description:
      "A film is a dataset. From the initial DIT offload to the final color grade, we maintain absolute strictness over our pipeline. No lost frames. No corrupted proxies. No degraded master files.",
  },
];

/* ══════════════════════════════
   REVEAL ANIMATION HELPERS
   (feararchitecture.jsx / newsgrid.jsx wale hi pattern se liya — sirf
   inline style inject karte hain, CSS module ko bilkul touch nahi karte)
══════════════════════════════ */
const useRevealVisible = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0, rootMargin: "-40% 0px -40% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

const clipStart = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  up: "inset(100% 0 0 0)",
  down: "inset(0 0 100% 0)",
};

const Reveal = ({
  children,
  className = "",
  delay = 0,
  as = "div",
  direction = "left",
  duration = 1.1,
}) => {
  const Tag = as;
  const [ref, visible] = useRevealVisible();

  const style = {
    clipPath: visible ? "inset(0 0 0 0)" : clipStart[direction],
    WebkitClipPath: visible ? "inset(0 0 0 0)" : clipStart[direction],
    opacity: visible ? 1 : 0,
    transitionProperty: "clip-path, -webkit-clip-path, opacity",
    transitionDuration: `${duration}s, ${duration}s, 0.1s`,
    transitionTimingFunction: "cubic-bezier(0.83,0,0.17,1)",
    transitionDelay: `${delay}ms`,
    willChange: "clip-path, opacity",
  };

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
};

const PrincipleItem = ({ item, index, total }) => (
  <Reveal
    as="article"
    direction="left"
    delay={index * 150}
    duration={1}
    className={styles["principle-item"]}
  >
    {/* aria-hidden: the number is decorative/redundant with the
        heading text that follows, so it shouldn't be read out or
        indexed as separate content by itself */}
    <span className={styles["item-number"]} aria-hidden="true">
      {item.number}
    </span>
    <div className={styles["item-content"]}>
      <div className={styles["item-heading"]}>
        {/*
          h3, one level below the section's own h2 below — keeps
          the outline h1 (page) > h2 (this section) > h3 (each
          principle) instead of jumping straight to h2 per item.
        */}
        <h3 className={styles["item-title"]}>{item.title}</h3>
      </div>
      <p className={styles["item-description"]}>{item.description}</p>
      <div
        className={styles["item-dots"]}
        role="img"
        aria-label={`Principle ${index + 1} of ${total}`}
      >
        {Array.from({ length: total }).map((_, dotIndex) => (
          <span
            key={dotIndex}
            aria-hidden="true"
            className={`${styles["dot"]} ${dotIndex <= index ? styles["dot-active"] : ""}`}
          ></span>
        ))}
      </div>
    </div>
  </Reveal>
);

const Principles = () => {
  const [row1, row2] = [principlesItems.slice(0, 2), principlesItems.slice(2, 4)];

  return (
    <section
      className={styles["principles-main"]}
      aria-labelledby="principles-heading"
    >
      {/*
        Visually-hidden section heading. Gives this block its own
        entry in the document outline (h1 > h2 > h3 per item) without
        changing anything the user sees — style is inline so it
        doesn't depend on any external CSS class being defined.
      */}
      <h2
        id="principles-heading"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        Our Production Principles
      </h2>

      {/* ── ROW 1 ── */}
      <div className={styles["principles-grid"]}>
        {row1.map((item, i) => (
          <PrincipleItem key={item.id} item={item} index={i} total={principlesItems.length} />
        ))}
      </div>

      {/* ── STRUCTURAL IMAGE BANNER ── */}
      <Reveal
        as="div"
        direction="down"
        duration={1.6}
        className={styles["image-banner"]}
      >
        <img
          src="/images/code/principle.jpg"
          alt="Behind-the-scenes structural integrity check during production, showing technical precision on set"
          className={styles["banner-image"]}
        />
        <div className={styles["banner-badge"]}>
          <span>STRUCTURAL_INTEGRITY_CHECK</span>
        </div>
      </Reveal>

      {/* ── ROW 2 ── */}
      <div className={styles["principles-grid"]}>
        {row2.map((item, i) => (
          <PrincipleItem key={item.id} item={item} index={i + row1.length} total={principlesItems.length} />
        ))}
      </div>
    </section>
  );
};

export default Principles;