import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import SearchBar from "../searchbar/SearchBar";

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className={styles.container}>
      <ul>
        <li>
          <Link className={styles.link} to="/home">
            <h2>Countries App</h2>
          </Link>
        </li>
        <li className={styles.li2}>{location.pathname === "/home" && <SearchBar />}</li>
        <li className={styles.li1}>
          <Link className={styles.link} to="/form">
            CREATE ACTIVITY
          </Link>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/alexander-amenta/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn1.iconfinder.com/data/icons/social-media-circle-7/512/Circled_Linkedin_svg-256.png"
              alt="linkedin"
            />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/Alex-Amenta"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn1.iconfinder.com/data/icons/logotypes/32/github-256.png"
              alt="github"
            />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
