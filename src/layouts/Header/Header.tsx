import styles from "./header.module.css";
import { Logo } from "components/SvgIcons";

const Header = () => {
  return (
    <nav aria-label="Main Menu" className={styles.header}>
      <a href="https://www.personio.com/" rel="noreferrer" target="_blank">
        <Logo styles={{ height: "50px" }} />
      </a>

      <span className={styles.spacer} />

      <div className={styles.userWidget}>
        <img src="/images/user-img.jpg" alt="Maria" />
        <div className={styles.userWidgetText}>
          <span>Maria</span>
        </div>
      </div>
    </nav>
  );
};
export default Header;
