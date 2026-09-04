"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./creativeprocess.module.css";

// Dynamic Data Array
const stepsData = [
  {
    id: 1,
    num: "01",
    numColor: "pink",
    title: "IDEATION & SCRIPTING",
    description:
      "Forging the core narrative framework. Stress-testing concepts against structural integrity.",
  },
  {
    id: 2,
    num: "02",
    numColor: "yellow",
    title: "PRE-VISUALIZATION",
    description:
      "Moodboards, storyboards, and technical scouting. Designing the optical strategy.",
  },
  {
    id: 3,
    num: "03",
    numColor: "pink",
    title: "PRINCIPAL PHOTOGRAPHY",
    description:
      "Execution in the trenches. Heavy machinery, focused lighting, capturing the raw data.",
  },
  {
    id: 4,
    num: "04",
    numColor: "yellow",
    title: "THE EDIT",
    description:
      "Assembling the timeline. Trimming the fat, finding the rhythm and structural pacing.",
  },
  {
    id: 6,
    num: "05",
    numColor: "pink",
    title: "COLOR & FINISH",
    description:
      "The final grade. Applying the brutalist, high-contrast aesthetic. Mastering for delivery.",
  },
];

/* ══════════════════════════════
   REVEAL ANIMATION HELPERS
   (draftsearch.jsx wale hi final/fixed pattern — reliable trigger +
   fade variant taaki -webkit-text-stroke wale outline text kabhi
   cut/broken na dikhein, aur CSS module bilkul touch nahi hota)
══════════════════════════════ */
const useRevealVisible = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // element pehle se hi viewport ke andar ho sakta hai — is case me
    // observer trigger hone se pehle hi yaha check kar lete hain, taaki
    // wo permanently hidden/clipped state me atka na rahe
    const rect = el.getBoundingClientRect();
    const alreadyInView =
      rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom > 0;
    if (alreadyInView) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px 0px 0px" }
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
  variant = "clip", // "clip" = wipe reveal, "fade" = safe for stroke/outline text
  style: extraStyle = {},
}) => {
  const Tag = as;
  const [ref, visible] = useRevealVisible();

  const clipStyle = {
    clipPath: visible ? "inset(0 0 0 0)" : clipStart[direction],
    WebkitClipPath: visible ? "inset(0 0 0 0)" : clipStart[direction],
    opacity: visible ? 1 : 0,
    transitionProperty: "clip-path, -webkit-clip-path, opacity",
    transitionDuration: `${duration}s, ${duration}s, 0.1s`,
    transitionTimingFunction: "cubic-bezier(0.83,0,0.17,1)",
    transitionDelay: `${delay}ms`,
    willChange: "clip-path, opacity",
  };

  // fade variant kabhi clip-path use nahi karta — isliye -webkit-text-stroke
  // wale outline text (titleOutline) pe glyph edges kabhi cut/broken nahi
  // dikhte, sirf clean opacity + upward slide hoti hai
  const fadeStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transitionProperty: "opacity, transform",
    transitionDuration: `${duration}s, ${duration}s`,
    transitionTimingFunction: "cubic-bezier(0.19,1,0.22,1)",
    transitionDelay: `${delay}ms`,
    willChange: "opacity, transform",
  };

  const style = { ...(variant === "fade" ? fadeStyle : clipStyle), ...extraStyle };

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
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M13.3286 1.99927H2.66639C2.29835 1.99927 2 2.29762 2 2.66566V5.99759C2 6.36563 2.29835 6.66398 2.66639 6.66398H13.3286C13.6966 6.66398 13.995 6.36563 13.995 5.99759V2.66566C13.995 2.29762 13.6966 1.99927 13.3286 1.99927Z"
        stroke="#D9186A"
        strokeWidth="1.33277"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.3311 9.32935H2.66639C2.29835 9.32935 2 9.6277 2 9.99573V13.3277C2 13.6957 2.29835 13.9941 2.66639 13.9941H7.3311C7.69914 13.9941 7.99749 13.6957 7.99749 13.3277V9.99573C7.99749 9.6277 7.69914 9.32935 7.3311 9.32935Z"
        stroke="#D9186A"
        strokeWidth="1.33277"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3296 9.32935H11.3304C10.9624 9.32935 10.6641 9.6277 10.6641 9.99573V13.3277C10.6641 13.6957 10.9624 13.9941 11.3304 13.9941H13.3296C13.6976 13.9941 13.996 13.6957 13.996 13.3277V9.99573C13.996 9.6277 13.6976 9.32935 13.3296 9.32935Z"
        stroke="#D9186A"
        strokeWidth="1.33277"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

const CreativeProcess = () => {
  return (
    <section className={styles.container}>
      <Reveal as="div" direction="up" duration={1.2} className={styles.badgeWrapper}>
        <ArchiveIcon />
        <div className={styles.badge}>
          <h3>[ 03 // CONCEPTION ]</h3>
        </div>
      </Reveal>

      <div className={styles.headerGroup}>
        <h2 className={styles.title}>
          <Reveal as="span" variant="fade" duration={1.1} delay={150} className={styles.titleFilled}>
            CREATIVE
          </Reveal>
          <Reveal as="span" variant="fade" duration={1.1} delay={350} className={styles.titleOutline}>
            PROCESS
          </Reveal>
        </h2>
      </div>

      <div className={styles.content}>
        <Reveal as="div" direction="up" duration={1.4} delay={200} className={styles.imageWrapper}>
          <span className={styles.imageLabel}>SYS.POST_PRODUCTION</span>
          <img
            src="/images/gallery/createprocess/createprocess.jpg"
            alt="Post Production Setup"
          />
        </Reveal>

        <div className={styles.stepsList}>
          {stepsData.map((step, index) => (
            <Reveal
              key={step.id}
              as="div"
              direction="left"
              duration={1.1}
              delay={200 + index * 150}
              className={styles.step}
            >
              <span
                className={`${styles.stepNumber} ${
                  step.numColor === "pink"
                    ? styles.stepNumberPink
                    : styles.stepNumberYellow
                }`}
              >
                {step.num}
              </span>
              <div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreativeProcess;