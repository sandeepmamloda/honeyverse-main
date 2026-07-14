"use client";
import styles from "./lookbook.module.css";
import { useState, useEffect } from "react";

const galleryItems = [
  {
    id: 1,
    className: "grid-main",
    src: "/images/lookbook/lookbook-1.jpg",
    alt: "Argent Coffee neon noir shoot",
    badge: { type: "pill", label: "NEON_NOIR_01" },
  },
  {
    id: 2,
    className: "grid-top-right",
    src: "/images/lookbook/lookbook-2.jpg",
    alt: "Brutalist architecture form study",
    badge: { type: "tag", label: "FORM" },
  },
  {
    id: 3,
    className: "grid-bottom-right",
    src: "/images/lookbook/lookbook-3.jpg",
    alt: "Interiors Euro location scout",
    badge: { type: "center", label: "INTERIORS EURO" },
  },
  {
    id: 4,
    className: "grid-wide",
    src: "/images/lookbook/lookbook-4.jpg",
    alt: "Wide scope mountain landscape",
    badge: { type: "scope", label: "SCOPE & SCALE : WIDE" },
  },
];

const LookBook = () => {
  const [openImage, setOpenImage] = useState(null); // holds the clicked gallery item, or null when closed
  const [activeIndex, setActiveIndex] = useState(0); // which item is auto-expanded right now
  const [isPaused, setIsPaused] = useState(false);   // true while the user is hovering manually

  // auto-cycle through the gallery items every 2.5s, unless paused by hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % galleryItems.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [isPaused]);

  // close on Escape key
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") setOpenImage(null);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // lock page scroll while lightbox is open
  useEffect(() => {
    document.body.style.overflow = openImage ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [openImage]);

  return (
    <section className={styles["lookbook-main"]}>

      {/* ── HEADER LAYOUT ── */}
      <div className={styles["header-top"]}>
        <div className={styles["badge-wrapper"]}>
          {/* Custom SVG Icon — same style as optical-signature.jsx, no bordered box */}
          <svg className={styles["badge-icon"]} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
            <path d="M10.417 8.07288C10.4173 7.93412 10.4545 7.79793 10.5248 7.67832C10.5951 7.55871 10.6961 7.45999 10.8172 7.39231C10.9383 7.32463 11.0753 7.29044 11.2141 7.29325C11.3528 7.29606 11.4883 7.33577 11.6066 7.4083L15.4232 9.75101C15.537 9.8209 15.6309 9.91879 15.6961 10.0353C15.7613 10.1518 15.7955 10.2831 15.7955 10.4166C15.7955 10.5501 15.7613 10.6814 15.6961 10.7979C15.6309 10.9145 15.537 11.0124 15.4232 11.0823L11.6066 13.426C11.4881 13.4986 11.3525 13.5383 11.2135 13.5411C11.0746 13.5438 10.9375 13.5094 10.8163 13.4415C10.6951 13.3736 10.5942 13.2745 10.524 13.1546C10.4538 13.0347 10.4169 12.8983 10.417 12.7593V8.07288Z" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.5 17.7084V21.875" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.33301 21.875H16.6663" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.833 3.125H4.16634C3.01575 3.125 2.08301 4.05774 2.08301 5.20833V15.625C2.08301 16.7756 3.01575 17.7083 4.16634 17.7083H20.833C21.9836 17.7083 22.9163 16.7756 22.9163 15.625V5.20833C22.9163 4.05774 21.9836 3.125 20.833 3.125Z" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className={styles["badge-text"]}>
            <h3>[ 02 // ARCHIVES ]</h3>
          </div>
        </div>
        <span className={styles["header-line"]}></span>
      </div>

      {/* ── BIG TITLE ── */}
      <div className={styles["title-wrapper"]}>
        <h1 className={styles["main-title"]}>THE LOOKBOOK</h1>
      </div>

      {/* ── GALLERY GRID (accordion hover) ── */}
      <div className={styles["gallery-grid"]}>
        {galleryItems.map((item, index) => (
          <div
            key={item.id}
            className={`${styles["gallery-item"]} ${index === activeIndex ? styles["active"] : ""}`}
            onClick={() => setOpenImage(item)}
            onMouseEnter={() => { setIsPaused(true); setActiveIndex(index); }}
            onMouseLeave={() => setIsPaused(false)}
          >
            <img src={item.src} alt={item.alt} className={styles["gallery-image"]} />

            {item.badge.type === "pill" && (
              <span className={styles["pill-badge"]}>{item.badge.label}</span>
            )}

            {item.badge.type === "tag" && (
              <span className={styles["tag-badge"]}>{item.badge.label}</span>
            )}

            {item.badge.type === "center" && (
              <div className={styles["center-overlay"]}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M6.66667 5.83333L7.91667 3.75H12.0833L13.3333 5.83333H16.25C16.7141 5.83333 17.0833 6.20257 17.0833 6.66667V15C17.0833 15.4641 16.7141 15.8333 16.25 15.8333H3.75C3.28587 15.8333 2.91667 15.4641 2.91667 15V6.66667C2.91667 6.20257 3.28587 5.83333 3.75 5.83333H6.66667Z" stroke="#FFF5FA" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="10" cy="10.8333" r="2.5" stroke="#FFF5FA" strokeWidth="1.3"/>
                </svg>
                <span>{item.badge.label}</span>
              </div>
            )}

            {item.badge.type === "scope" && (
              <div className={styles["scope-label"]}>
                <span className={styles["scope-dash"]}></span>
                {item.badge.label}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── LIGHTBOX ── */}
      {openImage && (
        <div className={styles["lightbox-backdrop"]} onClick={() => setOpenImage(null)}>
          <button
            className={styles["lightbox-close"]}
            onClick={() => setOpenImage(null)}
            aria-label="Close image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15" stroke="#FFF5FA" strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M5 5L15 15" stroke="#FFF5FA" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>

          <img
            src={openImage.src}
            alt={openImage.alt}
            className={styles["lightbox-image"]}
            onClick={(e) => e.stopPropagation()} /* clicking the image itself shouldn't close it */
          />

          <span className={styles["lightbox-caption"]}>{openImage.badge.label}</span>
        </div>
      )}
    </section>
  );
};

export default LookBook;