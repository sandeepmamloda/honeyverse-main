"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./corelist.module.css";

const coreItems = [
  {
    id: 1,
    year: "2023",
    title: "MIDNIGHT SUN",
    type: "FEATURE FILM",
    director: "DIR. ALFONSO CUARÓN",
    studio: "A24 / LUMIÈRE",
    videoUrl: "/videos/awards/awards.mp4",
    duration: "12 min.",
    category: "Feature Film",
    description: "A visually striking short film exploring the intersection of light and shadow.",
  },
  {
    id: 2,
    year: "2022",
    title: "STEEL & GLASS",
    type: "DOCUSERIES",
    director: "DIR. JANE CAMPION",
    studio: "HBO MAX",
    videoUrl: "/videos/awards/awards.mp4",
    duration: "18 min.",
    category: "Docuseries",
    description: "An unflinching look at ambition, power, and the cost of progress.",
  },
  {
    id: 3,
    year: "2021",
    title: "THE SOVEREIGN",
    type: "FEATURE FILM",
    director: "DIR. DENIS VILLENEUVE",
    studio: "WARNER BROS.",
    videoUrl: "/videos/awards/awards.mp4",
    duration: "15 min.",
    category: "Feature Film",
    description: "A sweeping visual narrative of power and legacy.",
  },
  {
    id: 4,
    year: "2020",
    title: "FRACTURED STATE",
    type: "LIMITED SERIES",
    director: "DIR. CARY FUKUNAGA",
    studio: "NETFLIX",
    videoUrl: "/videos/awards/awards.mp4",
    duration: "20 min.",
    category: "Limited Series",
    description: "A tense exploration of a nation on the brink.",
  },
  {
    id: 5,
    year: "2019",
    title: "BLOOD & GOLD",
    type: "FEATURE FILM",
    director: "DIR. AMARA DIALLO",
    studio: "LUMIÈRE ORIGINALS",
    videoUrl: "/videos/awards/awards.mp4",
    duration: "14 min.",
    category: "Feature Film",
    description: "A raw, cinematic journey through ambition and consequence.",
  },
];

const CoreList = () => {
  const router = useRouter();
  const listContainerRef = useRef(null);
  const [visibleRows, setVisibleRows] = useState(() => new Set());

  useEffect(() => {
    const container = listContainerRef.current;
    if (!container) return;

    const rows = container.querySelectorAll(`.${styles["list-row"]}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setTimeout(() => {
              setVisibleRows((prev) => {
                const next = new Set(prev);
                next.add(idx);
                return next;
              });
            }, idx * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    rows.forEach((row) => observer.observe(row));

    return () => observer.disconnect();
  }, []);

  // ── NEW: row click → navigate to video player with query params ──
  const handleRowClick = (item) => {
    const params = new URLSearchParams({
      url: encodeURIComponent(item.videoUrl),
      title: encodeURIComponent(item.title),
      director: encodeURIComponent(item.director.replace(/^DIR\.\s*/i, "")),
      year: encodeURIComponent(item.year),
      duration: encodeURIComponent(item.duration || ""),
      category: encodeURIComponent(item.category || item.type || ""),
      description: encodeURIComponent(item.description || ""),
    });

    router.push(`/video-player?${params.toString()}`);
  };

  return (
    <section className={styles["core-list-main"]}>
      {/* ── HEADER LAYOUT ── */}
      <div className={styles["header-top"]}>
        <div className={styles["badge-wrapper"]}>
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
          <h1 className={styles["main-title"]}>
            <span className={styles["text-solid"]}>THE</span>{" "}
            <span className={styles["text-outline"]}>CORE</span>
          </h1>
        </div>
      </div>

      {/* ── LIST CONTAINER ── */}
      <div className={styles["list-container"]} ref={listContainerRef}>
        {coreItems.map((item, index) => (
          <div
            key={item.id}
            data-index={index}
            className={`${styles["list-row"]} ${
              visibleRows.has(index) ? styles["is-visible"] : ""
            }`}
            onClick={() => handleRowClick(item)}   // ── NEW: click to open video player
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleRowClick(item);
            }}
          >

            {/* Year Column */}
            <div className={styles["col-year"]}>
              <p>{item.year}</p>
            </div>

            {/* Title & Meta Column */}
            <div className={styles["col-main"]}>
              <h2 className={styles["item-title"]}>{item.title}</h2>
              <div className={styles["item-meta"]}>
                <span className={styles["meta-type"]}>{item.type}</span>
                <span className={styles["meta-dot"]}>•</span>
                <span className={styles["meta-director"]}>{item.director}</span>
              </div>
            </div>

            {/* Studio Badge & Play Icon Column */}
            <div className={styles["col-action"]}>
              <div className={styles["studio-badge"]}>{item.studio}</div>
              <div className={styles["play-icon"]}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 3L19 12L5 21V3Z" />
                </svg>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default CoreList;