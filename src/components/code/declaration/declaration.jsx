"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./declaration.module.css";

/* ══════════════════════════════
   REVEAL ANIMATION HELPERS
   (principles.jsx / feararchitecture.jsx wale hi pattern se liya — sirf
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
      { threshold: 0, rootMargin: "0px 0px -2% 0px" }
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

const Declaration = () => {
  return (
    <section className={styles["declaration-main"]} aria-label="Our declaration">
      {/* ── TOP WRAPPER: BADGE + TITLE ── */}
      <div className={styles["top-row"]}>
        <Reveal
          as="div"
          direction="left"
          duration={1}
          className={styles["badge-wrapper"]}
        >
          <span>[ THE_DECLARATION ]</span>
        </Reveal>

        {/*
          Downgraded from <h1> to <h2>. A page must have exactly one
          h1 — that belongs to the Herocode section above ("THE
          CODE"). This becomes a sibling section heading instead,
          keeping the outline h1 > h2 (Herocode desc) > h2 (this) > h3s.
        */}
        <Reveal
          as="h2"
          direction="right"
          delay={150}
          duration={1.2}
          className={styles["main-title"]}
        >
          <span className={styles["text-solid"]}>BEYOND</span>
          <span className={styles["text-outline"]}>CONTENT</span>
        </Reveal>
      </div>

      {/* ── BOTTOM WRAPPER: IMAGE + STATEMENT ── */}
      <div className={styles["bottom-row"]}>
        <Reveal
          as="div"
          direction="up"
          duration={1.4}
          className={styles["image-wrapper"]}
        >
          <img
            src="/images/code/declaration.jpg"
            alt="Minimalist architectural structure symbolizing lasting creative work over disposable content"
            className={styles["declaration-image"]}
          />
          <div className={styles["corner-bracket"]} aria-hidden="true"></div>
        </Reveal>

        <Reveal
          as="div"
          direction="left"
          delay={200}
          duration={1.2}
          className={styles["statement-block"]}
        >
          <div className={styles["heading-row"]}>
            <span className={styles["dash-icon"]} aria-hidden="true">—</span>
            {/*
              h3 — one level below this section's own h2 ("BEYOND
              CONTENT") above, instead of another sibling h2.
            */}
            <h3 className={styles["statement-heading"]}>
              <span className={styles["heading-yellow"]}>Content is disposable.</span>
              <span className={styles["heading-pink"]}>Architecture stands.</span>
            </h3>
          </div>

          <p className={styles["statement-paragraph"]}>
            We reject the algorithm. We reject the safe bet. We embrace the
            void, and we build within it. Every frame is a calculation,
            every cut is a statement.
          </p>

          <div className={styles["meta-lines"]}>
            <p>
              WE DO NOT MAKE <span className={styles["strikethrough"]}>ENTERTAINMENT</span>.
            </p>
            <p>WE ENGINEER EMOTION.</p>
          </div>

          {/* h4 — a small closing label under the h3 statement above */}
          <h4 className={styles["vision-text"]}>VISION</h4>
        </Reveal>
      </div>
    </section>
  );
};

export default Declaration;