"use client";
import styles from "./principles.module.css";

const principlesItems = [
  {
    id: 1,
    number: "01",
    title: "Brutal Honesty",
    description:
      "No artificial sweetener. No manufactured sentiment. We strip away the unnecessary to reveal the raw structural beams of the narrative. If it doesn't serve the core truth of the story, it is excised.",
  },
  {
    id: 2,
    number: "02",
    title: "Technical Precision",
    description:
      "Art without discipline is chaos. We treat cameras as scientific instruments and lights as surgical tools. Every frame is calculated, measured, and executed with absolute systemic rigor.",
  },
  {
    id: 3,
    number: "03",
    title: "Friction over Comfort",
    description:
      "Comfort is the enemy of progress. We actively seek out visual and narrative friction. We use high contrast, jarring edits, and challenging subject matter to force the audience into an active state of engagement.",
  },
  {
    id: 4,
    number: "04",
    title: "Data Integrity",
    description:
      "A film is a dataset. From the initial DIT offload to the final color grade, we maintain absolute strictness over our pipeline. No lost frames. No corrupted proxies. No degraded master files.",
  },
];

const PrincipleItem = ({ item }) => (
  <div className={styles["principle-item"]}>
    <div className={styles["item-heading"]}>
      <span className={styles["item-number"]}>{item.number}</span>
      <h2 className={styles["item-title"]}>{item.title}</h2>
    </div>
    <p className={styles["item-description"]}>{item.description}</p>
    <div className={styles["item-dots"]}>
      <span className={styles["dot"]}></span>
      <span className={styles["dot"]}></span>
      <span className={styles["dot"]}></span>
    </div>
  </div>
);

const Principles = () => {
  const [row1, row2] = [principlesItems.slice(0, 2), principlesItems.slice(2, 4)];

  return (
    <section className={styles["principles-main"]}>
      {/* ── ROW 1 ── */}
      <div className={styles["principles-grid"]}>
        {row1.map((item) => (
          <PrincipleItem key={item.id} item={item} />
        ))}
      </div>

      {/* ── STRUCTURAL IMAGE BANNER ── */}
      <div className={styles["image-banner"]}>
        <img
          src="/images/code/principle.jpg"
          alt="Structural integrity"
          className={styles["banner-image"]}
        />
        <div className={styles["banner-badge"]}>
          <span>STRUCTURAL_INTEGRITY_CHECK</span>
        </div>
      </div>

      {/* ── ROW 2 ── */}
      <div className={styles["principles-grid"]}>
        {row2.map((item) => (
          <PrincipleItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Principles;