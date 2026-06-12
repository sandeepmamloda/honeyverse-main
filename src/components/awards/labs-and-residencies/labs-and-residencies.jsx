import styles from "./labs-and-residencies.module.css";

const labsData = [
  {
    years: "2023 / 2025",
    name: "SUNDANCE DIRECTORS LAB",
    description: "FELLOWSHIP & FEATURE FILM PROGRAM",
  },
  {
    years: "2022 / 2024",
    name: "FILM INDEPENDENT",
    description: "PRODUCING LAB & FAST TRACK",
  },
  {
    years: "2021",
    name: "BERLINALE TALENTS",
    description: "INTERNATIONAL CO-PRODUCTION MARKET",
  },
  {
    years: "2020",
    name: "TRIBECA FILM INSTITUTE",
    description: "ALL ACCESS GRANT & RESIDENCY",
  },
];

const RibbonIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="103"
    height="96"
    viewBox="0 0 103 96"
    fill="none"
    className={className}
  >
    <path
      d="M66.4221 51.5601L72.924 85.6641C72.9968 86.0656 72.9363 86.4784 72.7507 86.8471C72.565 87.2158 72.263 87.5228 71.8851 87.7272C71.5071 87.9316 71.0712 88.0236 70.6357 87.9909C70.2001 87.9582 69.7856 87.8023 69.4477 87.5441L54.0836 76.7961C53.3418 76.2796 52.4408 76.0005 51.515 76.0005C50.5892 76.0005 49.6881 76.2796 48.9464 76.7961L33.5565 87.5401C33.2188 87.7978 32.8049 87.9534 32.3698 87.9862C31.9348 88.019 31.4994 87.9274 31.1217 87.7235C30.744 87.5197 30.4419 87.2134 30.2559 86.8454C30.0698 86.4774 30.0085 86.0653 30.0803 85.6641L36.5778 51.5601"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M51.5 56C65.7213 56 77.25 45.2548 77.25 32C77.25 18.7452 65.7213 8 51.5 8C37.2787 8 25.75 18.7452 25.75 32C25.75 45.2548 37.2787 56 51.5 56Z"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LabsAndResidencies = function () {
  return (
    <section className={styles["labs-section"]}>
      <div className={styles["labs-header"]}>
        <div className={styles["labs-eyebrow"]}>
          <span>[ INCUBATION // DEVELOPMENT ]</span>
        </div>
        <h2 className={styles["labs-title"]}>
          <span className={styles["labs-title-solid"]}>LABS & </span>
          <span className={styles["labs-title-outline"]}>RESIDENCIES</span>
        </h2>
      </div>

      <div className={styles["labs-grid"]}>
        {labsData.map((item, index) => (
          <div key={index} className={styles["labs-card"]}>
            <div className={styles["labs-card-shimmer"]} />
            <div className={styles["labs-card-top"]}>
              <span className={styles["labs-card-years"]}>{item.years}</span>
              <RibbonIcon className={styles["labs-card-icon"]} />
            </div>
            <h3 className={styles["labs-card-name"]}>{item.name}</h3>
            <div className={styles["labs-card-divider"]} />
            <p className={styles["labs-card-desc"]}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LabsAndResidencies;