import styles from "./awards-and-selection.module.css";

const awardsData = [
  {
    year: "2025",
    festival: "CANNES FILM FESTIVAL",
    award: "PALME D'OR NOMINEE",
    project: "THE SPACES BETWEEN",
  },
  {
    year: "2024",
    festival: "VENICE BIENNALE",
    award: "SILVER LION",
    project: "ECHOES OF RAIN",
  },
  {
    year: "2024",
    festival: "SUNDANCE",
    award: "GRAND JURY PRIZE",
    project: "MIDNIGHT SUN",
  },
  {
    year: "2023",
    festival: "TIFF",
    award: "PEOPLE'S CHOICE",
    project: "NEON HORIZONS",
  },
  {
    year: "2022",
    festival: "BERLINALE",
    award: "GOLDEN BEAR NOMINEE",
    project: "STEEL & GLASS",
  },
];

/* ── Inline SVG Icons ── */
const TrophyIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    className={className}
  >
    <g clipPath="url(#clip0_208_111)">
      <path d="M5.3335 13.3334H26.6668" stroke="#FE9A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.3335 3.54663V6.66663C13.3335 7.39996 12.7068 7.9733 12.0402 8.27996C10.4668 8.99996 9.3335 10.9866 9.3335 13.3333" stroke="#FE9A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.6665 3.54663V6.66663C18.6665 7.39996 19.2932 7.9733 19.9598 8.27996C21.5332 8.99996 22.6665 10.9866 22.6665 13.3333" stroke="#FE9A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 -13.3334H8V-4.00004C8 -1.87831 8.84286 0.156523 10.3431 1.65681C11.8434 3.1571 13.8783 3.99996 16 3.99996C18.1217 3.99996 20.1566 3.1571 21.6569 1.65681C23.1571 0.156523 24 -1.87831 24 -4.00004V-13.3334Z" stroke="#FE9A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_208_111">
        <rect width="32" height="32" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const ArrowIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Component ── */
const AwardsAndSelection = function () {
  return (
    <section className={styles["aws-section"]}>

      {/* ── Header ── */}
      <div className={styles["aws-header"]}>
        <div className={styles["aws-header-left"]}>
          <TrophyIcon className={styles["aws-icon"]} />
          <h2 className={styles["aws-title"]}>AWARDS & SELECTIONS</h2>
        </div>
        <span className={styles["aws-tag"]}>[ THE LAURELS ]</span>
      </div>

      {/* ── List ── */}
      <ul className={styles["aws-list"]}>
        {awardsData.map((item, index) => (
          <li key={index} className={styles["aws-row"]}>

            {/* Year */}
            <span className={styles["aws-year"]}>{item.year}</span>

            {/* Festival + Award */}
            <div className={styles["aws-center"]}>
              <h3 className={styles["aws-festival"]}>{item.festival}</h3>
              <p className={styles["aws-award"]}>{item.award}</p>
            </div>

            {/* Project + Arrow */}
            <div className={styles["aws-right"]}>
              <div className={styles["aws-project-wrap"]}>
                <span className={styles["aws-project-label"]}>PROJECT</span>
                <span className={styles["aws-project-name"]}>{item.project}</span>
              </div>
              <ArrowIcon className={styles["aws-arrow"]} />
            </div>

          </li>
        ))}
      </ul>

    </section>
  );
};

export default AwardsAndSelection;