import styles from "./homeservices.module.css";

const headings = [
  { text: "SYSTEM", style: "solid" },
  { text: "SERVICES", style: "outline" },
];

const Heroservices = () => {
  return (
    <section className={styles["heroservices-main"]}>
      <div className={styles["heroservices-video-wrapper"]}>
        <video
          className={styles["services-video"]}
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
            <h3>[ Archive // Vol. 05 ]</h3>
          </div>

          {headings.map((heading, index) => (
            <div
              key={index}
              className={
                index === 2
                  ? styles["bottom-pink"]
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
            Our operational capabilities. From high-end cinematic acquisition to turnkey packaging and strategic co-productions.
          </h2>
        </div>

      </div>
    </section>
  );
};

export default Heroservices;