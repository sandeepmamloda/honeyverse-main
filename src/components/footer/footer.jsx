"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./footer.module.css";

const footerLinks = [
  ["BRAND", "AWARDS", "SERVICES"],
  ["TEAMS", "WORK", "VISUAL"],
  ["GALLERY", "CODE", "NEWS", "TIMELINE"],
];

/* =========================================================
   REVEAL COMPONENT
========================================================= */

const Reveal = ({
  children,
  className = "",
  delay = 0,
  as = "div",
  direction = "up",
}) => {
  const ref = useRef(null);
  const [phase, setPhase] = useState("hidden");

  const Tag = as;

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            setPhase("entering");
          });

          observer.unobserve(el);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -6% 0px",
      }
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

  const style =
    phase === "settled"
      ? undefined
      : {
          opacity: phase === "entering" ? 1 : 0,
          transform:
            phase === "entering"
              ? "none"
              : hiddenTransform,
          transition:
            "opacity 1.1s cubic-bezier(0.19,1,0.22,1), transform 1.1s cubic-bezier(0.19,1,0.22,1)",
          transitionDelay: `${delay}ms`,
          willChange: "opacity, transform",
        };

  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      onTransitionEnd={(e) => {
        if (
          phase === "entering" &&
          e.propertyName === "opacity"
        ) {
          setPhase("settled");
        }
      }}
    >
      {children}
    </Tag>
  );
};

/* =========================================================
   FOOTER
========================================================= */

const Footer = function () {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  /*
    IMPORTANT:

    wrapRef is ONLY used for measuring the footer position.

    The actual .footer-main remains the element that
    contains your original background, border-radius,
    padding, etc.
  */

  const wrapRef = useRef(null);

  const [tiltProgress, setTiltProgress] = useState(0);

  /* =========================================================
     SCROLL → 3D PROGRESS
  ========================================================= */

  useEffect(() => {
    const el = wrapRef.current;

    if (!el) return;

    let ticking = false;

    const computeProgress = () => {
      /*
        IMPORTANT:

        Measure the wrapper, NOT the transformed footer.

        This prevents rotateX() from affecting the
        calculation itself.
      */

      const rect = el.getBoundingClientRect();

      const vh =
        window.innerHeight ||
        document.documentElement.clientHeight;

      /*
        Animation starts when footer reaches 62%
        of viewport height.
      */

      const start = vh * 0.62;

      /*
        Animation completes when footer top reaches
        the top of the viewport.
      */

      const end = 0;

      let progress =
        (start - rect.top) /
        (start - end);

      progress = Math.min(
        1,
        Math.max(0, progress)
      );

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

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      onScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll
      );

      window.removeEventListener(
        "resize",
        onScroll
      );
    };
  }, []);

  /* =========================================================
     EASING
  ========================================================= */

  const easeOutQuint = (t) =>
    1 - Math.pow(1 - t, 5);

  const eased = easeOutQuint(
    tiltProgress
  );

  /*
    90deg = completely flat
    0deg  = completely upright
  */

  const tiltDeg =
    90 * (1 - eased);

  /* =========================================================
     FOOTER TRANSFORM
  ========================================================= */

  /*
    This is the important part.

    Before animation:
        rotateX(90deg)

    During animation:
        rotateX(90deg → 0deg)

    At 100%:
        transform: none

    "none" is important because it removes the
    transform completely instead of leaving even
    a tiny rotateX / translateZ behind.
  */

  const footerTransform =
    tiltProgress >= 1
      ? "none"
      : `rotateX(${tiltDeg}deg)`;

  /* =========================================================
     VIDEO → CANVAS
  ========================================================= */

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let animationFrame;

    const render = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      if (!width || !height) {
        animationFrame =
          requestAnimationFrame(render);

        return;
      }

      if (
        canvas.width !== width ||
        canvas.height !== height
      ) {
        canvas.width = width;
        canvas.height = height;
      }

      let fontSize = height * 0.85;

      ctx.font = `900 ${fontSize}px interblack, sans-serif`;

      const padding = width * 0.06;

      const maxWidth =
        width - padding * 2;

      while (
        ctx.measureText("HONEYVERSE").width >
          maxWidth &&
        fontSize > 10
      ) {
        fontSize -= 1;

        ctx.font = `900 ${fontSize}px interblack, sans-serif`;
      }

      /* ---------------------------------------------
         Draw video
      --------------------------------------------- */

      ctx.globalCompositeOperation =
        "source-over";

      ctx.drawImage(
        video,
        0,
        0,
        width,
        height
      );

      /* ---------------------------------------------
         Clip video into HONEYVERSE text
      --------------------------------------------- */

      ctx.globalCompositeOperation =
        "destination-in";

      ctx.textBaseline = "middle";
      ctx.textAlign = "left";

      ctx.fillText(
        "HONEYVERSE",
        padding,
        height * 0.52
      );

      ctx.globalCompositeOperation =
        "source-over";

      animationFrame =
        requestAnimationFrame(render);
    };

    const startRendering = () => {
      cancelAnimationFrame(animationFrame);
      render();
    };

    video.addEventListener(
      "play",
      startRendering
    );

    if (!video.paused) {
      startRendering();
    } else {
      video.play().catch(() => {});
    }

    return () => {
      cancelAnimationFrame(animationFrame);

      video.removeEventListener(
        "play",
        startRendering
      );
    };
  }, []);

  /* =========================================================
     BRAND REVEAL
  ========================================================= */

  const brandRevealPercent =
    (1 - eased) * 100;

  /* =========================================================
     JSX
  ========================================================= */

  return (
    /*
      OUTER WRAPPER

      No transform here.

      This keeps the measurement stable.
    */
    <div
      ref={wrapRef}
      style={{
        width: "100%",
        position: "relative",
        perspective: "1200px",
      }}
    >
      {/* =================================================
          ORIGINAL FOOTER

          IMPORTANT:

          .footer-main is BACK.

          Therefore your existing:
          - background-color
          - border-radius
          - padding
          - dimensions
          - other footer styling

          will continue working exactly as before.
      ================================================= */}

      <footer
        className={styles["footer-main"]}
        style={{
          /*
            3D setup
          */

          transformStyle: "preserve-3d",
          transformOrigin: "center bottom",

          /*
            Scroll controlled rotation
          */

          transform: footerTransform,

          /*
            Don't keep GPU optimization after the
            animation has completely finished.
          */

          willChange:
            tiltProgress >= 1
              ? "auto"
              : "transform",

          /*
            Prevent backside flickering while the
            footer is rotating.
          */

          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        {/* =================================================
            TOP SECTION
        ================================================= */}

        <div className={styles["footer-top"]}>
          <Reveal
            as="div"
            className={styles["footer-meta"]}
            direction="left"
            delay={0}
          >
            <span>LAT. 40.7128</span>
            <span>LONG. -74.0060</span>
            <span>EST. 2016</span>
          </Reveal>

          <Reveal
            as="div"
            className={styles["footer-tagline"]}
            direction="up"
            delay={120}
          >
            <p>
              SHAPING NARRATIVES THAT LINGER LONG AFTER
              THE CREDITS ROLL.
            </p>
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
                  <a key={link} href="#">
                    {link}
                  </a>
                ))}
              </Reveal>
            ))}
          </div>
        </div>

        {/* =================================================
            BIG TEXT + VIDEO
        ================================================= */}

        <div
          className={styles["footer-brand"]}
          style={{
            clipPath: `inset(0 ${brandRevealPercent}% 0 0)`,
          }}
        >
          <video
            ref={videoRef}
            className={
              styles["footer-video-hidden"]
            }
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src="/videos/home/first.mp4"
              type="video/mp4"
            />
          </video>

          <canvas
            ref={canvasRef}
            className={styles["footer-canvas"]}
          />
        </div>

        {/* =================================================
            BOTTOM BAR
        ================================================= */}

        <Reveal
          as="div"
          className={styles["footer-bottom"]}
          direction="up"
          delay={100}
        >
          <span>
            © 2026 LUMIÈRE PICTURES. ALL RIGHTS RESERVED.
          </span>

          <div
            className={
              styles["footer-bottom-links"]
            }
          >
            <a href="#">PRIVACY</a>
            <a href="#">TERMS</a>
          </div>
        </Reveal>
      </footer>
    </div>
  );
};

export default Footer;