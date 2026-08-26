"use client";
import styles from "./feararchitecture.module.css";
import { useRouter } from "next/navigation";

const DocumentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.333 1.333H4A1.333 1.333 0 0 0 2.667 2.667v10.666A1.333 1.333 0 0 0 4 14.667h8a1.333 1.333 0 0 0 1.333-1.334V5.333L9.333 1.333Z"
      stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
    />
    <path d="M9.333 1.333V5.333h4" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.333 8.667h5.334M5.333 11.333h5.334" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.167 10h11.666" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 4.167 15.833 10 10 15.833" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FearArchitecture = ({
  badgeLabel = "FEATURED_TRANSMISSION",
  date = "OCT. 2025",
  publication = "CINEASTE QUARTERLY",
  title = "THE ARCHITECTURE OF FEAR",
  quote = "How HONEYVERSE Pictures is restructuring the modern thriller by completely abandoning traditional three-act structures in favor of spatial geometry.",
  image = "/images/news/feararchitecture.jpg",
  content = [
    {
      heading: "The Collapse of the Three-Act Structure",
      body: "Traditional narrative geometry assumes a beginning, middle, and end — a straight line the audience can trust. HONEYVERSE Pictures rejects that line entirely, treating story not as a timeline but as a room the viewer is trapped inside.",
    },
    {
      heading: "Fear as Spatial Design",
      body: "Instead of building tension through plot beats, the studio builds it through architecture — corridors that narrow, ceilings that lower, doorways that never lead where they promise to.",
    },
  ],
}) => {
  const router = useRouter();

  const handleReadMore = () => {
    const params = new URLSearchParams({
      title,
      image,
      date,
      duration: publication,
      subtitle: quote,
      content: JSON.stringify(content),
    });
    router.push(`/news-article?${params.toString()}`);
  };

  return (
    <section className={styles["feararchitecture-wrapper"]}>
      <div className={styles["feararchitecture-card"]}>
        {/* ── LEFT: IMAGE ── */}
        <div className={styles["image-wrap"]}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles["image"]} src={image} alt={title} />

          <div className={styles["badge"]}>
            <DocumentIcon />
            <span>{badgeLabel}</span>
          </div>
        </div>

        {/* ── RIGHT: CONTENT ── */}
        <div className={styles["content"]}>
          <div className={styles["meta-row"]}>
            <span>{date}</span>
            <span className={styles["meta-dot"]} />
            <span>{publication}</span>
          </div>

          <h2 className={styles["title"]}>{title}</h2>

          <div className={styles["quote-block"]}>
            <p>{quote}</p>
          </div>

          <button type="button" onClick={handleReadMore} className={styles["read-link"]}>
            <span>[ READ_FULL_ARTICLE ]</span>
            <span className={styles["read-arrow"]}>
              <ArrowIcon />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FearArchitecture;