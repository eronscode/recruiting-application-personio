import styles from "./footer.module.css";

const Footer = () => (
  <footer aria-label="Footer" className={styles.footer}>
    <small>
      Copyright {new Date().getFullYear()}{" "}
      <a href="https://www.personio.com/">Personio</a>. All Rights Reserved.
    </small>
  </footer>
);

export default Footer;
