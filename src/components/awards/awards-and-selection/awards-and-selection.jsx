"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./awards-and-selection.module.css";

const awardsData = [
  {
    year: "2025",
    festival: "Cannes Film Festival",
    award: "Palme d'Or Nominee",
    project: "The Spaces Between",
  },
  {
    year: "2024",
    festival: "Venice Biennale",
    award: "Silver Lion",
    project: "Echoes of Rain",
  },
  {
    year: "2024",
    festival: "Sundance",
    award: "Grand Jury Prize",
    project: "Midnight Sun",
  },
  {
    year: "2023",
    festival: "TIFF",
    award: "People's Choice",
    project: "Neon Horizons",
  },
  {
    year: "2022",
    festival: "Berlinale",
    award: "Golden Bear Nominee",
    project: "Steel & Glass",
  },
];

/* Fades an element into place the first time it scrolls into view.
   Upgraded with a deeply cinematic, slow, butter-smooth easing and staggered reveal. */
const Reveal = ({
  children,
  className = "",
  delay = 0,
  as = "div",
  direction = "up",
}) => {
  const ref = useRef(null);
  const [phase, setPhase] = useState("hidden");
  const Tag = as;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => setPhase("entering"));
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hiddenTransform =
    direction === "left"
      ? "translateX(-70px) scale(0.98)"
      : direction === "right"
      ? "translateX(70px) scale(0.98)"
      : "translateY(70px) scale(0.95)";

  let style;
  if (phase === "settled") {
    style = undefined;
  } else {
    style = {
      opacity: phase === "entering" ? 1 : 0,
      transform: phase === "entering" ? "none" : hiddenTransform,
      transition:
        "opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1), transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)",
      transitionDelay: `${delay}ms`,
      willChange: "opacity, transform",
    };
  }

  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      onTransitionEnd={(e) => {
        if (phase === "entering" && e.propertyName === "opacity") {
          setPhase("settled");
        }
      }}
    >
      {children}
    </Tag>
  );
};

/* ── Inline SVG Icons ── */
const TrophyIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    className={className}
  >
    <g clipPath="url(#clip0_208_111)">
      <path d="M5.3335 13.3334H26.6668" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.3335 3.54663V6.66663C13.3335 7.39996 12.7068 7.9733 12.0402 8.27996C10.4668 8.99996 9.3335 10.9866 9.3335 13.3333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.6665 3.54663V6.66663C18.6665 7.39996 19.2932 7.9733 19.9598 8.27996C21.5332 8.99996 22.6665 10.9866 22.6665 13.3333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 -13.3334H8V-4.00004C8 -1.87831 8.84286 0.156523 10.3431 1.65681C11.8434 3.1571 13.8783 3.99996 16 3.99996C18.1217 3.99996 20.1566 3.1571 21.6569 1.65681C23.1571 0.156523 24 -1.87831 24 -4.00004V-13.3334Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_208_111">
        <rect width="32" height="32" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const ArrowIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Component ── */
const AwardsAndSelection = function () {
  return (
    <section className={styles["aws-section"]}>

      {/* ── Header ── */}
      <div className={styles["aws-header"]}>
        <Reveal className={styles["aws-header-left"]} direction="left" delay={0}>
          <TrophyIcon className={styles["aws-icon"]} />
          <h2 className={styles["aws-title"]}>AWARDS & SELECTIONS</h2>
        </Reveal>
        <Reveal direction="right" delay={200}>
          <span className={styles["aws-tag"]}>[ THE LAURELS ]</span>
        </Reveal>
      </div>

      {/* ── List ── */}
      <ul className={styles["aws-list"]}>
        {awardsData.map((item, index) => (
          <Reveal
            key={index}
            as="li"
            className={styles["aws-row"]}
            direction="up"
            delay={300 + index * 180}
          >
            {/* Year */}
            <span className={styles["aws-year"]}>{item.year}</span>

            {/* Festival + Award */}
            <div className={styles["aws-center"]}>
              <h3 className={styles["aws-festival"]}>{item.festival}</h3>
              <p className={styles["aws-award"]}>{item.award}</p>
            </div>

            {/* Project + Arrow */}
            <div className={styles["aws-right"]}>
              <div className={styles["aws-project-wrap"]}>
                <span className={styles["aws-project-label"]}>PROJECT</span>
                <span className={styles["aws-project-name"]}>{item.project}</span>
              </div>
              <ArrowIcon className={styles["aws-arrow"]} />
            </div>
          </Reveal>
        ))}
      </ul>

    </section>
  );
};

export default AwardsAndSelection;