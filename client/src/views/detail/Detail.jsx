import { useDispatch, useSelector } from "react-redux";
import styles from "./Detail.module.css";
import { getActivities, getCountryById } from "../../redux/actions";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Detail = () => {
  const { id } = useParams();
  const country = useSelector((state) => state.country);
  const activities = useSelector((state) => state.allActivities);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryById(id)); // Llama a la función de la acción para obtener los detalles del país por ID.
    dispatch(getActivities());
  }, [dispatch, id]);

  return (
    <div className={styles.container}>
      {!country ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <div className={styles.container_country}>
            <h1>Country Detail</h1>
            <h2>{country.name}</h2>
            <img src={country.flag} alt={country.name} />
            <div className={styles.section}>
              <h3>
                Continent: <span>{country.continent}</span>
              </h3>
              <h3>
                Capital: <span>{country.capital}</span>
              </h3>
              <h3>
                Subregion: <span>{country.subregion}</span>
              </h3>
              <h3>
                Population: <span>{country.population}</span>
              </h3>
              <h3>
                Área: <span>{country.area} km²</span>
              </h3>
            </div>
          </div>
        </div>
      )}

      {activities.length > 0 && (
        <div className={styles.card_activity}>
          <h1>Activities</h1>
          {activities.map((activity) => {
            return (
              <div key={activity.id} className={styles.section_activity}>
                <h4>
                  Name: <span>{activity.name}</span>
                </h4>
                <h4>
                  Duration: <span>{activity.duration}</span>
                </h4>
                <h4>
                  Difficulty: <span>{activity.difficulty}</span>
                </h4>
                <h4>
                  Season: <span>{activity.season}</span>
                </h4>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Detail;
