"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./feararchitecture.module.css";
import { useRouter } from "next/navigation";

const DocumentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.333 1.333H4A1.333 1.333 0 0 0 2.667 2.667v10.666A1.333 1.333 0 0 0 4 14.667h8a1.333 1.333 0 0 0 1.333-1.334V5.333L9.333 1.333Z"
      stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
    />
    <path d="M9.333 1.333V5.333h4" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.333 8.667h5.334M5.333 11.333h5.334" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.167 10h11.666" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 4.167 15.833 10 10 15.833" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Shared observer hook — fires once, the first time the element has any
   part on screen. IntersectionObserver already reports the correct state
   on the very first callback (even if the element is already visible at
   mount), so no manual getBoundingClientRect precheck is needed — that
   precheck was racing with layout/nested-Reveal timing and leaving some
   elements permanently hidden. */
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

/* Scroll-triggered clip-path reveal — element is fully clipped from a
   direction and wipes open into view the first time it enters the
   viewport (or immediately, if it's already visible at mount). */
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
  duration = 1.2,
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

/* Letter-by-letter curtain reveal, same feel as the gsap "yPercent 115 -> 0"
   version but done with plain CSS transforms + transition-delay stagger. */
const RevealLetters = ({ text, delay = 0, step = 20, className = "" }) => {
  const [ref, visible] = useRevealVisible();

  return (
    <span ref={ref} className={className} style={{ display: "inline-block" }}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            lineHeight: 1,
            verticalAlign: "bottom",
          }}
        >
          <i
            style={{
              display: "inline-block",
              fontStyle: "normal",
              transform: visible ? "translateY(0%)" : "translateY(115%)",
              transition: `transform 0.9s cubic-bezier(0.19,1,0.22,1) ${delay + i * step}ms`,
              willChange: "transform",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </i>
        </span>
      ))}
    </span>
  );
};

const FearArchitecture = ({
  badgeLabel = "FEATURED_TRANSMISSION",
  date = "OCT. 2025",
  publication = "CINEASTE QUARTERLY",
  title = "THE ARCHITECTURE OF FEAR",
  quote = "How HONEYVERSE Pictures is restructuring the modern thriller by completely abandoning traditional three-act structures in favor of spatial geometry.",
  image = "/images/news/feararchitecture.jpg",
  content = [
    {
      heading: "The Collapse of the Three-Act Structure",
      body: "Traditional narrative geometry assumes a beginning, middle, and end — a straight line the audience can trust. HONEYVERSE Pictures rejects that line entirely, treating story not as a timeline but as a room the viewer is trapped inside.",
    },
    {
      heading: "Fear as Spatial Design",
      body: "Instead of building tension through plot beats, the studio builds it through architecture — corridors that narrow, ceilings that lower, doorways that never lead where they promise to.",
    },
  ],
}) => {
  const router = useRouter();

  const handleReadMore = () => {
    const params = new URLSearchParams({
      title,
      image,
      date,
      duration: publication,
      subtitle: quote,
      content: JSON.stringify(content),
    });
    router.push(`/news-article?${params.toString()}`);
  };

  return (
    <section className={styles["feararchitecture-wrapper"]}>
      <div className={styles["feararchitecture-card"]}>
        {/* ── LEFT: IMAGE ── */}
        <Reveal as="div" direction="down" duration={1.8} className={styles["image-wrap"]}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles["image"]} src={image} alt={title} />

          <Reveal as="div" direction="left" delay={600} duration={1} className={styles["badge"]}>
            <DocumentIcon />
            <span>{badgeLabel}</span>
          </Reveal>
        </Reveal>

        {/* ── RIGHT: CONTENT ── */}
        <div className={styles["content"]}>
          <Reveal as="div" direction="left" delay={200} duration={1.1} className={styles["meta-row"]}>
            <span>{date}</span>
            <span className={styles["meta-dot"]} />
            <span>{publication}</span>
          </Reveal>

          <h2 className={styles["title"]}>
            <RevealLetters text={title} delay={350} step={18} />
          </h2>

          <Reveal as="div" direction="left" delay={600} duration={1.2} className={styles["quote-block"]}>
            <p>{quote}</p>
          </Reveal>

          <Reveal as="div" direction="left" delay={850} duration={1}>
            <button type="button" onClick={handleReadMore} className={styles["read-link"]}>
              <span>[ READ_FULL_ARTICLE ]</span>
              <span className={styles["read-arrow"]}>
                <ArrowIcon />
              </span>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default FearArchitecture;