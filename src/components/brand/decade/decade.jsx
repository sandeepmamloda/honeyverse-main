"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./decade.module.css";

/* ══════════════════════════════
   REVEAL ANIMATION HELPERS — SCROLL BASED
   Ye section hero nahi hai, isliye IntersectionObserver use karte hain —
   jab section viewport me aata hai tabhi "ready" true hota hai.
══════════════════════════════ */
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
};

const clipStart = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  up: "inset(100% 0 0 0)",
  down: "inset(0 0 100% 0)",
};

/* IMPORTANT: layout break na ho isliye Reveal apna koi extra
   wrapper div nahi banata — seedha "as" prop wale tag pe hi
   original className + clip-path inline style laga deta hai. */
const Reveal = ({
  children,
  className = "",
  ready = false,
  delay = 0,
  as = "div",
  direction = "up",
  duration = 1.1,
  style: extraStyle = {},
}) => {
  const Tag = as;

  const style = {
    clipPath: ready ? "inset(0 0 0 0)" : clipStart[direction],
    WebkitClipPath: ready ? "inset(0 0 0 0)" : clipStart[direction],
    opacity: ready ? 1 : 0,
    transitionProperty: "clip-path, -webkit-clip-path, opacity",
    transitionDuration: `${duration}s, ${duration}s, 0.1s`,
    transitionTimingFunction: "cubic-bezier(0.83,0,0.17,1)",
    transitionDelay: `${delay}ms`,
    willChange: "clip-path, opacity",
    ...extraStyle,
  };

  return (
    <Tag className={className} style={style}>
      {children}
    </Tag>
  );
};

const Decade = () => {
  const [leftRef, leftInView] = useInView(0.2);
  const [rightRef, rightInView] = useInView(0.2);

  return (
    <section className={styles["decade-main"]}>

      {/* ── LEFT ── */}
      <div className={styles["decade-left"]} ref={leftRef}>
        <Reveal
          as="div"
          ready={leftInView}
          direction="left"
          duration={1.2}
          delay={0}
          className={styles["badge"]}
        >
          <span>[ 01. // HISTORY ]</span>
        </Reveal>

        <Reveal
          as="h1"
          ready={leftInView}
          direction="up"
          duration={1.3}
          delay={200}
          className={styles["decade-heading"]}
          style={{
            lineHeight: 1.15,
            overflow: "visible",
            paddingBlock: "0.12em",
          }}
        >
          A DECADE
        </Reveal>

        <div className={styles["decade-text"]}>
          <Reveal
            as="p"
            ready={leftInView}
            direction="up"
            duration={1.2}
            delay={400}
            className={styles["text-bold"]}
          >
            It started with a single roll of 35mm film and an impossible idea.
            Our founders believed that cinema wasn't just entertainment—it was
            the most profound empathy engine ever created.
          </Reveal>
          <Reveal
            as="p"
            ready={leftInView}
            direction="up"
            duration={1.2}
            delay={550}
            className={styles["text-light"]}
          >
            For a decade, we have championed visionary directors and distinct
            voices, shaping narratives that linger long after the credits roll.
            We don't just produce movies; we forge experiences that connect us
            to our shared humanity.
          </Reveal>
        </div>
      </div>

      {/* ── RIGHT ── */}
      <div className={styles["decade-right"]} ref={rightRef}>
        <Reveal
          as="div"
          ready={rightInView}
          direction="right"
          duration={1.3}
          delay={100}
          className={styles["video-wrapper"]}
        >
          <video
            className={styles["decade-video"]}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/brand/decade.mp4" type="video/mp4" />
          </video>
        </Reveal>

        {/* Pink card — overlaps video */}
        <Reveal
          as="div"
          ready={rightInView}
          direction="up"
          duration={1.2}
          delay={450}
          className={styles["themes-card"]}
        >
          <div className={styles["themes-card-top"]}>
            <span className={styles["themes-label"]}>THEMES</span>
            <svg
              className={styles["themes-arrow"]}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M7 7L17 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17 7V17H7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className={styles["themes-title"]}>THE SPACES BETWEEN</h2>
          <p className={styles["themes-desc"]}>
            Resilience. Identity. The space between the stars. We are drawn to
            stories of ordinary people in extraordinary circumstances, the
            friction between nature and technology, and the universal quest for
            belonging.
          </p>
        </Reveal>
      </div>

    </section>
  );
};

export default Decade;