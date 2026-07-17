"use client";
import { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Awards", href: "/awards" },
  { label: "Brand", href: "/brand" },
  { label: "Teams", href: "/teams" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Visual", href: "/visual" },
  { label: "Gallery", href: "/gallery" },
  { label: "Code", href: "/code" },
  { label: "News", href: "/news" },
  { label: "Contact Us", href: "/contact" },
];

/* Images correspond 1:1 to the 11 menu items by index (stack carousel) */
const stackImages = [
  { src: "/images/header/menu/home.png", alt: "Home" },
  { src: "/images/header/menu/awards.jpg", alt: "Awards" },
  { src: "/images/header/menu/Brand.jpg", alt: "Brand" },
  { src: "/images/header/menu/Teams.jpg", alt: "Teams" },
  { src: "/images/header/menu/Portfolio.jpg", alt: "Portfolio" },
  { src: "/images/header/menu/Services.jpg", alt: "Services" },
  { src: "/images/header/menu/Visual.jpg", alt: "Visual" },
  { src: "/images/header/menu/Gallery.jpg", alt: "Gallery" },
  { src: "/images/header/menu/Code.jpg", alt: "Code" },
  { src: "/images/header/menu/News.jpg", alt: "News" },
  { src: "/images/header/menu/Contact.jpg", alt: "Contact Us" },
];

const total = stackImages.length;

const Navbar = function () {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index) => {
    setActiveIndex(((index % total) + total) % total); // always wraps, never dead-ends
  };

  // Lock page scroll while the overlay is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    if (isMenuOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const MAX_VISIBLE = 3; // cards beyond this many steps away simply fade out, keeping the peek within view

  const getImageStyle = (index) => {
    let diff = index - activeIndex;

    // wrap the difference into the range [-total/2, total/2] so the stack loops
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const absDiff = Math.abs(diff);

    if (diff === 0) {
      return {
        transform: "translateY(0) scale(1)",
        zIndex: 10,
        opacity: 1,
        filter: "blur(0px)",
      };
    }

    if (absDiff > MAX_VISIBLE) {
      const direction = diff > 0 ? 1 : -1;
      return {
        transform: `translateY(${direction * MAX_VISIBLE * 40}px) scale(${1 - MAX_VISIBLE * 0.06})`,
        zIndex: 0,
        opacity: 1,
        filter: "blur(6px)",
        pointerEvents: "none",
      };
    }

    const direction = diff > 0 ? 1 : -1;
    return {
      transform: `translateY(${direction * absDiff * 40}px) scale(${1 - absDiff * 0.06})`,
      zIndex: 10 - absDiff,
      opacity: 1,
      filter: `blur(${Math.min(1 + absDiff * 1.2, 6)}px)`,
    };
  };

  return (
    <header className={styles["header-main"]}>
      <div className={styles["header-wrapper"]}>
        <nav className={styles["header-left"]}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(true);
            }}
          >
            MENU
          </a>
        </nav>

        <div className={styles["header-logo"]}>
          <a href="/">
            <Image
              src="/images/header/logo.png"
              alt="Honeyverse Logo"
              width={0}
              height={0}
              sizes="100vw"
              priority
              className={styles["header-logo-img"]}
            />
          </a>
        </div>

        <nav className={styles["header-right"]}>
          <a href="#">CONTACT</a>
        </nav>
      </div>

      {/* ── Full-screen Menu Overlay (opens on MENU click) ── */}
      {isMenuOpen && (
        <div className={styles["menu-overlay"]}>
          <button
            className={styles["close-btn"]}
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className={styles["overlay-container"]}>

            {/* Left Navigation */}
            <nav className={styles["nav-menu"]}>
              <ul>
                {navLinks.map((item, index) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={`${styles["nav-item"]} ${index === activeIndex ? styles["active"] : ""}`}
                      onMouseEnter={() => goTo(index)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right Image Preview Stack */}
            <div className={styles["preview-wrapper"]}>
              <div className={styles["stack-container"]}>
                {stackImages.map((img, index) => (
                  <img
                    key={img.alt}
                    src={img.src}
                    alt={img.alt}
                    className={styles["stack-image"]}
                    style={getImageStyle(index)}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;