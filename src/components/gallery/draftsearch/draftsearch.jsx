"use client";
import { useState, useEffect } from "react";
import styles from "./draftsearch.module.css";

// Dynamic Data Array
const draftsData = [
  {
    id: 1,
    title: "THE BLUEPRINT",
    description:
      "Scripts, storyboards, and structural planning. The foundation of narrative architecture.",
    src: "/images/gallery/draftsearch/draft-1.jpg",
    alt: "The Blueprint",
    variant: "icon", 
  },
  {
    id: 2,
    title: "MOODBOARDS",
    description:
      "Aesthetic compilation. Finding the exact frequency before a single frame is shot.",
    src: "/images/gallery/draftsearch/draft-2.jpg",
    alt: "Moodboards",
    variant: "line",
  },
];

const SectionBadgeIcon = () => (
  <svg className={styles.badgeIcon} width="25" height="25" viewBox="0 0 25 25" fill="none">
      <path d="M10.417 8.07288C10.4173 7.93412 10.4545 7.79793 10.5248 7.67832C10.5951 7.55871 10.6961 7.45999 10.8172 7.39231C10.9383 7.32463 11.0753 7.29044 11.2141 7.29325C11.3528 7.29606 11.4883 7.33577 11.6066 7.4083L15.4232 9.75101C15.537 9.8209 15.6309 9.91879 15.6961 10.0353C15.7613 10.1518 15.7955 10.2831 15.7955 10.4166C15.7955 10.5501 15.7613 10.6814 15.6961 10.7979C15.6309 10.9145 15.537 11.0124 15.4232 11.0823L11.6066 13.426C11.4881 13.4986 11.3525 13.5383 11.2135 13.5411C11.0746 13.5438 10.9375 13.5094 10.8163 13.4415C10.6951 13.3736 10.5942 13.2745 10.524 13.1546C10.4538 13.0347 10.4169 12.8983 10.417 12.7593V8.07288Z" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.5 17.7084V21.875" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.33301 21.875H16.6663" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20.833 3.125H4.16634C3.01575 3.125 2.08301 4.05774 2.08301 5.20833V15.625C2.08301 16.7756 3.01575 17.7083 4.16634 17.7083H20.833C21.9836 17.7083 22.9163 16.7756 22.9163 15.625V5.20833C22.9163 4.05774 21.9836 3.125 20.833 3.125Z" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PenIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M15.7068 21.2931C15.5193 21.4806 15.265 21.5859 14.9998 21.5859C14.7347 21.5859 14.4804 21.4806 14.2928 21.2931L12.7068 19.7071C12.5194 19.5196 12.4141 19.2653 12.4141 19.0001C12.4141 18.7349 12.5194 18.4806 12.7068 18.2931L18.2928 12.7071C18.4804 12.5196 18.7347 12.4143 18.9998 12.4143C19.265 12.4143 19.5193 12.5196 19.7069 12.7071L21.2928 14.2931C21.4803 14.4806 21.5856 14.7349 21.5856 15.0001C21.5856 15.2653 21.4803 15.5196 21.2928 15.7071L15.7068 21.2931Z"
      stroke="#FFF9FF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 13L16.625 6.12601C16.5876 5.93899 16.4975 5.76656 16.3653 5.62907C16.2331 5.49157 16.0644 5.39475 15.879 5.35001L3.23501 2.02801C3.06843 1.98773 2.89431 1.99094 2.72933 2.03733C2.56436 2.08371 2.41407 2.17172 2.29289 2.29289C2.17172 2.41407 2.08371 2.56436 2.03733 2.72933C1.99094 2.89431 1.98773 3.06843 2.02801 3.23501L5.35001 15.879C5.39475 16.0644 5.49157 16.2331 5.62907 16.3653C5.76656 16.4975 5.93899 16.5876 6.12601 16.625L13 18"
      stroke="#FFF9FF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.2998 2.30005L9.5858 9.58605"
      stroke="#FFF9FF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 13C12.1046 13 13 12.1046 13 11C13 9.89543 12.1046 9 11 9C9.89543 9 9 9.89543 9 11C9 12.1046 9.89543 13 11 13Z"
      stroke="#FFF9FF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DraftsResearch = () => {
  return (
    <section className={styles.container}>
      <div className={styles.badgeWrapper}>
        <SectionBadgeIcon />
        <div className={styles.badge}>
          <h3>[ 03 // CONCEPTION ]</h3>
        </div>
      </div>

      <div className={styles.headerGroup}>
        <h2 className={styles.title}>
          <span className={styles.titleFilled}>DRAFTS &amp;</span>
          <span className={styles.titleOutline}>RESEARCH</span>
        </h2>
      </div>

      {/* Dynamic Grid */}
      <div className={styles.grid}>
        {draftsData.map((item) => (
          <div key={item.id} className={styles.card}>
            <img src={item.src} alt={item.alt} />
            <div className={styles.overlay}></div>

            <div className={styles.cardContent}>
              {item.variant === "icon" ? (
                <>
                  <div className={styles.cardIcon}>
                    <PenIcon />
                  </div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDescription}>
                    {item.description}
                  </p>
                </>
              ) : (
                <div className={styles.cardTextWithLine}>
                  <div className={styles.verticalLine}></div>
                  <div>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDescription}>
                      {item.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DraftsResearch;