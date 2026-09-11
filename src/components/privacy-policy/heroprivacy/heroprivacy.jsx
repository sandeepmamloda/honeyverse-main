"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import styles from "./heroprivacy.module.css";

gsap.registerPlugin(ScrollTrigger);

const Heroprivacy = function () {
  const sectionRef  = useRef(null);
  const badgeRef    = useRef(null);
  const h1Ref       = useRef(null);
  const subHeadRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power4.out" },
      });

      // ── 1. Badge: bottom reveal ──
      tl.from(badgeRef.current, {
        clipPath: "inset(100% 0% 0% 0%)",
        y: 20,
        duration: 1.1,
      });

      // ── 2. H1 "Privacy Policy": bottom reveal ──
      tl.from(h1Ref.current, {
        clipPath: "inset(100% 0% 0% 0%)",
        y: 50,
        duration: 1.4,
      }, "-=0.7");

      // ── 3. Sub-heading: bottom reveal ──
      tl.from(subHeadRef.current, {
        clipPath: "inset(100% 0% 0% 0%)",
        y: 30,
        duration: 1.2,
      }, "-=0.9");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles["heroprivacy-wrapper"]}
      aria-label="Honeyverse - Privacy Policy"
    >
      <div className={styles["heroprivacy-main"]}>

        <div ref={badgeRef} className={styles["legal-badge"]}>
          <span aria-hidden="true"></span>
          <span>Legal</span>
        </div>

        <h1 ref={h1Ref} className={styles["policy-title"]}>
          Privacy Policy
        </h1>

        <h3 ref={subHeadRef} className={styles["sub-heading"]}>
          How Kayana Ltd collects, uses, and protects personal data in connection with the Fiscal platform.
        </h3>

      </div>
    </section>
  );
};

export default Heroprivacy;