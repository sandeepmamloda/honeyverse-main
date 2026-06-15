import styles from "./mark.module.css";

const cards = [
  {
    fig: "FIG. A",
    bg: "dark",
    content: "logo",
    title: "LOGO ARCHITECTURE",
    desc: "Built on a strict 12-column mathematical grid. No curves, no compromises.",
  },
  {
    fig: "FIG. B",
    bg: "texture",
    content: "typo",
    title: "TYPOGRAPHIC SYSTEM",
    desc: "Heavy weights, negative tracking. Information hierarchy driven by stark scale contrast.",
  },
  {
    fig: "FIG. C",
    bg: "color",
    content: "palette",
    title: "COLOR PALETTE",
    desc: "Absolute black vs. saffron. Maximum contrast. Used to direct the eye, never merely to decorate.",
  },
];

const BrandSection = () => {
  return (
    <section className={styles["brand-main"]}>

      {/* ── PART 1: THE MARK ── */}
      <div className={styles["brand-top"]}>
        <div className={styles["brand-top-left"]}>
          <div className={styles["badge"]}>
            <span>[ OUR IDENTITY // VOL. 01 ]</span>
          </div>
          <div className={styles["mark-heading"]}>
            <h1>
              <span className={styles["the"]}>THE </span>
              <span className={styles["mark"]}>MARK</span>
            </h1>
          </div>
        </div>
        <div className={styles["brand-top-right"]}>
          <p>
            Our visual identity is rooted in structural brutalism. Stark,
            uncompromising, and designed to leave a lasting impression.
          </p>
        </div>
      </div>

      <div className={styles["divider"]} />

      {/* ── PART 2: CARDS ── */}
      <div className={styles["brand-cards"]}>
        {cards.map((card, i) => (
          <div key={i} className={styles["card"]}>
            <div className={`${styles["card-visual"]} ${styles[`card-visual--${card.content}`]}`}>
              <span className={styles["fig-label"]}>{card.fig}</span>
              {card.content === "logo" && (
                <div className={styles["logo-preview"]}>
                  <span className={styles["logo-text"]}>HONEY<br />VERSE</span>
                </div>
              )}
              {card.content === "typo" && (
                <div className={styles["typo-preview"]}>
                  <span className={styles["typo-big"]}>SATOSHI</span>
                  <span className={styles["typo-small"]}>stark typefaces.</span>
                </div>
              )}
              {card.content === "palette" && (
                <div className={styles["palette-preview"]}>
                  <div className={styles["swatch-dark"]}>
                    <span>#323232</span>
                  </div>
                  <div className={styles["swatch-pink"]}>
                    <span>#d8186a</span>
                  </div>
                </div>
              )}
            </div>
            <div className={styles["card-info"]}>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── PART 3: MANIFESTO ── */}
      <div className={styles["brand-manifesto"]}>
        <div className={styles["manifesto-intro"]}>
          <div className={styles["badge"]}>
            <span>[ BRAND MANIFESTO // VOL. 02 ]</span>
          </div>
          <p>
            The thinking behind how we work guiding how we Write, Direct, and
            produce films.
          </p>
        </div>
        <blockquote className={styles["manifesto-quote"]}>
          "Built to tell meaningful stories, not chase noise. Clear vision.
          Honest filmmaking. Lasting impact.
        </blockquote>
      </div>

    </section>
  );
};

export default BrandSection;