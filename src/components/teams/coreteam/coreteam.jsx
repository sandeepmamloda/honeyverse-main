"use client";
import { useState } from "react";
import styles from "./coreteam.module.css";

const allTeamMembers = [
  {
    id: 1,
    role: "FOUNDER",
    name: "HONEY B. SINGH",
    bio: "A veteran of indie cinema, Honey founded Lumière with a singular vision: to protect the director's voice at all costs. Over 15 years, he has produced award-winning features spanning three continents.",
    image: "/images/teams/honey.jpg",
  },
  {
    id: 2,
    role: "HEAD OF DEVELOPMENT",
    name: "SARAH CHEN",
    bio: "Formerly a programmer at major European festivals, Sarah has an unparalleled eye for emerging talent and unconventional narratives. She leads our script acquisition and writer incubation programs.",
    image: "/images/teams/sarahchen.jpg",
  },
  {
    id: 3,
    role: "CREATIVE DIRECTOR",
    name: "ALEX MERCER",
    bio: "Alex brings a wealth of avant-garde visual design experience, crafting the aesthetic language for multi-disciplinary platforms worldwide.",
    image: "/images/teams/alex.jpg",
  },
  {
    id: 4,
    role: "TECHNICAL LEAD",
    name: "PRIYA SHARMA",
    bio: "Priya bridges the gap between high-end digital design and functional web applications, ensuring architectural solidity across platforms.",
    image: "/images/teams/priya.jpg",
  }
];

const CoreTeam = () => {
  const [visibleCount, setVisibleCount] = useState(2);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 2);
  };

  const dynamicMembers = allTeamMembers.slice(0, visibleCount);

  return (
    <section className={styles["core-main"]}>
      {/* Upper Content Locked Wrapper */}
      <div className={styles["core-container"]}>
        {/* Top Header Layout */}
        <div className={styles["core-header"]}>
          <div className={styles["header-left"]}>
            <div className={styles["badge"]}>
              <h3>[ LEADERSHIP // VOL. 1 ]</h3>
            </div>
            <div className={styles["main-title"]}>
              <span className={styles["text-yellow"]}>THE</span>{" "}
              <span className={styles["text-outline"]}>CORE</span>
            </div>
          </div>
          
          <div className={styles["header-right"]}>
            <p>
              OUR VISUAL IDENTITY IS ROOTED IN STRUCTURAL BRUTALISM. STARK,
              UNCOMPROMISING, AND DESIGNED TO LEAVE A LASTING IMPRESSION.
            </p>
          </div>
        </div>
      </div>

      {/* Grid Border Accent Line - Pure Viewport Edge to Edge 100% Width */}
      <div className={styles["divider-line"]}></div>

      {/* Lower Content Locked Wrapper */}
      <div className={styles["core-container"]}>
        {/* Dynamic Team Cards Container */}
        <div className={styles["team-grid"]}>
          {dynamicMembers.map((member) => (
            <div key={member.id} className={styles["member-card"]}>
              <div className={styles["image-wrapper"]}>
                {member.image ? (
                  <img src={member.image} alt={member.name} className={styles["profile-img"]} />
                ) : (
                  <div className={styles["placeholder-img"]}></div>
                )}
                
                <div className={styles["image-overlay"]}>
                  <span className={styles["member-role"]}>{member.role}</span>
                  <h2 className={styles["member-name"]}>{member.name}</h2>
                </div>
              </div>

              <div className={styles["member-bio"]}>
                <p>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Action Button Row */}
        {visibleCount < allTeamMembers.length && (
          <div className={styles["action-row"]}>
            <button className={styles["load-more-btn"]} onClick={handleLoadMore}>
              Load More{" "}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M8 1C8 0.734784 7.89464 0.48043 7.70711 0.292893C7.51957 0.105357 7.26522 0 7 0C6.73478 0 6.48043 0.105357 6.29289 0.292893C6.10536 0.48043 6 0.734784 6 1V6H1C0.734784 6 0.48043 6.10536 0.292893 6.29289C0.105357 6.48043 0 6.73478 0 7C0 7.26522 0.105357 7.51957 0.292893 7.70711C0.48043 7.89464 0.734784 8 1 8H6V13C6 13.2652 6.10536 13.5196 6.29289 13.7071C6.48043 13.8946 6.73478 14 7 14C7.26522 14 7.51957 13.8946 7.70711 13.7071C7.89464 13.5196 8 13.2652 8 13V8H13C13.2652 8 13.5196 7.89464 13.7071 7.70711C13.8946 7.51957 14 7.26522 14 7C14 6.73478 13.8946 6.48043 13.7071 6.29289C13.5196 6.10536 13.2652 6 13 6H8V1Z" fill="white"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CoreTeam;