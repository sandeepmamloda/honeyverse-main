import styles from "./development-slate.module.css";

const slateItems = [
  {
    id: 1,
    status: "PRE-PRODUCTION",
    title: "THE ARCHITECTURE OF SILENCE",
    tags: "SCI-FI / DRAMA",
    director: "DIR. MATEO ROSTOVA",
    logline: "In a world where sound is weaponized, a deaf architect must design a sanctuary that defies physics before the ruling class silences the resistance forever.",
    isActive: false,
  },
  {
    id: 2,
    status: "POST-PRODUCTION",
    title: "NEON HORIZONS",
    tags: "NEO-NOIR / THRILLER",
    director: "DIR. CELINE VARGA",
    logline: "A disgraced detective navigates the neon-soaked underbelly of a hyper-capitalist metropolis to find a missing heiress who doesn't want to be found.",
    isActive: true, // Image ke according ye item active/inverted hai
  },
  {
    id: 3,
    status: "IN DEVELOPMENT",
    title: "BLOOD & GOLD",
    tags: "HISTORICAL EPIC",
    director: "DIR. AMARA DIALLO",
    logline: "The untold story of the 14th-century West African empire and the fierce female warriors who defended it against insurmountable odds.",
    isActive: false,
  },
  {
    id: 4,
    status: "FESTIVAL RUN",
    title: "ECHOES OF RAIN",
    tags: "DRAMA / ROMANCE",
    director: "DIR. JULIAN VANCE",
    logline: "Two strangers trapped in a Tokyo transit station during a historic typhoon discover a shared trauma that binds them across time.",
    isActive: false,
  },
];

const DevelopmentSlate = () => {
  return (
    <section className={styles["slate-main"]}>
      {/* Background Watermark Image Overlay */}
      <div className={styles["watermark-wrapper"]}>
        <img 
          src="/images/development-slate/development-slate.jpg" 
          alt="Watermark" 
          className={styles["watermark-img"]} 
        />
      </div>

      {/* Top Header Layout */}
      <div className={styles["slate-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["badge"]}>
            <h3>[ 02 // DEVELOPMENT ]</h3>
          </div>
          <h1 className={styles["main-title"]}>
            DEVELOPMENT<span className={styles["text-yellow"]}>SLATE</span>
          </h1>
        </div>

        <div className={styles["header-right"]}>
          {/* Provided Yellow Clapperboard SVG */}
          <div className={styles["icon-wrapper"]}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M40.3999 11.9999L5.99991 21.9999L4.19991 17.1999C3.59991 14.9999 4.79991 12.7999 6.79991 12.1999L33.7999 4.19991C35.9999 3.59991 38.1999 4.79991 38.7999 6.79991L40.3999 11.9999Z" stroke="#FE9A00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12.4004 10.6001L18.6004 18.4001" stroke="#FE9A00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M24.7998 6.80005L30.9998 14.8" stroke="#FE9A00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6 22H42V38C42 39.0609 41.5786 40.0783 40.8284 40.8284C40.0783 41.5786 39.0609 42 38 42H10C8.93913 42 7.92172 41.5786 7.17157 40.8284C6.42143 40.0783 6 39.0609 6 38V22Z" stroke="#FE9A00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <p className={styles["tracking-notice"]}>
            CONFIDENTIAL INTERNAL TRACKING. PUBLIC ANNOUNCEMENTS PENDING.
          </p>
        </div>
      </div>

      {/* Top Divider Line (Using your edge-to-edge calculation logic) */}
      <div className={styles["divider-line"]}></div>

      {/* Grid Table List Container */}
      <div className={styles["slate-table"]}>
        {slateItems.map((item) => (
          <div 
            key={item.id} 
            className={`${styles["table-row"]} ${item.isActive ? styles["row-active"] : ""}`}
          >
            {/* Column 1: Status */}
            <div className={styles["col-status"]}>
              <span className={styles["label"]}>STATUS</span>
              <h4 className={styles["status-text"]}>{item.status}</h4>
            </div>

            {/* Column 2: Title & Core Credits */}
            <div className={styles["col-main"]}>
              <h2 className={styles["project-title"]}>{item.title}</h2>
              <div className={styles["credits-row"]}>
                <span className={styles["tag-pill"]}>{item.tags}</span>
                <span className={styles["director-text"]}>{item.director}</span>
              </div>
            </div>

            {/* Column 3: Logline Info */}
            <div className={styles["col-logline"]}>
              <span className={styles["label"]}>LOGLINE</span>
              <p className={styles["logline-text"]}>{item.logline}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DevelopmentSlate;