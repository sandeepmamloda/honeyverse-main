// "use client";

// import { useEffect, useRef, useState } from "react";
// import styles from "./heronews.module.css";

// const headings = [
//   { text: "THE", style: "solid" },
//   { text: "NEWS", style: "outline" },
// ];

// /* Fades an element into place the first time it scrolls into view.
//    direction: "up" (fade + rise), "left" (fade in from the left),
//    "right" (fade in from the right). `delay` (ms) staggers siblings. */
// const Reveal = ({
//   children,
//   className = "",
//   delay = 0,
//   as = "div",
//   direction = "up",
// }) => {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);
//   const Tag = as;

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setVisible(true);
//           observer.unobserve(el);
//         }
//       },
//       { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
//     );

//     observer.observe(el);
//     return () => observer.disconnect();
//   }, []);

//   const directionClass =
//     direction === "left"
//       ? styles["reveal-left"]
//       : direction === "right"
//       ? styles["reveal-right"]
//       : styles["reveal-up"];

//   return (
//     <Tag
//       ref={ref}
//       className={`${className} ${directionClass} ${
//         visible ? styles["reveal-visible"] : ""
//       }`}
//       style={{ transitionDelay: `${delay}ms` }}
//     >
//       {children}
//     </Tag>
//   );
// };

// const Heronews = () => {
//   return (
//     <section className={styles["heronews-main"]}>
//       <div className={styles["heronews-video-wrapper"]}>
//         <video
//           className={styles["news-video"]}
//           autoPlay
//           muted
//           loop
//           playsInline
//         >
//           <source src="/videos/news/news.mp4" type="video/mp4" />
//         </video>
//       </div>

//       <div className={styles["textual-content"]}>
//         {/* Badge + Heading — saath mein center mein */}
//         <div className={styles["headings-group"]}>
//           <Reveal direction="up" delay={0}>
//             <div className={styles["top"]}>
//               <h3>SYS.DOC.000 // CORE_DIRECTIVE</h3>
//             </div>
//           </Reveal>

//           <Reveal direction="up" delay={150}>
//             <h1 className={styles["heading-row"]}>
//               {headings.map((heading, index) => (
//                 <span
//                   key={index}
//                   className={
//                     heading.style === "outline"
//                       ? styles["text-outline"]
//                       : styles["text-solid"]
//                   }
//                 >
//                   {heading.text}
//                 </span>
//               ))}
//             </h1>
//           </Reveal>
//         </div>

//         {/* Description box — bottom pe */}
//         <div className={styles["bottom-last"]}>
//           <Reveal direction="up" delay={300}>
//             <h2>
//               Interviews, press releases, and editorial profiles. The public facing documentation of our internal architecture.
//             </h2>
//           </Reveal>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default Heronews;


// =====================================================================================


"use client";

import { useEffect, useState } from "react";
import styles from "./heronews.module.css";

const headings = [
  { text: "THE", style: "solid" },
  { text: "NEWS", style: "outline" },
];

/* Page-load-timed reveal: waits 3s after mount (hero is above the fold on
   load, so scroll-trigger wouldn't fire meaningfully), then reveals with a
   slow cinematic blur-to-focus. Only opacity/transform/filter are touched —
   never width or max-width, so nothing in the CSS module gets overridden. */
const REVEAL_BASE_DELAY = 3000;

const Reveal = ({
  children,
  className = "",
  delay = 0,
  as = "div",
  direction = "up",
  duration = 1.6,
}) => {
  const Tag = as;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), REVEAL_BASE_DELAY + delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const hiddenTransform =
    direction === "left"
      ? "translateX(-30px) scale(0.98)"
      : direction === "right"
      ? "translateX(30px) scale(0.98)"
      : "translateY(34px) scale(0.98)";

  const style = {
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : hiddenTransform,
    filter: visible ? "blur(0px)" : "blur(10px)",
    transition: `opacity ${duration}s cubic-bezier(0.19,1,0.22,1), transform ${duration}s cubic-bezier(0.19,1,0.22,1), filter ${duration}s cubic-bezier(0.19,1,0.22,1)`,
    willChange: "opacity, transform, filter",
  };

  return (
    <Tag className={className} style={style}>
      {children}
    </Tag>
  );
};

/* Splits a word into letters, each fading/rising in with its own stagger —
   gives the heading a slow, deliberate "typesetting" reveal. */
const RevealLetters = ({ text, baseDelay = 0, step = 45, className = "" }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), REVEAL_BASE_DELAY + baseDelay);
    return () => clearTimeout(timer);
  }, [baseDelay]);

  return (
    <span className={className} style={{ display: "inline-flex" }}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(26px) scale(0.9)",
            filter: visible ? "blur(0px)" : "blur(8px)",
            transition: `opacity 1s cubic-bezier(0.19,1,0.22,1), transform 1s cubic-bezier(0.19,1,0.22,1), filter 1s cubic-bezier(0.19,1,0.22,1)`,
            transitionDelay: `${i * step}ms`,
            willChange: "opacity, transform, filter",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

const Heronews = () => {
  return (
    /* overflow guard on the section only — doesn't touch any element's
       own width/max-width, so .bottom-last keeps its CSS-defined 40rem cap */
    <section
      className={styles["heronews-main"]}
      style={{ overflowX: "hidden", overflowY: "hidden" }}
    >
      <div className={styles["heronews-video-wrapper"]}>
        <video
          className={styles["news-video"]}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/news/news.mp4" type="video/mp4" />
        </video>
      </div>

      <div className={styles["textual-content"]}>
        {/* Badge + Heading — saath mein center mein */}
        <div className={styles["headings-group"]}>
          <Reveal direction="up" delay={0} duration={1.4}>
            <div className={styles["top"]}>
              <h3>[ SYS.DOC.000 // CORE_DIRECTIVE ]</h3>
            </div>
          </Reveal>

          <h1 className={styles["heading-row"]} style={{ overflow: "hidden" }}>
            {headings.map((heading, index) => (
              <RevealLetters
                key={index}
                text={heading.text}
                baseDelay={350 + index * 400}
                step={40}
                className={
                  heading.style === "outline"
                    ? styles["text-outline"]
                    : styles["text-solid"]
                }
              />
            ))}
          </h1>
        </div>

        {/* Description box — bottom pe */}
        <div className={styles["bottom-last"]}>
          <Reveal direction="up" delay={1100} duration={1.8}>
            <h2>
              Interviews, press releases, and editorial profiles. The public facing documentation of our internal architecture.
            </h2>
          </Reveal>
        </div>

      </div>
    </section>
  );
};

export default Heronews;