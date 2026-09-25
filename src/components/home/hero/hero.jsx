"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./hero.module.css";

/* Loader khatam hone ke baad "Enter the Verse" kitni der (ms) dikhe,
   uske baad wo smoothly hat kar "Most Days Out" aata hai. */
const HOLD_MS = 1200;

/* Intro ka subtitle reveal poora hone tak ka time (ms) — isse pehle swap shuru nahi hoga */
const INTRO_REVEAL_MS = 2100;

/* Videos: text swap ke saath video bhi crossfade hota hai.
   TODO: SECOND_VIDEO ka apna real path daalo. */
const FIRST_VIDEO = "/videos/home/first.mp4";
const SECOND_VIDEO = "/videos/home/second.mp4";

/* Crossfade ka time (ms) — hero.module.css ke `.bg` transition (1.2s) se match rakho */
const VIDEO_FADE_MS = 1200;

/* ══════════════════════════════
   REVEAL HELPERS — SCROLL BASED
   Section viewport me aane par hi "ready" true hota hai (sirf ek baar).
   threshold ab primitive hai, isliye effect har render par re-run nahi hota.
══════════════════════════════ */
const useInViewOnce = (threshold = 0.25) => {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, ready];
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
  ready = false,
  delay = 0,
  as = "div",
  direction = "left",
  duration = 1.1,
  style: extraStyle = {},
  ...rest
}) => {
  const Tag = as;

  const style = {
    clipPath: ready ? "inset(0 0 0 0)" : clipStart[direction],
    WebkitClipPath: ready ? "inset(0 0 0 0)" : clipStart[direction],
    opacity: ready ? 1 : 0,
    transitionProperty: "clip-path, -webkit-clip-path, opacity",
    transitionDuration: `${duration}s, ${duration}s, 0.1s`,
    transitionTimingFunction: "cubic-bezier(0.83,0,0.17,1)",
    transitionDelay: `${delay}ms`,
    willChange: "clip-path, opacity",
    ...extraStyle,
  };

  return (
    <Tag className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
};

const headlineWords = ["Enter", "the", "Verse"];

export default function Hero() {
  const [sectionRef, ready] = useInViewOnce(0.25);
  const [swapped, setSwapped] = useState(false);

  const videoARef = useRef(null); // first video  (Enter the Verse)
  const videoBRef = useRef(null); // second video (Most Days Out)
  const inViewRef = useRef(false);
  const swappedRef = useRef(false);
  const aRetiredRef = useRef(false);

  /* Section viewport me aaye + loader khatam ho -> HOLD_MS ke baad swap */
  useEffect(() => {
    if (!ready || swapped) return;

    const readyAt = Date.now();
    let holdTimer;

    const startSwap = () => {
      // intro ka reveal poora hone ke baad hi HOLD_MS gino
      const wait =
        Math.max(0, readyAt + INTRO_REVEAL_MS - Date.now()) + HOLD_MS;
      holdTimer = setTimeout(() => setSwapped(true), wait);
    };

    const onLoaderDone = () => {
      window.removeEventListener("loader:done", onLoaderDone);
      startSwap();
    };

    // chhota delay: taaki Loader ka effect pehle flag set kar de
    const checkTimer = setTimeout(() => {
      if (window.__loaderDone !== false) {
        startSwap(); // loader already khatam (ya page par loader hi nahi)
      } else {
        window.addEventListener("loader:done", onLoaderDone);
      }
    }, 100);

    return () => {
      clearTimeout(checkTimer);
      clearTimeout(holdTimer);
      window.removeEventListener("loader:done", onLoaderDone);
    };
  }, [ready, swapped]);

  /* ══ VIDEO KEEP-ALIVE + SWAP ══
     • muted ko DOM property se force karte hain (autoplay ke liye zaroori)
     • section viewport me ho to hi play, off-screen par pause
     • unwanted pause/stall par dobara play()
     • swap hone par: second video 0s se start hota hai aur first ke upar
       fade-in hota hai; fade ke baad first video pause (resources bachte hain) */
  useEffect(() => {
    const a = videoARef.current;
    const b = videoBRef.current;
    const section = sectionRef.current;
    if (!a || !b || !section) return;

    swappedRef.current = swapped;

    [a, b].forEach((v) => {
      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;
    });

    // Kaun sa video abhi chalna chahiye
    const shouldPlay = (v) =>
      v === a ? !aRetiredRef.current : swappedRef.current;

    const tryPlay = (v) => {
      if (document.hidden || !inViewRef.current || !shouldPlay(v)) return;
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    const tryAll = () => {
      tryPlay(a);
      tryPlay(b);
    };

    let retireTimer;
    if (swapped) {
      try {
        b.currentTime = 0;
      } catch (e) {}
      tryPlay(b);
      retireTimer = setTimeout(() => {
        aRetiredRef.current = true;
        a.pause();
      }, VIDEO_FADE_MS + 100);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) tryAll();
        else {
          a.pause();
          b.pause();
        }
      },
      { threshold: 0.05 }
    );
    io.observe(section);

    const events = ["loadeddata", "canplay", "pause", "stalled", "waiting"];
    const handlers = [a, b].map((v) => {
      const h = () => tryPlay(v);
      events.forEach((ev) => v.addEventListener(ev, h));
      return [v, h];
    });

    document.addEventListener("visibilitychange", tryAll);
    window.addEventListener("loader:done", tryAll);

    return () => {
      clearTimeout(retireTimer);
      io.disconnect();
      handlers.forEach(([v, h]) =>
        events.forEach((ev) => v.removeEventListener(ev, h))
      );
      document.removeEventListener("visibilitychange", tryAll);
      window.removeEventListener("loader:done", tryAll);
    };
  }, [sectionRef, swapped]);

  return (
    <section ref={sectionRef} className={styles.wrapper}>
      {/* ══ BACKGROUND VIDEOS (crossfade) ══
          NOTE: .screen ya videos ke parents par opacity nahi lagayi —
          fade sirf second video par hai. */}
      <div className={styles.screen}>
        {/* First video: hamesha neeche */}
        <video
          ref={videoARef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={styles.bg}
        >
          <source src={FIRST_VIDEO} type="video/mp4" />
        </video>

        {/* Second video: swap par first ke upar fade-in */}
        <video
          ref={videoBRef}
          muted
          loop
          playsInline
          preload="auto"
          className={`${styles.bg} ${swapped ? "" : styles.bgHidden}`}
          aria-hidden="true"
        >
          <source src={SECOND_VIDEO} type="video/mp4" />
        </video>

        <div className={styles.vignette} />
      </div>

      {/* ══ CENTER STAGE: intro aur outro ek hi jagah par stack hain ══ */}
      <div className={styles.headline}>
        <div className={styles.stage}>
          {/* ── INTRO: "Enter the Verse" ── */}
          <div
            className={`${styles.intro} ${swapped ? styles.introOut : ""}`}
            aria-hidden={swapped}
          >
            <h1 className={styles.h1}>
              {headlineWords.map((word, index) => (
                <Reveal
                  key={word}
                  as="span"
                  ready={ready}
                  direction="up"
                  duration={1.2}
                  delay={250 + index * 200}
                >
                  {word}
                  {index < headlineWords.length - 1 ? " " : ""}
                </Reveal>
              ))}
            </h1>

            <Reveal
              as="p"
              ready={ready}
              direction="up"
              duration={1.2}
              delay={900}
              className={styles.sub}
            >
              An award-winning production company telling women-led and South
              Asian diaspora stories.
            </Reveal>
          </div>

          {/* ── OUTRO: "Most Days Out" (glass card) ── */}
          <div
            className={`${styles.outro} ${swapped ? styles.outroActive : ""}`}
            aria-hidden={!swapped}
          >
            {/* NOTE: glassCard ke ancestors par opacity/filter/clip-path
                nahi hona chahiye, warna backdrop blur kaam nahi karta. */}
            <div
              className={`${styles.glassCard} ${swapped ? styles.glassIn : ""}`}
            >
              <div className={styles.outroText}>
                <Reveal
                  as="h2"
                  ready={swapped}
                  direction="up"
                  duration={1.1}
                  delay={500}
                  className={styles.outroTitle}
                >
                  HEER
                </Reveal>

                <Reveal
                  as="p"
                  ready={swapped}
                  direction="up"
                  duration={1.1}
                  delay={700}
                  className={styles.outroSub}
                >
                  Best Short, London South Asian Film Festival
                </Reveal>
              </div>

              <Reveal
                ready={swapped}
                direction="up"
                duration={1.1}
                delay={900}
                className={styles.ctaRow}
                style={
                  swapped
                    ? { clipPath: "inset(-16px)", WebkitClipPath: "inset(-16px)" }
                    : {}
                }
              >
                {/* TODO: apne real links daalo */}
                <a href="/portfolio" className={styles.btnPrimary}>
                  Watch our work
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="/contact-us" className={styles.btnGhost}>
                  Work with us
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* ══ FOOTER ══ */}
      <div className={styles.bottom}>
        <div className={styles.logoRow}>
          <span className={styles.copyMark} aria-hidden="true">©</span>
          <span className={styles.year}>2026</span>
        </div>
      </div>
    </section>
  );
}