"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./archive-stills.module.css";

const headings = [
  { text: "ARCHIVE &", style: "solid" },
  { text: "STILLS", style: "outline" },
];

const slides = [
  { src: "/images/gallery/first.jpg", type: "image", tag: "EXTRACT_001.DPX", title: "FINAL OUTPUT" },
  { src: "/images/gallery/first.jpg", type: "image", tag: "EXTRACT_002.DPX", title: "RAW SCAN" },
  { src: "/images/gallery/first.jpg", type: "image", tag: "EXTRACT_003.DPX", title: "COLOR PASS" },
];

// Responsive Icon Component
const ArchiveIcon = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    handleResize(); // Init
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <svg className={styles["archs-badge-icon"]} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 4.66667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H4.66667" stroke="#D9186A" strokeWidth="1.33277" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.332 2H12.6654C13.019 2 13.3581 2.14048 13.6082 2.39052C13.8582 2.64057 13.9987 2.97971 13.9987 3.33333V4.66667" stroke="#D9186A" strokeWidth="1.33277" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.9987 11.3333V12.6666C13.9987 13.0203 13.8582 13.3594 13.6082 13.6095C13.3581 13.8595 13.019 14 12.6654 14H11.332" stroke="#D9186A" strokeWidth="1.33277" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.66667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6666V11.3333" stroke="#D9186A" strokeWidth="1.33277" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.66797 8H11.3346" stroke="#D9186A" strokeWidth="1.33277" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ) : (
    <svg className={styles["archs-badge-icon"]} width="25" height="25" viewBox="0 0 25 25" fill="none">
      <path d="M10.417 8.07288C10.4173 7.93412 10.4545 7.79793 10.5248 7.67832C10.5951 7.55871 10.6961 7.45999 10.8172 7.39231C10.9383 7.32463 11.0753 7.29044 11.2141 7.29325C11.3528 7.29606 11.4883 7.33577 11.6066 7.4083L15.4232 9.75101C15.537 9.8209 15.6309 9.91879 15.6961 10.0353C15.7613 10.1518 15.7955 10.2831 15.7955 10.4166C15.7955 10.5501 15.7613 10.6814 15.6961 10.7979C15.6309 10.9145 15.537 11.0124 15.4232 11.0823L11.6066 13.426C11.4881 13.4986 11.3525 13.5383 11.2135 13.5411C11.0746 13.5438 10.9375 13.5094 10.8163 13.4415C10.6951 13.3736 10.5942 13.2745 10.524 13.1546C10.4538 13.0347 10.4169 12.8983 10.417 12.7593V8.07288Z" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.5 17.7084V21.875" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.33301 21.875H16.6663" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20.833 3.125H4.16634C3.01575 3.125 2.08301 4.05774 2.08301 5.20833V15.625C2.08301 16.7756 3.01575 17.7083 4.16634 17.7083H20.833C21.9836 17.7083 22.9163 16.7756 22.9163 15.625V5.20833C22.9163 4.05774 21.9836 3.125 20.833 3.125Z" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

const ArchiveAndStills = () => {
  const [active, setActive] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const startTime = useRef(0);
  const currentDrag = useRef(0);
  const stageRef = useRef(null);

  const goTo = (index) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, index));
    setActive(clamped);
    setDragX(0);
  };

  const handlePointerDown = (e) => {
    setIsDragging(true);
    startX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    startTime.current = Date.now();
    currentDrag.current = 0;
    stageRef.current?.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const delta = clientX - startX.current;
    currentDrag.current = delta;
    setDragX(delta);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const delta = currentDrag.current;
    const elapsed = Math.max(Date.now() - startTime.current, 1);
    const velocity = Math.abs(delta) / elapsed;
    const shouldAdvance = Math.abs(delta) > 80 || velocity > 0.5;

    if (shouldAdvance && delta < 0 && active < slides.length - 1) goTo(active + 1);
    else if (shouldAdvance && delta > 0 && active > 0) goTo(active - 1);
    else setDragX(0);
  };

  return (
    <section className={styles["archs-section"]}>
      <div className={styles["archs-badge-wrapper"]}>
        <ArchiveIcon />
        <div className={styles["archs-badge"]}>
          <h3>[ 01 // FRAMEWORK ]</h3>
        </div>
      </div>

      <h2 className={styles["archs-heading-row"]}>
        {headings.map((heading, index) => (
          <span key={index} className={heading.style === "outline" ? styles["archs-text-outline"] : styles["archs-text-solid"]}>
            {heading.text}
          </span>
        ))}
      </h2>

      <div
        className={`${styles["archs-stage"]} ${isDragging ? styles["is-dragging"] : ""}`}
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div
          className={styles["archs-track"]}
          style={{
            transform: `translateX(calc(-${active * 100}% + ${dragX}px))`,
            transition: isDragging ? "none" : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {slides.map((slide, index) => (
            <div className={`${styles["archs-slide"]} ${index === active ? styles["is-active"] : ""}`} key={index}>
              <img className={styles["archs-media"]} src={slide.src} alt={slide.title} draggable={false} />
            </div>
          ))}
        </div>
        <div className={styles["archs-media-overlay"]} />
        <div className={styles["archs-caption"]} key={active}>
          <span className={styles["archs-caption-tag"]}>{slides[active].tag}</span>
          <h3 className={styles["archs-caption-title"]}>{slides[active].title}</h3>
        </div>
      </div>

      <div className={styles["archs-dots"]}>
        {slides.map((_, index) => (
          <button key={index} className={`${styles["archs-dot"]} ${index === active ? styles.active : ""}`} onClick={() => goTo(index)} aria-label={`Slide ${index + 1}`} />
        ))}
      </div>
    </section>
  );
};

export default ArchiveAndStills;