import styles from "./decade.module.css";

const Decade = () => {
  return (
    <section className={styles["decade-main"]}>

      {/* ── LEFT ── */}
      <div className={styles["decade-left"]}>
        <div className={styles["badge"]}>
          <span>[ 01. // HISTORY ]</span>
        </div>

        <h1 className={styles["decade-heading"]}>A DECADE</h1>

        <div className={styles["decade-text"]}>
          <p className={styles["text-bold"]}>
            It started with a single roll of 35mm film and an impossible idea.
            Our founders believed that cinema wasn't just entertainment—it was
            the most profound empathy engine ever created.
          </p>
          <p className={styles["text-light"]}>
            For a decade, we have championed visionary directors and distinct
            voices, shaping narratives that linger long after the credits roll.
            We don't just produce movies; we forge experiences that connect us
            to our shared humanity.
          </p>
        </div>
      </div>

      {/* ── RIGHT ── */}
      <div className={styles["decade-right"]}>
        <div className={styles["video-wrapper"]}>
          <video
            className={styles["decade-video"]}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/brand/decade.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Pink card — overlaps video */}
        <div className={styles["themes-card"]}>
          <div className={styles["themes-card-top"]}>
            <span className={styles["themes-label"]}>THEMES</span>
            <span className={styles["themes-arrow"]}>↘</span>
          </div>
          <h2 className={styles["themes-title"]}>THE SPACES BETWEEN</h2>
          <p className={styles["themes-desc"]}>
            Resilience. Identity. The space between the stars. We are drawn to
            stories of ordinary people in extraordinary circumstances, the
            friction between nature and technology, and the universal quest for
            belonging.
          </p>
        </div>
      </div>

    </section>
  );
};

export default Decade;