"use client";
import styles from "./physical.module.css";

const physicalItems = [
  {
    id: 1,
    title: "CAMERA SYSTEMS",
    desc: "ARRI Alexa 35, RED V-Raptor XL 8K VV, Sony Venice 2. Fully rigged for harsh environments.",
    icon: (
      <svg className={styles["feature-svg"]} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
        <path d="M10.0003 18.3333C14.6027 18.3333 18.3337 14.6023 18.3337 9.99996C18.3337 5.39759 14.6027 1.66663 10.0003 1.66663C5.39795 1.66663 1.66699 5.39759 1.66699 9.99996C1.66699 14.6023 5.39795 18.3333 10.0003 18.3333Z" stroke="#D9186A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.9248 6.66663L16.7081 14.95" stroke="#D9186A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.0752 6.66663H17.6419" stroke="#D9186A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.15039 10L10.9337 1.71667" stroke="#D9186A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.07532 13.3334L3.29199 5.05005" stroke="#D9186A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.9251 13.3334H2.3584" stroke="#D9186A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13.8497 10L9.06641 18.2833" stroke="#D9186A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: "OPTICS & GLASS",
    desc: "Cooke Anamorphic /i, Panavision Primo series, vintage rehoused sphericals.",
    icon: (
      <svg className={styles["feature-svg"]} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
        <path d="M10.1833 1.66663H9.81667C9.37464 1.66663 8.95072 1.84222 8.63816 2.15478C8.3256 2.46734 8.15 2.89127 8.15 3.33329V3.48329C8.1497 3.77556 8.07255 4.06262 7.92628 4.31566C7.78002 4.5687 7.56978 4.77882 7.31667 4.92496L6.95834 5.13329C6.70497 5.27957 6.41756 5.35658 6.125 5.35658C5.83244 5.35658 5.54503 5.27957 5.29167 5.13329L5.16667 5.06663C4.78422 4.84601 4.32987 4.78616 3.90334 4.90022C3.47681 5.01427 3.11296 5.29291 2.89167 5.67496L2.70833 5.99163C2.48772 6.37407 2.42787 6.82843 2.54192 7.25496C2.65598 7.68149 2.93461 8.04533 3.31667 8.26663L3.44167 8.34996C3.69356 8.49538 3.90302 8.7042 4.04921 8.95565C4.1954 9.2071 4.27325 9.49244 4.275 9.78329V10.2083C4.27617 10.502 4.19971 10.7908 4.05337 11.0454C3.90703 11.3 3.69601 11.5115 3.44167 11.6583L3.31667 11.7333C2.93461 11.9546 2.65598 12.3184 2.54192 12.745C2.42787 13.1715 2.48772 13.6258 2.70833 14.0083L2.89167 14.325C3.11296 14.707 3.47681 14.9856 3.90334 15.0997C4.32987 15.2138 4.78422 15.1539 5.16667 14.9333L5.29167 14.8666C5.54503 14.7203 5.83244 14.6433 6.125 14.6433C6.41756 14.6433 6.70497 14.7203 6.95834 14.8666L7.31667 15.075C7.56978 15.2211 7.78002 15.4312 7.92628 15.6843C8.07255 15.9373 8.1497 16.2244 8.15 16.5166V16.6666C8.15 17.1087 8.3256 17.5326 8.63816 17.8451C8.95072 18.1577 9.37464 18.3333 9.81667 18.3333H10.1833C10.6254 18.3333 11.0493 18.1577 11.3618 17.8451C11.6744 17.5326 11.85 17.1087 11.85 16.6666V16.5166C11.8503 16.2244 11.9275 15.9373 12.0737 15.6843C12.22 15.4312 12.4302 15.2211 12.6833 15.075L13.0417 14.8666C13.295 14.7203 13.5824 14.6433 13.875 14.6433C14.1676 14.6433 14.455 14.7203 14.7083 14.8666L14.8333 14.9333C15.2158 15.1539 15.6701 15.2138 16.0967 15.0997C16.5232 14.9856 16.887 14.707 17.1083 14.325L17.2917 14C17.5123 13.6175 17.5721 13.1632 17.4581 12.7366C17.344 12.3101 17.0654 11.9463 16.6833 11.725L16.5583 11.6583C16.304 11.5115 16.093 11.3 15.9466 11.0454C15.8003 10.7908 15.7238 10.502 15.725 10.2083V9.79163C15.7238 9.49794 15.8003 9.20917 15.9466 8.95454C16.093 8.69991 16.304 8.48847 16.5583 8.34163L16.6833 8.26663C17.0654 8.04533 17.344 7.68149 17.4581 7.25496C17.5721 6.82843 17.5123 6.37407 17.2917 5.99163L17.1083 5.67496C16.887 5.29291 16.5232 5.01427 16.0967 4.90022C15.6701 4.78616 15.2158 4.84601 14.8333 5.06663L14.7083 5.13329C14.455 5.27957 14.1676 5.35658 13.875 5.35658C13.5824 5.35658 13.295 5.27957 13.0417 5.13329L12.6833 4.92496C12.4302 4.77882 12.22 4.5687 12.0737 4.31566C11.9275 4.06262 11.8503 3.77556 11.85 3.48329V3.33329C11.85 2.89127 11.6744 2.46734 11.3618 2.15478C11.0493 1.84222 10.6254 1.66663 10.1833 1.66663Z" stroke="#D9186A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#D9186A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: "THE HOUSE",
    desc: "10,000 sq ft brutalist soundstage. Dedicated DIT workflow architecture, automated lighting grid.",
    icon: (
      <svg className={styles["feature-svg"]} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
        <path d="M14.1663 17.5V15.8333C13.9453 15.8333 13.7334 15.7455 13.5771 15.5893C13.4208 15.433 13.333 15.221 13.333 15V14.1667C13.333 13.7246 13.5086 13.3007 13.8212 12.9882C14.1337 12.6756 14.5576 12.5 14.9997 12.5H16.6663C17.1084 12.5 17.5323 12.6756 17.8449 12.9882C18.1574 13.3007 18.333 13.7246 18.333 14.1667V15C18.333 15.221 18.2452 15.433 18.0889 15.5893C17.9327 15.7455 17.7207 15.8333 17.4997 15.8333" stroke="#D9186A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.8337 12.5V5.41667C15.8337 4.64312 15.5264 3.90125 14.9794 3.35427C14.4324 2.80729 13.6905 2.5 12.917 2.5C12.1434 2.5 11.4016 2.80729 10.8546 3.35427C10.3076 3.90125 10.0003 4.64312 10.0003 5.41667V14.5833C10.0003 15.3569 9.69303 16.0987 9.14605 16.6457C8.59907 17.1927 7.85721 17.5 7.08366 17.5C6.31011 17.5 5.56825 17.1927 5.02126 16.6457C4.47428 16.0987 4.16699 15.3569 4.16699 14.5833V7.5" stroke="#D9186A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17.5003 17.5V15.8334H14.167" stroke="#D9186A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.5 4.16667H5.83333V2.5" stroke="#D9186A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.83366 4.16667C6.05467 4.16667 6.26663 4.25446 6.42291 4.41074C6.57919 4.56702 6.66699 4.77899 6.66699 5V5.83333C6.66699 6.27536 6.4914 6.69928 6.17884 7.01184C5.86628 7.3244 5.44235 7.5 5.00033 7.5H3.33366C2.89163 7.5 2.46771 7.3244 2.15515 7.01184C1.84259 6.69928 1.66699 6.27536 1.66699 5.83333V5C1.66699 4.77899 1.75479 4.56702 1.91107 4.41074C2.06735 4.25446 2.27931 4.16667 2.50033 4.16667V2.5" stroke="#D9186A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const PhysicalList = () => {
  return (
    <section className={styles["physical-main"]}>
      {/* ── HEADER LAYOUT ── */}
      <div className={styles["header-top"]}>
        <div className={styles["badge-wrapper"]}>
          {/* Custom SVG Icon */}
          <svg className={styles["badge-icon"]} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
            <path d="M10.417 8.07288C10.4173 7.93412 10.4545 7.79793 10.5248 7.67832C10.5951 7.55871 10.6961 7.45999 10.8172 7.39231C10.9383 7.32463 11.0753 7.29044 11.2141 7.29325C11.3528 7.29606 11.4883 7.33577 11.6066 7.4083L15.4232 9.75101C15.537 9.8209 15.6309 9.91879 15.6961 10.0353C15.7613 10.1518 15.7955 10.2831 15.7955 10.4166C15.7955 10.5501 15.7613 10.6814 15.6961 10.7979C15.6309 10.9145 15.537 11.0124 15.4232 11.0823L11.6066 13.426C11.4881 13.4986 11.3525 13.5383 11.2135 13.5411C11.0746 13.5438 10.9375 13.5094 10.8163 13.4415C10.6951 13.3736 10.5942 13.2745 10.524 13.1546C10.4538 13.0347 10.4169 12.8983 10.417 12.7593V8.07288Z" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.5 17.7084V21.875" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.33301 21.875H16.6663" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.833 3.125H4.16634C3.01575 3.125 2.08301 4.05774 2.08301 5.20833V15.625C2.08301 16.7756 3.01575 17.7083 4.16634 17.7083H20.833C21.9836 17.7083 22.9163 16.7756 22.9163 15.625V5.20833C22.9163 4.05774 21.9836 3.125 20.833 3.125Z" stroke="#C40053" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className={styles["badge-text"]}>
            <h3>[ 02 // CO-PRODUCTIONS ]</h3>
          </div>
        </div>
        <span className={styles["header-line"]}></span>

        <div className={styles["title-wrapper"]}>
          <h1 className={styles["main-title"]}>PHYSICAL</h1>
        </div>
      </div>

      {/* ── MAIN CONTENT SPLIT GRID ── */}
      <div className={styles["main-grid"]}>

        {/* Left: Sticky Image Showcase with Yellow Frame */}
        <div className={styles["image-showcase-wrapper"]}>
          <div className={styles["yellow-frame"]}>
            <img
              src="/images/services/services.jpg"
              alt="Arri Camera Tech"
              className={styles["hero-image"]}
            />
            {/* Pink Code Badge Overlap */}
            <div className={styles["sys-badge"]}>
              SYS_ARRI.35
            </div>
          </div>
        </div>

        {/* Right: Intro text & Feature lists (Perfect Left Alignment) */}
        <div className={styles["content-details"]}>
          <p className={styles["intro-text"]}>
            We operate a bleeding-edge in-house technical arsenal. Our production unit utilizes the highest standard of cinematic tools, bypassing the need for external rentals and giving our DP's ultimate creative freedom.
          </p>

          <div className={styles["list-container"]}>
            {physicalItems.map((item) => (
              <div key={item.id} className={styles["list-row"]}>
                <div className={styles["item-header"]}>
                  {item.icon}
                  <h2 className={styles["item-title"]}>{item.title}</h2>
                </div>
                <p className={styles["item-desc"]}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PhysicalList;