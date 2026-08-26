"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./footer.module.css";

const footerLinks = [
  ["BRAND", "AWARDS", "SERVICES"],
  ["TEAMS", "WORK", "VISUAL"],
  ["GALLERY", "CODE", "NEWS", "TIMELINE"],
];

/* Reusable scroll-reveal wrapper — same architecture used across the site */
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

  const hiddenTransform =
    direction === "left"
      ? "translateX(-26px)"
      : direction === "right"
      ? "translateX(26px)"
      : "translateY(30px)";

  let style;
  if (phase === "settled") {
    style = undefined;
  } else {
    style = {
      opacity: phase === "entering" ? 1 : 0,
      transform: phase === "entering" ? "none" : hiddenTransform,
      transition:
        "opacity 1.1s cubic-bezier(0.19,1,0.22,1), transform 1.1s cubic-bezier(0.19,1,0.22,1)",
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
        if (phase === "entering" && e.propertyName === "opacity") setPhase("settled");
      }}
    >
      {children}
    </Tag>
  );
};

const Footer = function () {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  // ── Scroll-driven 3D rise, matching the reference: parent = perspective
  // camera, child = preserve-3d + transform-origin "center bottom", rotating
  // from 90deg (flat/hidden) to 0deg (upright). Trigger point delayed so the
  // rotation only kicks in once the footer is meaningfully in view — not the
  // instant its top edge appears at the bottom of the screen.
  const wrapRef = useRef(null);
  const [tiltProgress, setTiltProgress] = useState(0); // 0 = flat (90deg), 1 = upright (0deg)

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    let ticking = false;

    const computeProgress = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      // Delayed start: footer top must scroll up to 62% of the viewport
      // height (i.e. the section is already well into view) before the
      // rotation begins at all. It then finishes once the top has risen to
      // -20% of the viewport (a bit above the top edge) — a long, slow,
      // clearly perceptible range.
      const start = vh * 0.62;
      const end = vh * -0.2;

      let progress = (start - rect.top) / (start - end);
      progress = Math.min(1, Math.max(0, progress));
      setTiltProgress(progress);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(computeProgress);
        ticking = true;
      }
    };

    computeProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Same cubic-bezier(0.22, 1, 0.36, 1) feel as the reference, approximated
  // as an easing function applied to scroll progress for a smooth settle.
  const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);
  const eased = easeOutQuint(tiltProgress);
  const tiltDeg = 90 * (1 - eased); // 90deg (flat) -> 0deg (upright)

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");

    const render = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      // Font size dynamically set karo taaki text fit ho
      let fontSize = canvas.height * 0.85;
      ctx.font = `900 ${fontSize}px interblack, sans-serif`;

      // Text width check karo aur fit hone tak shrink karo
      const padding = canvas.width * 0.06;
      const maxWidth = canvas.width - padding * 2;
      while (ctx.measureText("HONEYVERSE").width > maxWidth && fontSize > 10) {
        fontSize -= 1;
        ctx.font = `900 ${fontSize}px interblack, sans-serif`;
      }

      // Video draw karo
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Text clip
      ctx.globalCompositeOperation = "destination-in";
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      ctx.fillText("HONEYVERSE", padding, canvas.height * 0.52);

      requestAnimationFrame(render);
    };

    video.addEventListener("play", render);
    video.play();

    return () => {
      video.removeEventListener("play", render);
    };
  }, []);

  // Canvas wipe-reveal is now tied to the SAME scroll progress driving the
  // 3D rise, instead of its own separate IntersectionObserver. The old
  // separate observer measured getBoundingClientRect() while the footer was
  // sitting under a rotateX(90deg) transform, which distorted the rect and
  // made the 0.2 threshold unreliable — the canvas would stay stuck at
  // "inset(0 100% 0 0)" (fully hidden) forever. Driving it off `eased`
  // guarantees it always reaches full reveal once the rotation completes.
  const brandRevealPercent = (1 - eased) * 100;

  return (
    // ── Camera / perspective container (matches reference's .scene) ──
    <div
      ref={wrapRef}
      style={{ perspective: "1000px" }}
    >
      <footer
        className={styles["footer-main"]}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center bottom",
          transform: `rotateX(${tiltDeg}deg)`,
          willChange: "transform",
        }}
      >

        {/* ── Top Section ── */}
        <div className={styles["footer-top"]}>
          <Reveal as="div" className={styles["footer-meta"]} direction="left" delay={0}>
            <span>LAT. 40.7128</span>
            <span>LONG. -74.0060</span>
            <span>EST. 2016</span>
          </Reveal>

          <Reveal as="div" className={styles["footer-tagline"]} direction="up" delay={120}>
            <p>SHAPING NARRATIVES THAT LINGER LONG AFTER THE CREDITS ROLL.</p>
          </Reveal>

          <div className={styles["footer-nav"]}>
            {footerLinks.map((col, i) => (
              <Reveal
                key={i}
                as="div"
                className={styles["footer-nav-col"]}
                direction="right"
                delay={220 + i * 110}
              >
                {col.map((link) => (
                  <a key={link} href="#">{link}</a>
                ))}
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── Big Text + Video ── */}
        <div
          className={styles["footer-brand"]}
          style={{
            clipPath: `inset(0 ${brandRevealPercent}% 0 0)`,
          }}
        >
          <video
            ref={videoRef}
            className={styles["footer-video-hidden"]}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/home/first.mp4" type="video/mp4" />
          </video>

          <canvas ref={canvasRef} className={styles["footer-canvas"]} />
        </div>

        {/* ── Bottom Bar ── */}
        <Reveal as="div" className={styles["footer-bottom"]} direction="up" delay={100}>
          <span>© 2026 LUMIÈRE PICTURES. ALL RIGHTS RESERVED.</span>
          <div className={styles["footer-bottom-links"]}>
            <a href="#">PRIVACY</a>
            <a href="#">TERMS</a>
          </div>
        </Reveal>

      </footer>
    </div>
  );
};

export default Footer;