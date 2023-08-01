import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={styles.landing}>
      <div className={styles.backgroundImage}>
        <h1>
          Bienvenido a Countries
        </h1>
        <h2>Explora la diversidad del mundo y encuentra tu próximo destino</h2>
        <Link to='/home'>
            <button><span>Ingresar</span></button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
