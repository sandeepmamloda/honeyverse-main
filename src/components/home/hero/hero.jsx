"use client";

import styles from "./hero.module.css";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

const sections = [
  { video: "/videos/home/first.mp4",  title: "MOST DAYS OUT",   subtitle: "CANERA TRIX"   },
  { video: "/videos/home/second.mp4", title: "AURORA BEACH",    subtitle: "Braided Truce" },
  { video: "/videos/home/third.mp4",  title: "Brutalist Arch.", subtitle: "Russian River" },
];

const INTERVAL   = 3500; // ms between auto-flips
const FLIP_DUR   = 1400; // total flip duration ms — longer = smoother feel

// ─── easing ────────────────────────────────────────────────────────────────
// One continuous S-curve for the whole flip (no two-half jank)
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
// Slight elastic overshoot at the end — screen "lands"
function easeOutBack(t) {
  const c1 = 1.30158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}
function lerp(a, b, t) { return a + (b - a) * t; }

export default function Hero() {
  const [current,     setCurrent]     = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  const screenRef    = useRef(null);
  const videoRef     = useRef(null);
  const currentRef   = useRef(0);
  const flippingRef  = useRef(false);
  const rafRef       = useRef(null);
  const autoTimer    = useRef(null);
  const startTimeRef = useRef(0);
  const fromIdxRef   = useRef(0);
  const toIdxRef     = useRef(0);

  const total = sections.length;

  // ─── core animation tick ───────────────────────────────────────────────
  const tick = useCallback((now) => {
    const elapsed  = now - startTimeRef.current;
    const raw      = Math.min(elapsed / FLIP_DUR, 1); // 0 → 1

    const screen   = screenRef.current;
    const videoEl  = videoRef.current;
    if (!screen || !videoEl) return;

    // ── Phase split: first 50% = go away, second 50% = come back ──
    // But we use ONE continuous eased t, no gap
    let rotY, transZ, rotX, bright, scaleX;

    if (raw < 0.5) {
      // Going away: rotY 0 → 90, Z dips back, slight tilt down
      const t = easeInOutCubic(raw * 2); // remap 0-0.5 → 0-1
      rotY   = lerp(0,    90,   t);
      transZ = lerp(0,   -320,  t);
      rotX   = lerp(0,    5,    t);
      scaleX = lerp(1,    0.94, t);
      bright = lerp(1,    0,    t);

      // At exact midpoint, swap the video src
      if (raw > 0.49 && videoEl.dataset.idx !== String(toIdxRef.current)) {
        videoEl.dataset.idx = String(toIdxRef.current);
        videoEl.src = sections[toIdxRef.current].video;
        videoEl.load();
        videoEl.play().catch(() => {});
      }

    } else {
      // Coming back: rotY -90 → 0, Z returns forward with slight overshoot
      const t = easeInOutCubic((raw - 0.5) * 2); // remap 0.5-1 → 0-1
      const tBack = easeOutBack(t); // overshoot at the end

      rotY   = lerp(-90,  0,   t);      // rotation: clean cubic
      transZ = lerp(-320, 0,   tBack);  // Z: bounces slightly forward
      rotX   = lerp(5,    0,   t);
      scaleX = lerp(0.94, 1,   tBack);  // scale: elastic settle
      bright = lerp(0,    1,   t);
    }

    screen.style.transform =
      `perspective(900px) rotateY(${rotY}deg) rotateX(${rotX}deg) translateZ(${transZ}px) scaleX(${scaleX})`;
    screen.style.filter = `brightness(${bright})`;

    if (raw < 1) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      // Clean resting state
      screen.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px) scaleX(1)";
      screen.style.filter    = "brightness(1)";
      flippingRef.current    = false;
      currentRef.current     = toIdxRef.current;
      setCurrent(toIdxRef.current);
    }
  }, []);

  // ─── trigger a flip ────────────────────────────────────────────────────
  const flipTo = useCallback((nextIdx) => {
    if (flippingRef.current) return;
    if (nextIdx === currentRef.current) return;

    flippingRef.current  = true;
    fromIdxRef.current   = currentRef.current;
    toIdxRef.current     = nextIdx;
    startTimeRef.current = performance.now();
    setProgressKey(k => k + 1);

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  // ─── auto-advance ──────────────────────────────────────────────────────
  const scheduleAuto = useCallback(() => {
    clearTimeout(autoTimer.current);
    autoTimer.current = setTimeout(() => {
      const n = (currentRef.current + 1) % total;
      flipTo(n);
      scheduleAuto();
    }, INTERVAL);
  }, [flipTo, total]);

  useEffect(() => {
    scheduleAuto();
    return () => {
      clearTimeout(autoTimer.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [scheduleAuto]);

  function handleThumb(idx) {
    if (flippingRef.current) return;
    clearTimeout(autoTimer.current);
    flipTo(idx);
    scheduleAuto();
  }

  return (
    <section className={styles.wrapper}>

      {/* ══ SCREEN ════════════════════════════════════════════════ */}
      <div className={styles.stage}>
        <div ref={screenRef} className={styles.screen}>
          {/* Single <video> — src is swapped at midpoint via JS */}
          <video
            ref={videoRef}
            data-idx="0"
            src={sections[0].video}
            autoPlay muted loop playsInline
            className={styles.bg}
          />
          <div className={styles.vignette} />
        </div>
      </div>

      {/* ══ HEADLINE ══════════════════════════════════════════════ */}
      <div className={styles.headline}>
        <h1 className={styles.h1}>ENTER THE VERSE</h1>
        <p className={styles.sub}>
          An award winning production company that creates high-impact content that's impossible to ignore.
        </p>
      </div>

      {/* ══ COUNTER ═══════════════════════════════════════════════ */}
      <div className={styles.counter}>
        {String(current + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(total).padStart(2, "0")}
      </div>

      {/* ══ BOTTOM STRIP ══════════════════════════════════════════ */}
      <footer className={styles.bottom}>
        <div className={styles.stripWrap}>
          <div className={styles.strip}>
            {sections.map((s, i) => (
              <div
                key={i}
                onClick={() => handleThumb(i)}
                className={`${styles.card} ${i === current ? styles.cardActive : ""}`}
              >
                <div className={styles.thumb}>
                  <video autoPlay muted loop playsInline className={styles.thumbVid}>
                    <source src={s.video} type="video/mp4" />
                  </video>
                  {i === current && (
                    <div
                      key={progressKey}
                      className={styles.sweep}
                      style={{ animationDuration: `${INTERVAL}ms` }}
                    />
                  )}
                </div>
                <div className={styles.labels}>
                  <h2 className={styles.cardTitle}>{s.title}</h2>
                  <p  className={styles.cardSub}>{s.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.logoRow}>
          <span className={styles.logoBox}>
            <Image className={styles.logoImg} src="/images/home/c.png" alt="Logo" fill />
          </span>
          <span className={styles.year}>2026</span>
        </div>
      </footer>

    </section>
  );
}