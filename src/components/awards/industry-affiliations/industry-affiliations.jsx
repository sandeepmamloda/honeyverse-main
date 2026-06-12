import styles from "./industry-affiliations.module.css";
const datas=[
    {
        id:1,
        content:"AMPAS"
    },
    {
        id:2,
        content:"PGA"
    },
    {
        id:3,
        content:"DGA"
    },
    {
        id:4,
        content:"WGA"
    },
    {
        id:5,
        content:"BAFTA"
    },
    {
        id:6,
        content:"EFA"
    }
];

const IndustryAffiliations = function () {
  return (
    <section className={styles["industry-affiliations-wrapper"]}>
      <div className={styles["industry-affiliations-left"]}>
        <span className={styles["svg"]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
          >
            <path
              d="M6 44H42"
              stroke="#D9186A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 36V22"
              stroke="#D9186A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 36V22"
              stroke="#D9186A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M28 36V22"
              stroke="#D9186A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M36 36V22"
              stroke="#D9186A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24 4L40 14H8L24 4Z"
              stroke="#D9186A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h2>Industry Affiliations</h2>
        <p>Proud members of the organizations shaping the future of global cinema and entertainment.</p>
      </div>

      <div className={styles["industry-affiliations-right"]}>
        {
            datas.map(
                each=>{
                  return(<div key={each.id} className={styles["industry-affiliations-product"]}>
                    <p>
                        {each.content}
                    </p>
                  </div>);
                }
            )
        }
      </div>
    </section>
  );
};

export default IndustryAffiliations;