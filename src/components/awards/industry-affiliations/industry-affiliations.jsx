"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./industry-affiliations.module.css";

const datas = [
  { id: 1, content: "AMPAS" },
  { id: 2, content: "PGA" },
  { id: 3, content: "DGA" },
  { id: 4, content: "WGA" },
  { id: 5, content: "BAFTA" },
  { id: 6, content: "EFA" },
];

/* Fades an element into place the first time it scrolls into view.
   World-class custom inline-style reveal animation with physics spring-like easing. */
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
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hiddenTransform =
    direction === "pop"
      ? "translateY(40px) scale(0.75) rotate(-4deg)"
      : direction === "left"
      ? "translateX(-60px) translateY(20px)"
      : "translateY(50px)";

  let style;
  if (phase === "settled") {
    style = undefined;
  } else {
    style = {
      opacity: phase === "entering" ? 1 : 0,
      transform: phase === "entering" ? "none" : hiddenTransform,
      transition:
        direction === "pop"
          ? "opacity 1.0s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)"
          : "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
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

const IndustryAffiliations = function () {
  return (
    <section className={styles["industry-affiliations-wrapper"]}>
      <Reveal className={styles["industry-affiliations-left"]} direction="left" delay={0}>
        <span className={styles["svg"]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
          >
            <path
              d="M6 44H42"
              stroke="#D9186A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 36V22"
              stroke="#D9186A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 36V22"
              stroke="#D9186A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M28 36V22"
              stroke="#D9186A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M36 36V22"
              stroke="#D9186A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24 4L40 14H8L24 4Z"
              stroke="#D9186A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h2>Industry Affiliations</h2>
        <p>
          Proud members of the organizations shaping the future of global
          cinema and entertainment.
        </p>
      </Reveal>

      <div className={styles["industry-affiliations-right"]}>
        {datas.map((each, index) => (
          <Reveal
            key={each.id}
            as="div"
            className={styles["industry-affiliations-product"]}
            direction="pop"
            delay={200 + index * 100}
          >
            <p>{each.content}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default IndustryAffiliations;