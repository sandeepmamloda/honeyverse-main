"use client";
import styles from "./optical-signature.module.css";

const specRows = [
  { label: "COLOR SPACE",     value: "REC.2020 / ACES"          },
  { label: "GRAIN STRUCTURE", value: "35MM KODAK EMULATION"      },
  { label: "ASPECT RATIOS",   value: "2.39:1 / 1.33:1"           },
  { label: "CONTRAST",        value: "AGGRESSIVE"                },
];

const OpticalSignature = () => {
  return (
    <section className={styles["optical-main"]}>

      {/* ── HEADER LAYOUT ── */}
      <div className={styles["header-top"]}>
        <div className={styles["badge-wrapper"]}>
          {/* Custom SVG Icon — same style as physical.jsx, no bordered box */}
          <svg className={styles["badge-icon"]} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
            <path d="M10.417 8.07288C10.4173 7.93412 10.4545 7.79793 10.5248 7.67832C10.5951 7.55871 10.6961 7.45999 10.8172 7.39231C10.9383 7.32463 11.0753 7.29044 11.2141 7.29325C11.3528 7.29606 11.4883 7.33577 11.6066 7.4083L15.4232 9.75101C15.537 9.8209 15.6309 9.91879 15.6961 10.0353C15.7613 10.1518 15.7955 10.2831 15.7955 10.4166C15.7955 10.5501 15.7613 10.6814 15.6961 10.7979C15.6309 10.9145 15.537 11.0124 15.4232 11.0823L11.6066 13.426C11.4881 13.4986 11.3525 13.5383 11.2135 13.5411C11.0746 13.5438 10.9375 13.5094 10.8163 13.4415C10.6951 13.3736 10.5942 13.2745 10.524 13.1546C10.4538 13.0347 10.4169 12.8983 10.417 12.7593V8.07288Z" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.5 17.7084V21.875" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.33301 21.875H16.6663" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.833 3.125H4.16634C3.01575 3.125 2.08301 4.05774 2.08301 5.20833V15.625C2.08301 16.7756 3.01575 17.7083 4.16634 17.7083H20.833C21.9836 17.7083 22.9163 16.7756 22.9163 15.625V5.20833C22.9163 4.05774 21.9836 3.125 20.833 3.125Z" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className={styles["badge-text"]}>
            <h3>[ 01 // FRAMEWORK ]</h3>
          </div>
        </div>
        <span className={styles["header-line"]}></span>
      </div>

      {/* ── BIG TITLE ── */}
      <div className={styles["title-wrapper"]}>
        <h1 className={styles["main-title"]}>
          <span className={styles["title-fill"]}>OPTICAL</span>
          <span className={styles["title-outline"]}>SIGNATURE</span>
        </h1>
      </div>

      {/* ── MAIN CONTENT SPLIT GRID ── */}
      <div className={styles["main-grid"]}>

        {/* Left: Intro text & spec rows */}
        <div className={styles["content-details"]}>
          <p className={styles["intro-text"]}>
            Our visual language is uncompromised. We favor true blacks, high-contrast ratios, and motivated lighting that dictates psychological weight.
          </p>

          <div className={styles["spec-list"]}>
            {specRows.map((row) => (
              <div key={row.label} className={styles["spec-row"]}>
                <span className={styles["spec-label"]}>{row.label}</span>
                <span className={styles["spec-value"]}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Image showcase with overlay badges */}
        <div className={styles["image-showcase-wrapper"]}>
          <div className={styles["image-frame"]}>
            <img
              src="/images/optical/optical.jpg"
              alt="Optical Signature Grade"
              className={styles["hero-image"]}
            />

            {/* Top right icon badges */}
            <div className={styles["icon-badges"]}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 36 36" fill="none">
                <g opacity="0.7">
                  <path d="M18.001 32.9999C26.2852 32.9999 33.001 26.2841 33.001 17.9999C33.001 9.71561 26.2852 2.99988 18.001 2.99988C9.7167 2.99988 3.00098 9.71561 3.00098 17.9999C3.00098 26.2841 9.7167 32.9999 18.001 32.9999Z" stroke="#FFCA1A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M33 18H27" stroke="#FFCA1A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.00098 18H3.00098" stroke="#FFCA1A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 8.99988V2.99988" stroke="#FFCA1A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 33V27" stroke="#FFCA1A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 36 36" fill="none">
                <g opacity="0.7">
                  <path d="M3.09181 18.5221C2.96679 18.1853 2.96679 17.8148 3.09181 17.4781C4.30936 14.5258 6.37608 12.0016 9.02996 10.2254C11.6838 8.44919 14.8054 7.50098 17.9988 7.50098C21.1922 7.50098 24.3138 8.44919 26.9676 10.2254C29.6215 12.0016 31.6883 14.5258 32.9058 17.4781C33.0308 17.8148 33.0308 18.1853 32.9058 18.5221C31.6883 21.4743 29.6215 23.9985 26.9676 25.7747C24.3138 27.5509 21.1922 28.4991 17.9988 28.4991C14.8054 28.4991 11.6838 27.5509 9.02996 25.7747C6.37608 23.9985 4.30936 21.4743 3.09181 18.5221Z" stroke="#FFCA1A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 22.5C20.4853 22.5 22.5 20.4853 22.5 18C22.5 15.5147 20.4853 13.5 18 13.5C15.5147 13.5 13.5 15.5147 13.5 18C13.5 20.4853 15.5147 22.5 18 22.5Z" stroke="#FFCA1A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </svg>
            </div>

            {/* Bottom left pill badge */}
            <div className={styles["grade-badge"]}>
              SYS.GRADE_01
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default OpticalSignature;