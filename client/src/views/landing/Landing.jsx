import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={styles.landing}>
      <div className={styles.backgroundImage}>
        <h1>
        Welcome to Countries
        </h1>
        <h2>Explore the diversity of the world and find your next destination</h2>
        <Link to='/home'>
            <button><span>Get into</span></button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
