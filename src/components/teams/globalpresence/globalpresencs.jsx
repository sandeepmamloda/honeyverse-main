"use client";
import styles from "./globalpresencs.module.css";

const locations = [
  {
    id: 1,
    city: "NEW YORK",
    address: "144 BROADWAY, STUDIO 9B",
    coords: "40.7128° N, 74.0060° W",
    isHQ: true,
    isActive: false,
  },
  {
    id: 2,
    city: "LONDON",
    address: "SOHO SQUARE, W1D 3QB",
    coords: "51.5074° N, 0.1278° W",
    isHQ: false,
    isActive: true, // Ye image ke hisaab se pink (active) hai
  },
  {
    id: 3,
    city: "PARIS",
    address: "LE MARAIS, 75003",
    coords: "48.8566° N, 2.3522° E",
    isHQ: false,
    isActive: false,
  },
  {
    id: 4,
    city: "TOKYO",
    address: "SHIBUYA-KU, 150-0002",
    coords: "35.6762° N, 139.6503° E",
    isHQ: false,
    isActive: false,
  },
];

const GlobalPresence = () => {
  return (
    <section className={styles["global-main"]}>
      <div className={styles["global-container"]}>
        
        {/* ── HEADER SECTION ── */}
        <div className={styles["header-section"]}>
          <div className={styles["globe-icon"]}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 64 64" fill="none">
              <mask id="path-1-inside-1_278_1065" fill="white">
                <path d="M0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32Z"/>
              </mask>
              <path d="M0 32M64 32M64 32M0 32M32 0M64 32M32 64M0 32M32 64V63C14.8792 63 1 49.1208 1 32H0H-1C-1 50.2254 13.7746 65 32 65V64ZM64 32H63C63 49.1208 49.1208 63 32 63V64V65C50.2254 65 65 50.2254 65 32H64ZM32 0V1C49.1208 1 63 14.8792 63 32H64H65C65 13.7746 50.2254 -1 32 -1V0ZM32 0V-1C13.7746 -1 -1 13.7746 -1 32H0H1C1 14.8792 14.8792 1 32 1V0Z" fill="#FFCA1A" mask="url(#path-1-inside-1_278_1065)"/>
              <path d="M32 42C37.5228 42 42 37.5228 42 32C42 26.4772 37.5228 22 32 22C26.4772 22 22 26.4772 22 32C22 37.5228 26.4772 42 32 42Z" stroke="#FFCA1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M32 22C29.4322 24.6962 28 28.2767 28 32C28 35.7233 29.4322 39.3038 32 42C34.5678 39.3038 36 35.7233 36 32C36 28.2767 34.5678 24.6962 32 22Z" stroke="#FFCA1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 32H42" stroke="#FFCA1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className={styles["main-title"]}>GLOBAL PRESENCE</h2>
          <div className={styles["badge"]}>
            <span>[ 03 // OPERATIONAL REGIONS ]</span>
          </div>
        </div>

        {/* ── CARDS GRID ── */}
        <div className={styles["cards-grid"]}>
          {locations.map((loc) => (
            <div 
              key={loc.id} 
              className={`${styles["location-card"]} ${loc.isActive ? styles["active"] : ""}`}
            >
              {/* Shimmer sweep layer (same as labs-and-residencies cards) */}
              <div className={styles["card-shimmer"]} />

              <div className={styles["card-top"]}>
                {/* Pin Icon */}
                <div className={styles["pin-icon"]}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20 10C20 14.993 14.461 20.193 12.601 21.799C12.4277 21.9293 12.2168 21.9998 12 21.9998C11.7832 21.9998 11.5723 21.9293 11.399 21.799C9.539 20.193 4 14.993 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                
                {/* HQ Badge (Only for New York) */}
                {loc.isHQ && (
                  <div className={styles["hq-badge"]}>HQ</div>
                )}
              </div>

              <div className={styles["card-bottom"]}>
                <h3 className={styles["city-name"]}>{loc.city}</h3>
                <div className={styles["address-block"]}>
                  <p>{loc.address}</p>
                  <p>{loc.coords}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GlobalPresence;