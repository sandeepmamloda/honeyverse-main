"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./catattribute.module.css";

const defaultAttributes = [
  {
    index: "01 //",
    heading: "EMOTIONAL",
    outline: false,
    highlight: "Visceral, melancholic, triumphant.",
    paragraphs: [
      "We want our audience to feel the cold of the rain and the warmth of the sun in every frame.",
      "Our films strike a chord that resonates in the quiet moments—the lingering glance, the breath before speaking, the empty room.",
    ],
    image: "/images/brand/emotional.jpg",
    alt: "Emotional",
  },
  {
    index: "02 //",
    heading: "VISUAL",
    outline: true,
    highlight: "High contrast, motivated lighting.",
    paragraphs: [
      "A commitment to shooting on film whenever possible. We embrace grain, texture, and deep, saturated shadows.",
      "Every frame is a painting; every cut has a purpose, grounding the fantastical in raw reality.",
    ],
    image: "/images/brand/visual.jpg",
    alt: "Visual",
  },
];

/* ══════════════════════════════
   REVEAL ANIMATION HELPERS — SCROLL BASED
   Ye section hero nahi hai, isliye IntersectionObserver use karte hain.
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

/* IMPORTANT: layout break na ho isliye Reveal koi extra wrapper
   div nahi banata — seedha "as" prop wale tag pe hi original
   className + clip-path inline style laga deta hai. */
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

/* Har attribute row apna khud ka scroll-trigger use karta hai,
   isliye ise alag component banaya — hooks ko .map() ke andar
   directly call nahi kar sakte (Rules of Hooks). */
const AttrRow = ({ attr, isImageFirst }) => {
  const [rowRef, rowInView] = useInView(0.15);

  return (
    <div className={styles["attr-row"]} ref={rowRef}>
      <div className={styles["attr-left"]}>
        <Reveal
          as="span"
          ready={rowInView}
          direction="left"
          duration={1}
          delay={0}
          className={styles["attr-index"]}
        >
          {attr.index}
        </Reveal>

        <Reveal
          as="h2"
          ready={rowInView}
          direction="up"
          duration={1.2}
          delay={150}
          className={
            attr.outline
              ? `${styles["attr-heading"]} ${styles["attr-heading-outline"]}`
              : styles["attr-heading"]
          }
        >
          {attr.heading}
        </Reveal>
      </div>

      <div className={styles["attr-content"]}>
        <Reveal
          as="div"
          ready={rowInView}
          direction="up"
          duration={1.2}
          delay={300}
          className={styles["attr-text"]}
        >
          <span className={styles["attr-highlight"]}>
            {attr.highlight}
          </span>
          {attr.paragraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </Reveal>

        <Reveal
          as="div"
          ready={rowInView}
          direction={isImageFirst ? "left" : "right"}
          duration={1.3}
          delay={200}
          className={styles["attr-image"]}
        >
          <img src={attr.image} alt={attr.alt} />
        </Reveal>
      </div>
    </div>
  );
};

const CatAttribute = ({
  badgeLabel = "[ 02. // CORE ATTRIBUTES ]",
  attributes = defaultAttributes,
}) => {
  const [badgeRef, badgeInView] = useInView(0.3);

  return (
    <section className={styles["cat-main"]}>
      <Reveal
        as="div"
        ready={badgeInView}
        direction="left"
        duration={1.1}
        delay={0}
        className={styles["badge"]}
      >
        <span ref={badgeRef}>{badgeLabel}</span>
      </Reveal>

      <div className={styles["attr-list"]}>
        {attributes.map((attr, i) => (
          <AttrRow
            key={attr.heading ?? i}
            attr={attr}
            isImageFirst={i % 2 === 0}
          />
        ))}
      </div>
    </section>
  );
};

export default CatAttribute;