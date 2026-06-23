"use client";
import styles from "./collaborate.module.css";

const Collaborate = () => {
  return (
    <section className={styles["collaborate-main"]}>
      {/* ── HEADER LAYOUT (Centered) ── */}
      <div className={styles["header-top"]}>
        <div className={styles["badge-icon-wrapper"]}>
          {/* Custom SVG Icon (people / alliance) */}
          <svg xmlns="http://www.w3.org/2000/svg" width="91" height="91" viewBox="0 0 91 91" fill="none">
                <mask id="path-1-inside-1_286_557" fill="white">
                <path d="M45.2549 0L90.5097 45.2548L45.2549 90.5097L4.57764e-05 45.2548L45.2549 0Z"/>
                </mask>
                <path d="M45.2549 0L46.6691 -1.41421L45.2549 -2.82843L43.8407 -1.41421L45.2549 0ZM90.5097 45.2548L91.9239 46.6691L93.3381 45.2548L91.9239 43.8406L90.5097 45.2548ZM45.2549 90.5097L43.8407 91.9239L45.2549 93.3381L46.6691 91.9239L45.2549 90.5097ZM4.57764e-05 45.2548L-1.41417 43.8406L-2.82838 45.2548L-1.41417 46.6691L4.57764e-05 45.2548ZM45.2549 0L43.8407 1.41421L89.0955 46.6691L90.5097 45.2548L91.9239 43.8406L46.6691 -1.41421L45.2549 0ZM90.5097 45.2548L89.0955 43.8406L43.8407 89.0955L45.2549 90.5097L46.6691 91.9239L91.9239 46.6691L90.5097 45.2548ZM45.2549 90.5097L46.6691 89.0955L1.41426 43.8406L4.57764e-05 45.2548L-1.41417 46.6691L43.8407 91.9239L45.2549 90.5097ZM4.57764e-05 45.2548L1.41426 46.6691L46.6691 1.41421L45.2549 0L43.8407 -1.41421L-1.41417 43.8406L4.57764e-05 45.2548Z" fill="#D9186A" mask="url(#path-1-inside-1_286_557)"/>
                <path d="M49.2549 54.2549V52.2549C49.2549 51.194 48.8335 50.1766 48.0833 49.4265C47.3332 48.6763 46.3157 48.2549 45.2549 48.2549H39.2549C38.194 48.2549 37.1766 48.6763 36.4265 49.4265C35.6763 50.1766 35.2549 51.194 35.2549 52.2549V54.2549" stroke="#D9186A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M42.2549 44.2549C44.464 44.2549 46.2549 42.464 46.2549 40.2549C46.2549 38.0457 44.464 36.2549 42.2549 36.2549C40.0457 36.2549 38.2549 38.0457 38.2549 40.2549C38.2549 42.464 40.0457 44.2549 42.2549 44.2549Z" stroke="#D9186A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M55.2549 54.2548V52.2548C55.2542 51.3685 54.9592 50.5075 54.4162 49.8071C53.8733 49.1066 53.113 48.6063 52.2549 48.3848" stroke="#D9186A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M49.2549 36.3848C50.1153 36.6051 50.8779 37.1055 51.4225 37.8071C51.9671 38.5087 52.2627 39.3716 52.2627 40.2598C52.2627 41.1479 51.9671 42.0108 51.4225 42.7125C50.8779 43.4141 50.1153 43.9145 49.2549 44.1348" stroke="#D9186A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <div className={styles["badge-text"]}>
          <h3>[ 03 // ALLIANCE ]</h3>
        </div>

        <div className={styles["title-wrapper"]}>
          <h1 className={styles["main-title"]}>COLLABORATE</h1>
        </div>
      </div>

      {/* ── MAIN CONTENT SPLIT GRID ── */}
      <div className={styles["main-grid"]}>

        {/* Left: Yellow Protocol Card */}
        <div className={styles["protocol-card"]}>
          <h2 className={styles["card-title"]}>CO-PRODUCTIONS</h2>
          <p className={styles["card-desc"]}>
            We actively seek partnerships with visionary directors, independent producers, and global entities. If the project pushes boundaries and requires a rigorous aesthetic framework, we align forces.
          </p>

          <a href="#" className={styles["submit-link"]}>
            <span className={styles["submit-text"]}>SUBMIT PROTOCOL</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
               <path d="M5.83301 14H22.1663" stroke="#D9186A" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
               <path d="M14 5.83325L22.1667 13.9999L14 22.1666" stroke="#D9186A" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Right: Showcase Image with Overlay Caption */}
        <div className={styles["image-showcase-wrapper"]}>
          <img
            src="/images/collaborate/collaborate.jpg"
            alt="The Architects of Narrative"
            className={styles["hero-image"]}
          />
          <div className={styles["image-overlay"]}>
            <span className={styles["target-tag"]}>TARGET: UNCOMPROMISING CINEMA</span>
            <h3 className={styles["overlay-title"]}>
              THE ARCHITECTS<br />OF NARRATIVE
            </h3>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Collaborate;