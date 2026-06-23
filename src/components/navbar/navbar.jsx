"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./navbar.module.css";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Brand", href: "/brand" },
  { label: "Awards", href: "/awards" },
  { label: "Teams", href: "/teams" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Visual", href: "/visual" },
  { label: "Gallery", href: "/gallery" },
  { label: "Code", href: "/code" },
  { label: "News", href: "/news" },
  { label: "Contact Us", href: "/contact" },
];

/* Images correspond to the first 5 menu items by index (stack carousel) */
const stackImages = [
  { src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop", alt: "Home" },
  { src: "https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=800&auto=format&fit=crop", alt: "Brand" },
  { src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop", alt: "Awards" },
  { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop", alt: "Teams" },
  { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", alt: "Portfolio" },
];

const AUTOPLAY_DELAY = 2200; // ms between auto-advances
const total = stackImages.length;

const Navbar = function () {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef(null);

  const goTo = (index) => {
    setActiveIndex(((index % total) + total) % total); // always wraps, never dead-ends
  };

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (((prev + 1) % total) + total) % total);
    }, AUTOPLAY_DELAY);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = null;
  };

  useEffect(() => {
    if (isMenuOpen) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
    return () => stopAutoplay();
  }, [isMenuOpen]);

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

  const getImageStyle = (index) => {
    let diff = index - activeIndex;

    // wrap the difference into the range [-total/2, total/2] so the stack loops
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const absDiff = Math.abs(diff);

    if (diff === 0) {
      return { transform: "translateY(0) scale(1)", zIndex: 10, opacity: 1 };
    }

    const direction = diff > 0 ? 1 : -1;
    return {
      transform: `translateY(${direction * absDiff * 60}px) scale(${1 - absDiff * 0.07})`,
      zIndex: 10 - absDiff,
      opacity: Math.max(0, 1 - absDiff * 0.18),
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
                      onMouseEnter={() => {
                        stopAutoplay();
                        if (index < total) goTo(index);
                      }}
                      onMouseLeave={() => startAutoplay()}
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