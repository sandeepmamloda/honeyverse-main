import styles from "./heroportfolio.module.css";

const headings = [
  { text: "THE", style: "solid" },
  { text: "PORTFOLIO", style: "outline" },
];

const Heroawards = () => {
  return (
    <section className={styles["heroawards-main"]}>
      <div className={styles["heroawards-video-wrapper"]}>
        <video
          className={styles["awards-video"]}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/awards/awards.mp4" type="video/mp4" />
        </video>
      </div>

      <div className={styles["textual-content"]}>

        {/* Badge + Headings — saath mein center mein */}
        <div className={styles["headings-group"]}>
          <div className={styles["top"]}>
            <h3>[ Our Identity // Vol. 01 ]</h3>
          </div>

          {headings.map((heading, index) => (
            <div
              key={index}
              className={
                index === 2
                  ? styles["bottom-pink"] // "TELLING" ko har screen size par pink karne ke liye explicit class
                  : heading.style === "outline"
                  ? styles["bottom"]
                  : styles["middle"]
              }
            >
              <h1>{heading.text}</h1>
            </div>
          ))}
        </div>

        {/* Description box — bottom pe */}
        <div className={styles["bottom-last"]}>
          <h2>
            A curated selection of our original narratives, co-productions, and boundary-pushing digital intellectual properties.
          </h2>
        </div>

      </div>
    </section>
  );
};

export default Heroawards;