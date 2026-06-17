import styles from "./teams.module.css";

const headings = [
  { text: "THE", style: "solid" },
  { text: "COLLECTIVE", style: "outline" },
  { text: "VISION", style: "outline" }, 
];

const Team = () => {
  return (
    <section className={styles["team-main"]}>
      <div className={styles["team-video-wrapper"]}>
        <video
          className={styles["team-video"]}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/awards/awards.mp4" type="video/mp4" />
        </video>
      </div>

      <div className={styles["textual-content"]}>

        {/* Badge + Headings — Saath mein center mein (Mobile) */}
        <div className={styles["headings-group"]}>
          <div className={styles["top-badge"]}>
            <h3>[ Our Identity // Vol. 01 ]</h3>
          </div>

          {headings.map((heading, index) => (
            <div
              key={index}
              className={
                index === 2
                  ? styles["row-pink"] // "VISION" hamesha solid pink rahega
                  : heading.style === "outline"
                  ? styles["row-outline"]
                  : styles["row-solid"]
              }
            >
              <h1>{heading.text}</h1>
            </div>
          ))}
        </div>

        {/* Description box — Bottom Right (Desktop) / Bottom Full-Width (Mobile) */}
        <div className={styles["description-box"]}>
          <h2>
            A global network of producers, visionaries, and executives united by an 
            uncompromising dedication to the craft of cinema.
          </h2>
        </div>

      </div>
    </section>
  );
};

export default Team;