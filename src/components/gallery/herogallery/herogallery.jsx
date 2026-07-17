import styles from "./herogallery.module.css";

const headings = [
  { text: "THE", style: "solid" },
  { text: "GALLERY", style: "outline" },
];

const Herovisuals = () => {
  return (
    <section className={styles["herogallery-main"]}>
      <div className={styles["herogallery-video-wrapper"]}>
        <video
          className={styles["herogallery-video"]}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/visuals/visuals.mp4" type="video/mp4" />
        </video>
      </div>

      <div className={styles["textual-content"]}>

        {/* Badge + Heading — saath mein center mein */}
        <div className={styles["headings-group"]}>
          <div className={styles["top"]}>
            <h3>[ Our Identity // Vol. 01 ]</h3>
          </div>

          <h1 className={styles["heading-row"]}>
            {headings.map((heading, index) => (
              <span
                key={index}
                className={
                  heading.style === "outline"
                    ? styles["text-outline"]
                    : styles["text-solid"]
                }
              >
                {heading.text}
              </span>
            ))}
          </h1>
        </div>

        {/* Description box — bottom pe */}
        <div className={styles["bottom-last"]}>
          <h2>
            Defining the optical vocabulary. A meticulous exploration of color science, structural framing, and raw cinematic texture.
          </h2>
        </div>

      </div>
    </section>
  );
};

export default Herovisuals;