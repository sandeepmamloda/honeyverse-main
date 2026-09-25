"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./education.module.css";

const educationData = [
  {
    year: "2016",
    degree: "MFA, Film Production",
    institution: "NYU Tisch School of the Arts",
  },
];

/* Scroll par pehli baar dikhne par slide + fade (Awards section jaisa hi).
   prefers-reduced-motion par animation skip ho jaata hai. */
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

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("settled");
      return;
    }

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
  if (phase !== "settled") {
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

/* ── Graduation cap icon ── */
const CapIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
    <path d="M22 10v6" />
    <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
  </svg>
);

/* ── Component ── */
const Education = function () {
  return (
    <section className={styles["edu-section"]}>
      {/* ── Header ── */}
      <div className={styles["edu-header"]}>
        <Reveal className={styles["edu-header-left"]} direction="left" delay={0}>
          <CapIcon className={styles["edu-icon"]} />
          <h2 className={styles["edu-title"]}>Education</h2>
        </Reveal>
        <Reveal direction="right" delay={200}>
          <span className={styles["edu-tag"]}>[ THE FOUNDATION ]</span>
        </Reveal>
      </div>

      {/* ── List ── */}
      <ul className={styles["edu-list"]}>
        {educationData.map((item) => (
          <Reveal
            key={`${item.year}-${item.institution}`}
            as="li"
            className={styles["edu-row"]}
            direction="up"
            delay={300}
          >
            {/* Year */}
            <span className={styles["edu-year"]}>{item.year}</span>

            {/* Degree */}
            <div className={styles["edu-center"]}>
              <h3 className={styles["edu-degree"]}>{item.degree}</h3>
            </div>

            {/* Institution */}
            <div className={styles["edu-right"]}>
              <span className={styles["edu-label"]}>INSTITUTION</span>
              <span className={styles["edu-school"]}>{item.institution}</span>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
};

export default Education;