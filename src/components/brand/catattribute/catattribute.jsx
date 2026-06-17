// catattribute.jsx
import styles from "./catattribute.module.css";

const defaultAttributes = [
  {
    index: "01 //",
    heading: "EMOTIONAL",
    outline: false,
    highlight: "Visceral, melancholic, triumphant.",
    paragraphs: [
      "We want our audience to feel the cold of the rain and the warmth of the sun in every frame.",
      "Our films strike a chord that resonates in the quiet moments—the lingering glance, the breath before speaking, the empty room.",
    ],
    image: "/images/brand/emotional.jpg",
    alt: "Emotional",
  },
  {
    index: "02 //",
    heading: "VISUAL",
    outline: true,
    highlight: "High contrast, motivated lighting.",
    paragraphs: [
      "A commitment to shooting on film whenever possible. We embrace grain, texture, and deep, saturated shadows.",
      "Every frame is a painting; every cut has a purpose, grounding the fantastical in raw reality.",
    ],
    image: "/images/brand/visual.jpg",
    alt: "Visual",
  },
];

const CatAttribute = ({
  badgeLabel = "[ 02. // CORE ATTRIBUTES ]",
  attributes = defaultAttributes,
}) => {
  return (
    <section className={styles["cat-main"]}>
      <div className={styles["badge"]}>
        <span>{badgeLabel}</span>
      </div>

      <div className={styles["attr-list"]}>
        {attributes.map((attr, i) => (
          <div className={styles["attr-row"]} key={attr.heading ?? i}>
            <div className={styles["attr-left"]}>
              <span className={styles["attr-index"]}>{attr.index}</span>
              <h2
                className={
                  attr.outline
                    ? `${styles["attr-heading"]} ${styles["attr-heading-outline"]}`
                    : styles["attr-heading"]
                }
              >
                {attr.heading}
              </h2>
            </div>

            <div className={styles["attr-content"]}>
              <div className={styles["attr-text"]}>
                <span className={styles["attr-highlight"]}>
                  {attr.highlight}
                </span>
                {attr.paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <div className={styles["attr-image"]}>
                <img src={attr.image} alt={attr.alt} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CatAttribute;