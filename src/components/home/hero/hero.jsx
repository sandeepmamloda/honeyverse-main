"use client";

import styles from "./hero.module.css";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const sections = [
  { video: "/videos/home/first.mp4",  title: "MOST DAYS OUT",   subtitle: "CANERA TRIX"   },
  { video: "/videos/home/second.mp4", title: "AURORA BEACH",    subtitle: "Braided Truce" },
  { video: "/videos/home/third.mp4",  title: "Brutalist Arch.", subtitle: "Russian River" },
   { video: "/videos/home/third.mp4",  title: "Brutalist Arch.", subtitle: "Russian River" },
  // 👉 add as many more sections as you like — the desktop strip will
  // still only ever show 3 at a time, and becomes swipeable.
];

const INTERVAL    = 3500;
const FLIP_MS     = 900;
const WINDOW_SIZE  = 3;      // how many cards are visible at once on desktop
const SWIPE_THRESHOLD = 40;  // px of horizontal drag before it counts as a swipe

export default function Hero() {
  const [current,     setCurrent]     = useState(0);
  const [next,        setNext]        = useState(null);
  const [flipPhase,   setFlipPhase]   = useState("idle"); // "idle" | "first-half" | "second-half"
  const [progressKey, setProgressKey] = useState(0);
  const [windowStart, setWindowStart] = useState(0); // index of first visible card in the strip

  const currentRef   = useRef(0);
  const flippingRef  = useRef(false);
  const autoTimer    = useRef(null);
  const phaseTimer   = useRef(null);
  const dragRef      = useRef({ startX: 0, dragging: false });

  const total = sections.length;
  const maxWindowStart = Math.max(0, total - WINDOW_SIZE);

  function flipTo(nextIdx) {
    if (flippingRef.current) return;
    if (nextIdx === currentRef.current) return;

    flippingRef.current = true;
    setNext(nextIdx);
    setFlipPhase("first-half"); // 0° → 90°  (screen tilts away)

    // At 90° the screen is edge-on → swap the video
    phaseTimer.current = setTimeout(() => {
      currentRef.current = nextIdx;
      setCurrent(nextIdx);
      setFlipPhase("second-half"); // 90° → 0°  (screen comes back with new video)
      setProgressKey(k => k + 1);

      phaseTimer.current = setTimeout(() => {
        setFlipPhase("idle");
        setNext(null);
        flippingRef.current = false;
      }, FLIP_MS / 2);

    }, FLIP_MS / 2);
  }

  function scheduleAuto() {
    clearTimeout(autoTimer.current);
    autoTimer.current = setTimeout(() => {
      const n = (currentRef.current + 1) % total;
      flipTo(n);
      scheduleAuto();
    }, INTERVAL);
  }

  useEffect(() => {
    scheduleAuto();
    return () => {
      clearTimeout(autoTimer.current);
      clearTimeout(phaseTimer.current);
    };
  }, []);

  // keep the active card inside the visible 3-card window whenever
  // `current` changes — whether that change came from autoplay, a
  // thumbnail click, or a swipe.
  useEffect(() => {
    setWindowStart(w => {
      if (current < w) return current;
      if (current > w + WINDOW_SIZE - 1) {
        return Math.min(current - WINDOW_SIZE + 1, maxWindowStart);
      }
      return w;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  function handleThumb(idx) {
    if (flippingRef.current) return;
    clearTimeout(autoTimer.current);
    flipTo(idx);
    scheduleAuto();
  }

  // ── swipe / drag the strip to move the 3-card window ──
  function shiftWindow(dir) {
    setWindowStart(w => {
      let n = w + dir;
      if (n < 0) n = 0;
      if (n > maxWindowStart) n = maxWindowStart;
      return n;
    });
  }

  function handleDragStart(e) {
    dragRef.current.dragging = true;
    dragRef.current.startX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
  }

  function handleDragEnd(e) {
    if (!dragRef.current.dragging) return;
    dragRef.current.dragging = false;
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? dragRef.current.startX;
    const delta = endX - dragRef.current.startX;
    if (delta <= -SWIPE_THRESHOLD) shiftWindow(1);
    else if (delta >= SWIPE_THRESHOLD) shiftWindow(-1);
  }

  // which video src to show: during second-half show the NEXT video
  const displayIdx = flipPhase === "second-half" && next !== null ? next : current;

  // which CSS class drives the flip
  const flipClass =
    flipPhase === "first-half"  ? styles.flipFirstHalf  :
    flipPhase === "second-half" ? styles.flipSecondHalf :
    "";

  return (
    <section className={styles.wrapper}>

      {/* ══ SINGLE SCREEN — the one that flips ════════ */}
      <div className={`${styles.screen} ${flipClass}`}>
        <video
          key={displayIdx}          /* re-mount triggers new src */
          autoPlay muted loop playsInline
          className={styles.bg}
        >
          <source src={sections[displayIdx].video} type="video/mp4" />
        </video>
        <div className={styles.vignette} />
      </div>

      {/* ══ HEADLINE ═══════════════════════════════════ */}
      <div className={styles.headline}>
        <h1 className={styles.h1}>ENTER THE VERSE</h1>
        <p  className={styles.sub}>
          An award winning production company that creates high-impact content that's impossible to ignore.
        </p>
      </div>

      {/* ══ COUNTER ════════════════════════════════════ */}
      <div className={styles.counter}>
        {String(current + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(total).padStart(2, "0")}
      </div>

      {/* ══ BOTTOM STRIP ═══════════════════════════════ */}
      <footer className={styles.bottom}>
        <div
          className={styles.stripWrap}
          onPointerDown={handleDragStart}
          onPointerUp={handleDragEnd}
          onPointerCancel={handleDragEnd}
        >
          <div
            className={styles.strip}
            style={{ transform: `translateX(-${windowStart * (100 / WINDOW_SIZE)}%)` }}
          >
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