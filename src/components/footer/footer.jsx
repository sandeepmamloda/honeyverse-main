"use client";
import { useEffect, useRef } from "react";
import styles from "./footer.module.css";

const footerLinks = [
  ["BRAND", "AWARDS", "SERVICES"],
  ["TEAMS", "WORK", "VISUAL"],
  ["GALLERY", "CODE", "NEWS", "TIMELINE"],
];

const Footer = function () {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

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

  return (
    <footer className={styles["footer-main"]}>

      {/* ── Top Section ── */}
      <div className={styles["footer-top"]}>
        <div className={styles["footer-meta"]}>
          <span>LAT. 40.7128</span>
          <span>LONG. -74.0060</span>
          <span>EST. 2016</span>
        </div>
        <div className={styles["footer-tagline"]}>
          <p>SHAPING NARRATIVES THAT LINGER LONG AFTER THE CREDITS ROLL.</p>
        </div>
        <div className={styles["footer-nav"]}>
          {footerLinks.map((col, i) => (
            <div key={i} className={styles["footer-nav-col"]}>
              {col.map((link) => (
                <a key={link} href="#">{link}</a>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Big Text + Video ── */}
      <div className={styles["footer-brand"]}>
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
      <div className={styles["footer-bottom"]}>
        <span>© 2026 LUMIÈRE PICTURES. ALL RIGHTS RESERVED.</span>
        <div className={styles["footer-bottom-links"]}>
          <a href="#">PRIVACY</a>
          <a href="#">TERMS</a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;