import styles from "./navbar.module.css";
import Image from "next/image";

const Navbar = function () {
  return (
    <header className={styles["header-main"]}>
      <div className={styles["header-wrapper"]}>
        <nav className={styles["header-left"]}>
          <a href="#">MENU</a>
        </nav>

        <div className={styles["header-logo"]}>
          <a href="/">
            <Image
              src="/images/header/logo.png"
              alt="Honeyverse Logo"
              width={0}
              height={0}
              sizes="100vw"
              priority
              className={styles["header-logo-img"]}
            />
          </a>
        </div>

        <nav className={styles["header-right"]}>
          <a href="#">CONTACT</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;