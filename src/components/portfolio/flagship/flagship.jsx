"use client";
import { useState } from "react";
import styles from "./flagship.module.css";

// ── VIDEO DATA ARRAY ──
const carouselVideos = [
  { id: 1, src: "/videos/portfolio/awards.mp4", link: "#" },
  { id: 2, src: "/videos/portfolio/decade.mp4", link: "#" },
  { id: 3, src: "/videos/portfolio/awards.mp4", link: "#" },
  { id: 4, src: "/videos/portfolio/hero.mp4", link: "#" },
  { id: 5, src: "/videos/portfolio/decade.mp4", link: "#" },
  { id: 6, src: "/videos/portfolio/awards.mp4", link: "#" },
  { id: 7, src: "/videos/portfolio/decade.mp4", link: "#" },
  { id: 8, src: "/videos/portfolio/hero.mp4", link: "#" },
];

const FlagshipCarousel = () => {
  const [rotation, setRotation] = useState(0);

  const handleRotate = (direction) => {
    if (direction === "next") {
      setRotation((prev) => prev - 45); // 8 items = 360/8 = 45 deg
    } else {
      setRotation((prev) => prev + 45);
    }
  };

  return (
    <section className={styles["flagship-main"]}>
      {/* ── HEADER LAYOUT ── */}
      <div className={styles["header-top"]}>
        <div className={styles["badge-wrapper"]}>
          {/* ── NEW CUSTOM SVG ICON ADDED ── */}
          <svg className={styles["badge-icon"]} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
            <path d="M10.417 8.07288C10.4173 7.93412 10.4545 7.79793 10.5248 7.67832C10.5951 7.55871 10.6961 7.45999 10.8172 7.39231C10.9383 7.32463 11.0753 7.29044 11.2141 7.29325C11.3528 7.29606 11.4883 7.33577 11.6066 7.4083L15.4232 9.75101C15.537 9.8209 15.6309 9.91879 15.6961 10.0353C15.7613 10.1518 15.7955 10.2831 15.7955 10.4166C15.7955 10.5501 15.7613 10.6814 15.6961 10.7979C15.6309 10.9145 15.537 11.0124 15.4232 11.0823L11.6066 13.426C11.4881 13.4986 11.3525 13.5383 11.2135 13.5411C11.0746 13.5438 10.9375 13.5094 10.8163 13.4415C10.6951 13.3736 10.5942 13.2745 10.524 13.1546C10.4538 13.0347 10.4169 12.8983 10.417 12.7593V8.07288Z" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.5 17.7084V21.875" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.33301 21.875H16.6663" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.833 3.125H4.16634C3.01575 3.125 2.08301 4.05774 2.08301 5.20833V15.625C2.08301 16.7756 3.01575 17.7083 4.16634 17.7083H20.833C21.9836 17.7083 22.9163 16.7756 22.9163 15.625V5.20833C22.9163 4.05774 21.9836 3.125 20.833 3.125Z" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          
          <div className={styles["badge-text"]}>
            <h3>[ 02 // CO-PRODUCTIONS ]</h3>
          </div>
        </div>
        <div className={styles["title-wrapper"]}>
          <h1 className={styles["main-title"]}>FLAGSHIP</h1>
        </div>
      </div>

      {/* ── 3D CAROUSEL WRAPPER ── */}
      <div className={styles["carousel-wrapper"]}>
        <div className={styles["scene"]}>
          <div 
            className={styles["carousel"]} 
            style={{ transform: `rotateY(${rotation}deg)` }}
          >
            {carouselVideos.map((video, index) => (
              <a
                key={video.id}
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles["carousel-item"]}
                style={{ "--i": index }}
              >
                <video
                  src={video.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={styles["carousel-video"]}
                />
              </a>
            ))}
          </div>
        </div>

        {/* ── NAVIGATION CONTROLS ── */}
        <div className={styles["controls"]}>
          <button 
            className={styles["nav-btn"]} 
            onClick={() => handleRotate("prev")}
          >
            ← Prev
          </button>
          <button 
            className={styles["nav-btn"]} 
            onClick={() => handleRotate("next")}
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FlagshipCarousel;