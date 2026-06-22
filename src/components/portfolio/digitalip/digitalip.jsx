"use client";
import styles from "./digitalip.module.css";

const ipCards = [
  {
    id: 1,
    badge: "TWITCH / WEB",
    type: "INTERACTIVE WEB SERIES",
    title: "GRID/LOCK",
    image: "/images/portfolio/left.jpg", 
  },
  {
    id: 2,
    badge: "SPOTIFY / APPLE",
    type: "NARRATIVE PODCAST",
    title: "THE ARCHITECT'S JOURNAL",
    image: "/images/portfolio/right.jpg", 
  }
];

const DigitalIP = () => {
  return (
    <section className={styles["digital-main"]}>
      <div className={styles["container"]}>
        <div className={styles["header"]}>
          
          <div className={styles["icon-wrapper"]}>
            <div className={styles["vertical-axis"]}></div>
            <svg xmlns="http://www.w3.org/2000/svg" width="91" height="91" viewBox="0 0 91 91" fill="none">
              <mask id="path-1-inside-1_281_105" fill="white">
                <path d="M45.2549 0L90.5097 45.2548L45.2549 90.5097L4.57764e-05 45.2548L45.2549 0Z"/>
              </mask>
              <path d="M45.2549 0L46.6691 -1.41421L45.2549 -2.82843L43.8407 -1.41421L45.2549 0ZM90.5097 45.2548L91.9239 46.6691L93.3381 45.2548L91.9239 43.8406L90.5097 45.2548ZM45.2549 90.5097L43.8407 91.9239L45.2549 93.3381L46.6691 91.9239L45.2549 90.5097ZM4.57764e-05 45.2548L-1.41417 43.8406L-2.82838 45.2548L-1.41417 46.6691L4.57764e-05 45.2548ZM45.2549 0L43.8407 1.41421L89.0955 46.6691L90.5097 45.2548L91.9239 43.8406L46.6691 -1.41421L45.2549 0ZM90.5097 45.2548L89.0955 43.8406L43.8407 89.0955L45.2549 90.5097L46.6691 91.9239L91.9239 46.6691L90.5097 45.2548ZM45.2549 90.5097L46.6691 89.0955L1.41426 43.8406L4.57764e-05 45.2548L-1.41417 46.6691L43.8407 91.9239L45.2549 90.5097ZM4.57764e-05 45.2548L1.41426 46.6691L46.6691 1.41421L45.2549 0L43.8407 -1.41421L-1.41417 43.8406L4.57764e-05 45.2548Z" fill="#FFCA1A" mask="url(#path-1-inside-1_281_105)"/>
              <path d="M50.2549 35.2549H40.2549C39.1503 35.2549 38.2549 36.1503 38.2549 37.2549V53.2549C38.2549 54.3595 39.1503 55.2549 40.2549 55.2549H50.2549C51.3595 55.2549 52.2549 54.3595 52.2549 53.2549V37.2549C52.2549 36.1503 51.3595 35.2549 50.2549 35.2549Z" stroke="#FFCA1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M45.2549 51.2549H45.2649" stroke="#FFCA1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <div className={styles["badge"]}>
            <span>[ 03 // NEW MEDIA ]</span>
          </div>

          <div className={styles["title-wrapper"]}>
            <h1 className={styles["main-title"]}>DIGITAL & SOCIAL IP</h1>
          </div>
        </div>

        <div className={styles["cards-grid"]}>
          {ipCards.map((card) => (
            <a href="#" key={card.id} className={styles["ip-card"]}>
              <div className={styles["card-image-wrapper"]}>
                <img src={card.image} alt={card.title} className={styles["card-img"]} />
                <div className={styles["platform-badge"]}>{card.badge}</div>
              </div>
              <div className={styles["card-content"]}>
                <span className={styles["content-type"]}>{card.type}</span>
                <h2 className={styles["content-title"]}>{card.title}</h2>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DigitalIP;