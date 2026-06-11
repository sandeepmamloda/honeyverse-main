import styles from "./heroawards.module.css";

// ✅ Yahan se texts add/remove karo — jitne chahiye utne
const headings = [
  { text: "CRITICAL", style: "solid" },   // solid white
  { text: "ACCLAIM", style: "outline" },  // outline pink    // example — hata sakte ho
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
        {/* Badge */}
        <div className={styles["top"]}>
          <h3>[ Our Identity // Vol. 01 ]</h3>
        </div>

        {/* Dynamic Headings */}
        <div className={styles["headings-group"]}>
          {headings.map((heading, index) => (
            <div
              key={index}
              className={
                heading.style === "outline"
                  ? styles["bottom"]
                  : styles["middle"]
              }
            >
              <h1>{heading.text}</h1>
            </div>
          ))}
        </div>

        {/* Description box */}
        <div className={styles["bottom-last"]}>
          <h2>
            Recognition from the world's most prestigious institutions. A
            testament to our uncompromising vision and narrative rigor.
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Heroawards;