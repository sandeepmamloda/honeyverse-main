"use client";
import styles from "./turnkeylist.module.css";

const turnkeyItems = [
  {
    id: 1,
    title: "DEVELOPMENT & FINANCING",
    desc: "Packaging talent, securing gap financing, and structuring domestic/international tax credits.",
  },
  {
    id: 2,
    title: "POST-PRODUCTION MATRIX",
    desc: "In-house editing suites, HDR color grading (DaVinci Resolve Advanced Panel), and full 7.1.4 Dolby Atmos mixing.",
  },
  {
    id: 3,
    title: "DISTRIBUTION STRATEGY",
    desc: "Festival targeting, sales agency partnerships, and direct-to-platform architectural delivery.",
  },
];

const TurnkeyList = () => {
  return (
    <section className={styles["turnkey-main"]}>
      {/* ── HEADER LAYOUT ── */}
      <div className={styles["header-top"]}>
        <div className={styles["badge-wrapper"]}>
          {/* Custom SVG Icon */}
          <svg className={styles["badge-icon"]} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
            <path d="M10.417 8.07288C10.4173 7.93412 10.4545 7.79793 10.5248 7.67832C10.5951 7.55871 10.6961 7.45999 10.8172 7.39231C10.9383 7.32463 11.0753 7.29044 11.2141 7.29325C11.3528 7.29606 11.4883 7.33577 11.6066 7.4083L15.4232 9.75101C15.537 9.8209 15.6309 9.91879 15.6961 10.0353C15.7613 10.1518 15.7955 10.2831 15.7955 10.4166C15.7955 10.5501 15.7613 10.6814 15.6961 10.7979C15.6309 10.9145 15.537 11.0124 15.4232 11.0823L11.6066 13.426C11.4881 13.4986 11.3525 13.5383 11.2135 13.5411C11.0746 13.5438 10.9375 13.5094 10.8163 13.4415C10.6951 13.3736 10.5942 13.2745 10.524 13.1546C10.4538 13.0347 10.4169 12.8983 10.417 12.7593V8.07288Z" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.5 17.7084V21.875" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.33301 21.875H16.6663" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.833 3.125H4.16634C3.01575 3.125 2.08301 4.05774 2.08301 5.20833V15.625C2.08301 16.7756 3.01575 17.7083 4.16634 17.7083H20.833C21.9836 17.7083 22.9163 16.7756 22.9163 15.625V5.20833C22.9163 4.05774 21.9836 3.125 20.833 3.125Z" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className={styles["badge-text"]}>
            <h3>[ 02 // EXECUTION ]</h3>
          </div>
        </div>
        <span className={styles["header-line"]}></span>

        <div className={styles["title-wrapper"]}>
          <h1 className={styles["main-title"]}>TURNKEY</h1>
        </div>
      </div>

      {/* ── MAIN CONTENT SPLIT GRID ── */}
      <div className={styles["main-grid"]}>
        
        {/* Left Side Content Column */}
        <div className={styles["content-details"]}>
          <div className={styles["sub-title-wrapper"]}>
            <h2 className={styles["sub-title"]}>SCRIPT TO SCREEN</h2>
          </div>
          
          <p className={styles["intro-text"]}>
            We don't just supply gear; we supply the entire structural framework. Our turnkey packaging solutions take raw IP and guide it through financing, physical production, and complex post-production pipelines.
          </p>

          {/* Left Solid Border Highlight Strip via container wrapper */}
          <div className={styles["list-container"]}>
            {turnkeyItems.map((item) => (
              <div key={item.id} className={styles["list-row"]}>
                <div className={styles["item-header"]}>
                  <h3 className={styles["item-title"]}>{item.title}</h3>
                </div>
                <p className={styles["item-desc"]}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Showcase Image Frame (No absolute badge overlaps) */}
        <div className={styles["image-showcase-wrapper"]}>
          <img
            src="/images/turnkey/turnkey.jpg" /* Aap apne accordingly image route change kar sakte hain */
            alt="Film Reels Deliverables Master"
            className={styles["hero-image"]}
          />
        </div>

      </div>
    </section>
  );
};

export default TurnkeyList;