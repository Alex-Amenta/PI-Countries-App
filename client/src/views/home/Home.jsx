import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import CardsContainer from "../../components/cards-container/CardsCotainer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../redux/actions";
import Filter from "../../components/filter/Filter";

const Home = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(getCountries(countries));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage}>
        <Filter />
        <CardsContainer countries={countries} />
        <a href="#" className={styles.scrollLink}>
          &#8679; Top
        </a>
      </div>
    </div>
  );
};

export default Home;
