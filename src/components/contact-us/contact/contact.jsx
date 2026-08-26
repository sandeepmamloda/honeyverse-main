"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./contact.module.css";

/* ── Reusable scroll-reveal wrapper (same architecture used across the site) ── */
const Reveal = ({ children, className = "", delay = 0, as = "div", direction = "up" }) => {
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
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Reduced, viewport-safe transform distances — no element ever escapes
     its parent's box far enough to trigger horizontal/vertical scrollbars. */
  const hiddenTransform =
    direction === "left"
      ? "translateX(-28px) scale(0.98)"
      : direction === "right"
      ? "translateX(28px) scale(0.98)"
      : direction === "pop"
      ? "translateY(24px) scale(0.9) rotate(-2deg)"
      : direction === "scale"
      ? "translateY(16px) scale(0.94)"
      : "translateY(36px) scale(0.98)";

  let style;
  if (phase === "settled") {
    style = undefined;
  } else {
    style = {
      opacity: phase === "entering" ? 1 : 0,
      transform: phase === "entering" ? "none" : hiddenTransform,
      transition:
        direction === "pop"
          ? "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.34,1.56,0.64,1)"
          : "opacity 1.1s cubic-bezier(0.16,1,0.3,1), transform 1.1s cubic-bezier(0.16,1,0.3,1)",
      transitionDelay: `${delay}ms`,
      willChange: "opacity, transform",
      maxWidth: "100%",
    };
  }

  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      onTransitionEnd={(e) => {
        if (phase === "entering" && e.propertyName === "opacity") setPhase("settled");
      }}
    >
      {children}
    </Tag>
  );
};

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.167 10h11.666" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 4.167 15.833 10 10 15.833" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", synopsis: "" });
  const [ripples, setRipples] = useState([]);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: hook up actual submit logic
    console.log("Dossier submitted:", form);
  };

  const spawnRipple = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 650);
  };

  return (
    /* overflow-x hidden guard: any transform-based reveal is clipped safely
       at the section boundary, so it can never cause page-level scrollbars */
    <section className={styles["contact-main"]} style={{ overflowX: "hidden", overflowY: "visible" }}>
      <div className={styles["contact-grid"]} style={{ maxWidth: "100%" }}>
        {/* ── LEFT: INTRO + CONTACT + IMAGE ── */}
        <div className={styles["left-col"]} style={{ minWidth: 0, maxWidth: "100%" }}>
          <div className={styles["text-block"]}>
            <Reveal as="h2" className={styles["intro-text"]} direction="left" delay={0}>
              We are actively seeking uncompromising filmmakers. We do not
              evaluate standard scripts without visual context.
            </Reveal>

            <div className={styles["contact-row"]} style={{ maxWidth: "100%" }}>
              <Reveal
                as="div"
                className={styles["contact-block"]}
                direction="left"
                delay={200}
              >
                <span className={styles["contact-label"]}>DIRECT LINE /</span>
                <a href="mailto:pitch@lumiere.co">PITCH@LUMIERE.CO</a>
                <a href="mailto:press@lumiere.co">PRESS@LUMIERE.CO</a>
                <a href="tel:+493012345678">+49 30 1234 5678</a>
              </Reveal>

              <Reveal
                as="div"
                className={styles["contact-block"]}
                direction="left"
                delay={340}
              >
                <span className={styles["contact-label"]}>HEADQUARTERS /</span>
                <span>199 BRUTALIST AVE.</span>
                <span>SECTOR 4</span>
                <span>BERLIN, DE</span>
              </Reveal>
            </div>
          </div>

          <Reveal as="div" className={styles["image-wrap"]} direction="scale" delay={250}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles["intro-image"]}
              src="/images/contact/brutalist.jpg"
              alt="Brutalist architecture"
            />
          </Reveal>
        </div>

        {/* ── RIGHT: NOTICE + FORM ── */}
        <div className={styles["right-col"]} style={{ minWidth: 0, maxWidth: "100%" }}>
          <Reveal as="div" className={styles["notice-box"]} direction="right" delay={100}>
            <span className={styles["notice-label"]}>NOTICE</span>
            <p>
              Required materials: Directorial Treatments, Visual Lookbooks, or Concept Reels.
            </p>
          </Reveal>

          <form className={styles["contact-form"]} onSubmit={handleSubmit}>
            {/* 01 — Name */}
            <Reveal as="div" className={styles["form-field"]} direction="up" delay={280}>
              <label className={styles["field-index"]} htmlFor="filmmaker-name">
                01. FILMMAKER NAME
              </label>
              <input
                id="filmmaker-name"
                type="text"
                className={styles["field-input"]}
                placeholder="ENTER DESIGNATION"
                value={form.name}
                onChange={handleChange("name")}
                required
              />
            </Reveal>

            {/* 02 — Email */}
            <Reveal as="div" className={styles["form-field"]} direction="up" delay={400}>
              <label className={styles["field-index"]} htmlFor="return-vector">
                02. RETURN VECTOR
              </label>
              <input
                id="return-vector"
                type="email"
                className={styles["field-input"]}
                placeholder="EMAIL ADDRESS"
                value={form.email}
                onChange={handleChange("email")}
                required
              />
            </Reveal>

            {/* 03 — Synopsis */}
            <Reveal
              as="div"
              className={`${styles["form-field"]} ${styles["form-field-textarea"]}`}
              direction="up"
              delay={520}
            >
              <label className={styles["field-index"]} htmlFor="project-synopsis">
                03. PROJECT SYNOPSIS
              </label>
              <textarea
                id="project-synopsis"
                className={`${styles["field-input"]} ${styles["field-textarea"]}`}
                placeholder="TRANSMIT CONCEPT"
                rows={3}
                value={form.synopsis}
                onChange={handleChange("synopsis")}
                required
              />
            </Reveal>

            <Reveal as="div" direction="pop" delay={650}>
              <button
                type="submit"
                className={styles["submit-btn"]}
                style={{ position: "relative", overflow: "hidden" }}
                onClick={spawnRipple}
              >
                <span>SUBMIT DOSSIER</span>
                <ArrowIcon />
                {ripples.map((r) => (
                  <span
                    key={r.id}
                    style={{
                      position: "absolute",
                      left: r.x,
                      top: r.y,
                      width: 12,
                      height: 12,
                      marginLeft: -6,
                      marginTop: -6,
                      borderRadius: "50%",
                      background: "rgba(255,202,26,0.55)",
                      transform: "scale(0)",
                      animation: "contact-ripple-expand 0.65s ease-out forwards",
                      pointerEvents: "none",
                    }}
                  />
                ))}
              </button>
            </Reveal>
          </form>
        </div>
      </div>

      <style jsx global>{`
        @keyframes contact-ripple-expand {
          to {
            transform: scale(22);
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;