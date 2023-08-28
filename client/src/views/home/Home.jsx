import styles from "./Home.module.css";
import CardsContainer from "../../components/cards-container/CardsCotainer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities, getCountries } from "../../redux/actions";
import Filter from "../../components/filter/Filter";

const Home = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.allActivities);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getCountries(countries));
    dispatch(getActivities(activities));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage}>
        <Filter
          setCurrentPage={setCurrentPage}
        />
        {countries.length === 0 ? (
          <div className={styles.loader}>
            <div className={styles.orbe} style={{ "--index": 0 }}></div>
            <div className={styles.orbe} style={{ "--index": 1 }}></div>
            <div className={styles.orbe} style={{ "--index": 2 }}></div>
            <div className={styles.orbe} style={{ "--index": 3 }}></div>
            <div className={styles.orbe} style={{ "--index": 4 }}></div>
          </div>
        ) : (
          <CardsContainer
            countries={countries}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        <a href="#" className={styles.scrollLink}>
          &#8679; Top
        </a>
      </div>
    </div>
  );
};

export default Home;
