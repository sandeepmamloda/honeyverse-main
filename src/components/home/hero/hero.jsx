"use client";

import styles from "./hero.module.css";
import Image from "next/image";

export default function Hero() {
  return (
    <section className={styles.wrapper}>

      {/* ══ SINGLE BACKGROUND VIDEO ════════════════════ */}
      <div className={styles.screen}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={styles.bg}
        >
          <source src="/videos/home/first.mp4" type="video/mp4" />
        </video>
        <div className={styles.vignette} />
      </div>

      {/* ══ HEADLINE ═══════════════════════════════════ */}
      <div className={styles.headline}>
        <h1 className={styles.h1}>
          <span>ENTER</span>
          <span>THE</span>
          <span>VERSE</span>
        </h1>
        <p className={styles.sub}>
          An award winning production company that creates high-impact content that's impossible to ignore.
        </p>
      </div>

      {/* ══ FOOTER ═════════════════════════════════════ */}
      <footer className={styles.bottom}>
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