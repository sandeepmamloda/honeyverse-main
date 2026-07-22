// import styles from "./heroawards.module.css";

// const headings = [
//   { text: "CRITICAL", style: "solid" },
//   { text: "ACCLAIM", style: "outline" },
// ];

// const Heroawards = () => {
//   return (
//     <section className={styles["heroawards-main"]}>
//       <div className={styles["heroawards-video-wrapper"]}>
//         <video
//           className={styles["awards-video"]}
//           autoPlay
//           muted
//           loop
//           playsInline
//         >
//           <source src="/videos/awards/awards.mp4" type="video/mp4" />
//         </video>
//       </div>

//       <div className={styles["textual-content"]}>
//         {/* Badge + Heading — saath mein center mein */}
//         <div className={styles["headings-group"]}>
//           <div className={styles["top"]}>
//             <h3>[ Our Identity // Vol. 01 ]</h3>
//           </div>

//           <h1 className={styles["heading-row"]}>
//             {headings.map((heading, index) => (
//               <span
//                 key={index}
//                 className={
//                   heading.style === "outline"
//                     ? styles["text-outline"]
//                     : styles["text-solid"]
//                 }
//               >
//                 {heading.text}
//               </span>
//             ))}
//           </h1>
//         </div>

//         {/* Description box — bottom pe */}
//         <div className={styles["bottom-last"]}>
//           <h2>
//             Recognition from the world's most prestigious institutions. A testament to our uncompromising vision and narrative rigor.
//           </h2>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default Heroawards;

// ============================================================changes==================================================================
"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./heroawards.module.css";

const headings = [
  { text: "CRITICAL", style: "solid" },
  { text: "ACCLAIM", style: "outline" },
];

/* Fades an element into place the first time it scrolls into view.
   direction: "up" (fade + rise), "left" (fade in from the left),
   "right" (fade in from the right). `delay` (ms) staggers siblings. */
const Reveal = ({
  children,
  className = "",
  delay = 0,
  as = "div",
  direction = "up",
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const Tag = as;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const directionClass =
    direction === "left"
      ? styles["reveal-left"]
      : direction === "right"
      ? styles["reveal-right"]
      : styles["reveal-up"];

  return (
    <Tag
      ref={ref}
      className={`${className} ${directionClass} ${
        visible ? styles["reveal-visible"] : ""
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

const Heroawards = () => {
  return (
    <section className={styles["heroawards-main"]}>
      <div className={styles["heroawards-video-wrapper"]}>
        <video
          className={styles["awards-video"]}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/awards/awards.mp4" type="video/mp4" />
        </video>
      </div>

      <div className={styles["textual-content"]}>
        {/* Badge + Heading — saath mein center mein */}
        <div className={styles["headings-group"]}>
          <Reveal direction="up" delay={0}>
            <div className={styles["top"]}>
              <h3>[ Our Identity // Vol. 01 ]</h3>
            </div>
          </Reveal>

          <Reveal direction="up" delay={150}>
            <h1 className={styles["heading-row"]}>
              {headings.map((heading, index) => (
                <span
                  key={index}
                  className={
                    heading.style === "outline"
                      ? styles["text-outline"]
                      : styles["text-solid"]
                  }
                >
                  {heading.text}
                </span>
              ))}
            </h1>
          </Reveal>
        </div>

        {/* Description box — bottom pe */}
        <div className={styles["bottom-last"]}>
          <Reveal direction="up" delay={300}>
            <h2>
              Recognition from the world's most prestigious institutions. A testament to our uncompromising vision and narrative rigor.
            </h2>
          </Reveal>
        </div>

      </div>
    </section>
  );
};

export default Heroawards;