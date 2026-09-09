"use client";
import { useEffect, useRef, useState } from "react";
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

/* ══════════════════════════════
   REVEAL ANIMATION HELPERS — SCROLL BASED
   Ye section hero nahi hai (page ke beech/neeche wala section), isliye
   yaha IntersectionObserver use karte hain — jab section viewport me
   aayega tabhi "ready" true hoga aur animation trigger hogi.
══════════════════════════════ */
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
};

const clipStart = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  up: "inset(100% 0 0 0)",
  down: "inset(0 0 100% 0)",
};

const Reveal = ({
  children,
  className = "",
  ready = false,
  delay = 0,
  as = "div",
  direction = "left",
  duration = 1.1,
  style: extraStyle = {},
}) => {
  const Tag = as;

  const style = {
    clipPath: ready ? "inset(0 0 0 0)" : clipStart[direction],
    WebkitClipPath: ready ? "inset(0 0 0 0)" : clipStart[direction],
    opacity: ready ? 1 : 0,
    transitionProperty: "clip-path, -webkit-clip-path, opacity",
    transitionDuration: `${duration}s, ${duration}s, 0.1s`,
    transitionTimingFunction: "cubic-bezier(0.83,0,0.17,1)",
    transitionDelay: `${delay}ms`,
    willChange: "clip-path, opacity",
    ...extraStyle,
  };

  return (
    <Tag className={className} style={style}>
      {children}
    </Tag>
  );
};

const CoreTeam = () => {
  const [visibleCount, setVisibleCount] = useState(2);

  const [headerRef, headerInView] = useInView(0.2);
  const [gridRef, gridInView] = useInView(0.1);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 2);
  };

  const dynamicMembers = allTeamMembers.slice(0, visibleCount);

  return (
    <section className={styles["core-main"]}>
      {/* Upper Content Locked Wrapper */}
      <div className={styles["core-container"]}>
        {/* Top Header Layout */}
        <div className={styles["core-header"]} ref={headerRef}>
          <div className={styles["header-left"]}>
            <Reveal
              as="div"
              ready={headerInView}
              direction="left"
              duration={1.2}
              delay={0}
              className={styles["badge"]}
            >
              <h3>[ LEADERSHIP // VOL. 1 ]</h3>
            </Reveal>

            <Reveal
              as="div"
              ready={headerInView}
              direction="up"
              duration={1.3}
              delay={200}
              className={styles["main-title"]}
            >
              <span className={styles["text-yellow"]}>THE</span>{" "}
              <span className={styles["text-outline"]}>CORE</span>
            </Reveal>
          </div>

          <Reveal
            as="div"
            ready={headerInView}
            direction="up"
            duration={1.3}
            delay={400}
            className={styles["header-right"]}
          >
            <p>
              OUR VISUAL IDENTITY IS ROOTED IN STRUCTURAL BRUTALISM. STARK,
              UNCOMPROMISING, AND DESIGNED TO LEAVE A LASTING IMPRESSION.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Grid Border Accent Line - Pure Viewport Edge to Edge 100% Width */}
      <div className={styles["divider-line"]}></div>

      {/* Lower Content Locked Wrapper */}
      <div className={styles["core-container"]}>
        {/* Dynamic Team Cards Container */}
        <div className={styles["team-grid"]} ref={gridRef}>
          {dynamicMembers.map((member, index) => (
            <Reveal
              key={member.id}
              as="div"
              ready={gridInView}
              direction="up"
              duration={1.1}
              delay={(index % 2) * 150}
              className={styles["member-card"]}
            >
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
            </Reveal>
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