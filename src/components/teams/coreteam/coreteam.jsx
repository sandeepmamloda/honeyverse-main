import styles from "./coreteam.module.css";

const teamMembers = [
  {
    id: 1,
    role: "FOUNDER",
    name: "HONEY B. SINGH",
    bio: "A veteran of indie cinema, Honey founded Lumière with a singular vision: to protect the director's voice at all costs. Over 15 years, he has produced award-winning features spanning three continents.",
    image: "/images/teams/honey.jpg",
  },
  {
    id: 2,
    role: "HEAD OF DEVELOPMENT",
    name: "SARAH CHEN",
    bio: "Formerly a programmer at major European festivals, Sarah has an unparalleled eye for emerging talent and unconventional narratives. She leads our script acquisition and writer incubation programs.",
    image: "/images/teams/sarahchen.jpg",
  },
];

const CoreTeam = () => {
  return (
    <section className={styles["core-main"]}>
      {/* Top Header Layout */}
      <div className={styles["core-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["badge"]}>
            <h3>[ LEADERSHIP // VOL. 1 ]</h3>
          </div>
          <div className={styles["main-title"]}>
            <span className={styles["text-yellow"]}>THE</span>{" "}
            <span className={styles["text-outline"]}>CORE</span>
          </div>
        </div>
        
        <div className={styles["header-right"]}>
          <p>
            OUR VISUAL IDENTITY IS ROOTED IN STRUCTURAL BRUTALISM. STARK,
            UNCOMPROMISING, AND DESIGNED TO LEAVE A LASTING IMPRESSION.
          </p>
        </div>
      </div>

      {/* Grid Border Accent Line */}
      <div className={styles["divider-line"]}></div>

      {/* Team Cards Container */}
      <div className={styles["team-grid"]}>
        {teamMembers.map((member) => (
          <div key={member.id} className={styles["member-card"]}>
            <div className={styles["image-wrapper"]}>
              {member.image ? (
                <img src={member.image} alt={member.name} className={styles["profile-img"]} />
              ) : (
                <div className={styles["placeholder-img"]}></div>
              )}
              
              <div className={styles["image-overlay"]}>
                <span className={styles["member-role"]}>{member.role}</span>
                <h2 className={styles["member-name"]}>{member.name}</h2>
              </div>
            </div>

            <div className={styles["member-bio"]}>
              <p>{member.bio}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Action Button Row */}
      <div className={styles["action-row"]}>
        <button className={styles["load-more-btn"]}>
          Load More <span>+</span>
        </button>
      </div>
    </section>
  );
};

export default CoreTeam;