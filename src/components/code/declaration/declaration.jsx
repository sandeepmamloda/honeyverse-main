"use client";
import styles from "./declaration.module.css";

const Declaration = () => {
  return (
    <section className={styles["declaration-main"]}>
      {/* ── TOP WRAPPER: BADGE + TITLE ── */}
      <div className={styles["top-row"]}>
        <div className={styles["badge-wrapper"]}>
          <span>[ THE_DECLARATION ]</span>
        </div>

        <h1 className={styles["main-title"]}>
          <span className={styles["text-solid"]}>BEYOND</span>
          <span className={styles["text-outline"]}>CONTENT</span>
        </h1>
      </div>

      {/* ── BOTTOM WRAPPER: IMAGE + STATEMENT ── */}
      <div className={styles["bottom-row"]}>
        <div className={styles["image-wrapper"]}>
          <img
            src="/images/code/declaration.jpg"
            alt="Architecture"
            className={styles["declaration-image"]}
          />
          <div className={styles["corner-bracket"]}></div>
        </div>

        <div className={styles["statement-block"]}>
          <div className={styles["heading-row"]}>
            <span className={styles["dash-icon"]}>—</span>
            <h2 className={styles["statement-heading"]}>
              <span className={styles["heading-yellow"]}>Content is disposable.</span>
              <span className={styles["heading-pink"]}>Architecture stands.</span>
            </h2>
          </div>

          <p className={styles["statement-paragraph"]}>
            We reject the algorithm. We reject the safe bet. We embrace the
            void, and we build within it. Every frame is a calculation,
            every cut is a statement.
          </p>

          <div className={styles["meta-lines"]}>
            <p>
              WE DO NOT MAKE <span className={styles["strikethrough"]}>ENTERTAINMENT</span>.
            </p>
            <p>WE ENGINEER EMOTION.</p>
          </div>

          <h3 className={styles["vision-text"]}>VISION</h3>
        </div>
      </div>
    </section>
  );
};

export default Declaration;