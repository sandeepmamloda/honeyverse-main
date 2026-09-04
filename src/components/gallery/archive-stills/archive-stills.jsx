"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./archive-stills.module.css";

const headings = [
  { text: "ARCHIVE &", style: "solid" },
  { text: "STILLS", style: "outline" },
];

const slides = [
  { src: "/images/gallery/first.jpg", type: "image", tag: "EXTRACT_001.DPX", title: "FINAL OUTPUT" },
  { src: "/images/gallery/first.jpg", type: "image", tag: "EXTRACT_002.DPX", title: "RAW SCAN" },
  { src: "/images/gallery/first.jpg", type: "image", tag: "EXTRACT_003.DPX", title: "COLOR PASS" },
];

/* ══════════════════════════════
   REVEAL ANIMATION HELPERS
   (newsgrid.jsx wale hi pattern se liya — sirf inline style inject
   karte hain, CSS module ko bilkul touch nahi karte)
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

// stage jaisa element jiska apna ref+pointer-handlers already hai —
// isliye naya wrapper div nahi, balki wahi existing ref observe karte hain
const useRevealVisibleFor = (externalRef) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = externalRef.current;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return visible;
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
  style: extraStyle = {},
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
    ...extraStyle,
  };

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
};

const RevealLetters = ({ text, delay = 0, step = 16, className = "" }) => {
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
              transition: `transform 1.4s cubic-bezier(0.19,1,0.22,1) ${delay + i * step}ms`,
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

// Responsive Icon Component
const ArchiveIcon = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    handleResize(); // Init
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <svg className={styles["archs-badge-icon"]} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 4.66667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H4.66667" stroke="#D9186A" strokeWidth="1.33277" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.332 2H12.6654C13.019 2 13.3581 2.14048 13.6082 2.39052C13.8582 2.64057 13.9987 2.97971 13.9987 3.33333V4.66667" stroke="#D9186A" strokeWidth="1.33277" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.9987 11.3333V12.6666C13.9987 13.0203 13.8582 13.3594 13.6082 13.6095C13.3581 13.8595 13.019 14 12.6654 14H11.332" stroke="#D9186A" strokeWidth="1.33277" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.66667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6666V11.3333" stroke="#D9186A" strokeWidth="1.33277" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.66797 8H11.3346" stroke="#D9186A" strokeWidth="1.33277" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ) : (
    <svg className={styles["archs-badge-icon"]} width="25" height="25" viewBox="0 0 25 25" fill="none">
      <path d="M10.417 8.07288C10.4173 7.93412 10.4545 7.79793 10.5248 7.67832C10.5951 7.55871 10.6961 7.45999 10.8172 7.39231C10.9383 7.32463 11.0753 7.29044 11.2141 7.29325C11.3528 7.29606 11.4883 7.33577 11.6066 7.4083L15.4232 9.75101C15.537 9.8209 15.6309 9.91879 15.6961 10.0353C15.7613 10.1518 15.7955 10.2831 15.7955 10.4166C15.7955 10.5501 15.7613 10.6814 15.6961 10.7979C15.6309 10.9145 15.537 11.0124 15.4232 11.0823L11.6066 13.426C11.4881 13.4986 11.3525 13.5383 11.2135 13.5411C11.0746 13.5438 10.9375 13.5094 10.8163 13.4415C10.6951 13.3736 10.5942 13.2745 10.524 13.1546C10.4538 13.0347 10.4169 12.8983 10.417 12.7593V8.07288Z" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.5 17.7084V21.875" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.33301 21.875H16.6663" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20.833 3.125H4.16634C3.01575 3.125 2.08301 4.05774 2.08301 5.20833V15.625C2.08301 16.7756 3.01575 17.7083 4.16634 17.7083H20.833C21.9836 17.7083 22.9163 16.7756 22.9163 15.625V5.20833C22.9163 4.05774 21.9836 3.125 20.833 3.125Z" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

const ArchiveAndStills = () => {
  const [active, setActive] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const startTime = useRef(0);
  const currentDrag = useRef(0);
  const stageRef = useRef(null);

  // stage ka apna ref+pointer handlers already hain, isliye Reveal wrapper
  // add nahi karte — direct usi node ko observe karte hain
  const stageVisible = useRevealVisibleFor(stageRef);

  const goTo = (index) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, index));
    setActive(clamped);
    setDragX(0);
  };

  const handlePointerDown = (e) => {
    setIsDragging(true);
    startX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    startTime.current = Date.now();
    currentDrag.current = 0;
    stageRef.current?.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const delta = clientX - startX.current;
    currentDrag.current = delta;
    setDragX(delta);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const delta = currentDrag.current;
    const elapsed = Math.max(Date.now() - startTime.current, 1);
    const velocity = Math.abs(delta) / elapsed;
    const shouldAdvance = Math.abs(delta) > 80 || velocity > 0.5;

    if (shouldAdvance && delta < 0 && active < slides.length - 1) goTo(active + 1);
    else if (shouldAdvance && delta > 0 && active > 0) goTo(active - 1);
    else setDragX(0);
  };

  return (
    <section className={styles["archs-section"]}>
      <Reveal as="div" direction="left" duration={1.4} className={styles["archs-badge-wrapper"]}>
        <ArchiveIcon />
        <div className={styles["archs-badge"]}>
          <h3>[ 01 // FRAMEWORK ]</h3>
        </div>
      </Reveal>

      <h2 className={styles["archs-heading-row"]}>
        {headings.map((heading, index) => (
          <Reveal
            key={index}
            as="span"
            direction="up"
            duration={1.3}
            delay={index * 200}
            className={heading.style === "outline" ? styles["archs-text-outline"] : styles["archs-text-solid"]}
          >
            {heading.text}
          </Reveal>
        ))}
      </h2>

      <div
        className={`${styles["archs-stage"]} ${isDragging ? styles["is-dragging"] : ""}`}
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{
          clipPath: stageVisible ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
          WebkitClipPath: stageVisible ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
          opacity: stageVisible ? 1 : 0,
          transitionProperty: "clip-path, -webkit-clip-path, opacity",
          transitionDuration: "1.8s, 1.8s, 0.1s",
          transitionTimingFunction: "cubic-bezier(0.83,0,0.17,1)",
          transitionDelay: "300ms",
          willChange: "clip-path, opacity",
        }}
      >
        <div
          className={styles["archs-track"]}
          style={{
            transform: `translateX(calc(-${active * 100}% + ${dragX}px))`,
            transition: isDragging ? "none" : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {slides.map((slide, index) => (
            <div className={`${styles["archs-slide"]} ${index === active ? styles["is-active"] : ""}`} key={index}>
              <img className={styles["archs-media"]} src={slide.src} alt={slide.title} draggable={false} />
            </div>
          ))}
        </div>
        <div className={styles["archs-media-overlay"]} />
        <Reveal as="div" direction="up" duration={1.1} delay={200} className={styles["archs-caption"]} key={active}>
          <span className={styles["archs-caption-tag"]}>
            <RevealLetters text={slides[active].tag} step={14} />
          </span>
          <h3 className={styles["archs-caption-title"]}>
            <RevealLetters text={slides[active].title} delay={150} step={20} />
          </h3>
        </Reveal>
      </div>

      <Reveal as="div" direction="up" duration={1.2} delay={500} className={styles["archs-dots"]}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles["archs-dot"]} ${index === active ? styles.active : ""}`}
            onClick={() => goTo(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </Reveal>
    </section>
  );
};

export default ArchiveAndStills;