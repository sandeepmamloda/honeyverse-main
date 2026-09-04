"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./scence.module.css";

// Dynamic Data Array
const sceneData = [
  {
    id: 1,
    label: "CAMERA_DEPT",
    src: "/images/gallery/scence/first.jpg",
    alt: "Camera Department"
  },
  {
    id: 2,
    label: "GRIP_&_ELECTRIC",
    src: "/images/gallery/scence/second.jpg",
    alt: "Grip and Electric"
  },
];

/* ══════════════════════════════
   REVEAL ANIMATION HELPERS
   (archive-stills.jsx wale hi pattern se liya — sirf inline style
   inject karte hain, CSS module ko bilkul touch nahi karte)
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

const ArchiveIcon = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <svg className={styles.badgeIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 4.66667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H4.66667" stroke="#D9186A" strokeWidth="1.33277" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.332 2H12.6654C13.019 2 13.3581 2.14048 13.6082 2.39052C13.8582 2.64057 13.9987 2.97971 13.9987 3.33333V4.66667" stroke="#D9186A" strokeWidth="1.33277" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.9987 11.3333V12.6666C13.9987 13.0203 13.8582 13.3594 13.6082 13.6095C13.3581 13.8595 13.019 14 12.6654 14H11.332" stroke="#D9186A" strokeWidth="1.33277" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.66667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6666V11.3333" stroke="#D9186A" strokeWidth="1.33277" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.66797 8H11.3346" stroke="#D9186A" strokeWidth="1.33277" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ) : (
    <svg className={styles.badgeIcon} width="25" height="25" viewBox="0 0 25 25" fill="none">
      <path d="M10.417 8.07288C10.4173 7.93412 10.4545 7.79793 10.5248 7.67832C10.5951 7.55871 10.6961 7.45999 10.8172 7.39231C10.9383 7.32463 11.0753 7.29044 11.2141 7.29325C11.3528 7.29606 11.4883 7.33577 11.6066 7.4083L15.4232 9.75101C15.537 9.8209 15.6309 9.91879 15.6961 10.0353C15.7613 10.1518 15.7955 10.2831 15.7955 10.4166C15.7955 10.5501 15.7613 10.6814 15.6961 10.7979C15.6309 10.9145 15.537 11.0124 15.4232 11.0823L11.6066 13.426C11.4881 13.4986 11.3525 13.5383 11.2135 13.5411C11.0746 13.5438 10.9375 13.5094 10.8163 13.4415C10.6951 13.3736 10.5942 13.2745 10.524 13.1546C10.4538 13.0347 10.4169 12.8983 10.417 12.7593V8.07288Z" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.5 17.7084V21.875" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.33301 21.875H16.6663" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20.833 3.125H4.16634C3.01575 3.125 2.08301 4.05774 2.08301 5.20833V15.625C2.08301 16.7756 3.01575 17.7083 4.16634 17.7083H20.833C21.9836 17.7083 22.9163 16.7756 22.9163 15.625V5.20833C22.9163 4.05774 21.9836 3.125 20.833 3.125Z" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

const Scenes = () => {
  return (
    <section className={styles.scenesContainer}>
      <Reveal as="div" direction="right" duration={1.3} className={styles.badgeWrapper}>
        <div className={styles.badge}>
          <h3>[ 02 // ON_SET ]</h3>
        </div>
        <ArchiveIcon />
      </Reveal>

      <div className={styles.headerGroup}>
        <Reveal as="h2" direction="up" duration={1.4} delay={150} className={styles.title}>
          SCENES
        </Reveal>
        <Reveal as="p" direction="up" duration={1.2} delay={400} className={styles.description}>
          Raw, unfiltered documentation from the trenches. Tactical execution of complex lighting and camera moves.
        </Reveal>
      </div>

      {/* Dynamic Grid */}
      <div className={styles.grid}>
        {sceneData.map((item, index) => (
          <Reveal
            key={item.id}
            as="div"
            direction="up"
            duration={1.4}
            delay={index * 250}
            className={styles.card}
          >
            <div className={styles.cardLabel}>{item.label}</div>
            <img src={item.src} alt={item.alt} />
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Scenes;