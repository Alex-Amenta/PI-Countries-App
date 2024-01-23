import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import SearchBar from "../searchbar/SearchBar";
import githubIcon from "../../assets/githubIcon.svg";
import linkdeinIcon from "../../assets/linkedinIcon.svg";

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
        <li className={styles.li2}>
          {location.pathname === "/home" && <SearchBar />}
        </li>
        <li className={styles.li1}>
          <Link className={styles.link} to="/form">
            CREATE ACTIVITY
          </Link>
        </li>
        <li style={{marginRight: "1rem"}}>
          <a
            href="https://www.linkedin.com/in/alexander-amenta/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkdeinIcon} className={styles.social_icon} alt="LinkedIn Icon" width={25} height={30}/>
          </a>
        </li>
        <li style={{marginRight: "1rem"}}>
          <a
            href="https://github.com/Alex-Amenta"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={githubIcon} alt="Github Icon" className={styles.social_icon} width={25} height={30}/>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
