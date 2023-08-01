import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Filter.module.css";
import {
  alphabeticOrder,
  filteredActivity,
  filteredContinent,
  poblationOrder,
} from "../../redux/actions";

const Filter = () => {
  // Obtener el dispatch para poder enviar las acciones a Redux
  const dispatch = useDispatch();
  const allActivities = useSelector((state) => state.allActivities);

  // Manejar el cambio del filtro por continente
  const handleContinentChange = (event) => {
    dispatch(filteredContinent(event.target.value));
  };

  // Manejar el cambio del filtro por actividad
  const handleActivityChange = (event) => {
    dispatch(filteredActivity(event.target.value));
  };

  // Manejar el cambio del orden alfabético
  const handleAlphabeticOrderChange = (event) => {
    dispatch(alphabeticOrder(event.target.value));
  };

  // Manejar el cambio del orden por población
  const handlePopulationOrderChange = (event) => {
    dispatch(poblationOrder(event.target.value));
  };

  return (
    <div className={styles.container}>
      {/* Filtro por continente */}
      <div className={styles.filterGroup}>
        <label>Filter by Continent:</label>
        <select onChange={handleContinentChange}>
          <option value="All Continents">All Continents</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      {/* Filtro por actividad */}
      <div className={styles.filterGroup}>
        <label>Filter by Activity:</label>
        <select onChange={handleActivityChange}>
          <option value="All activities">All activities</option>
          {allActivities.map((activity) => (
            <option key={activity.id} value={activity.name}>{activity.name}</option>
          ))}
        </select>
      </div>

      {/* Orden alfabético */}
      <div className={styles.filterGroup}>
        <label>Alphabetic Order:</label>
        <select onChange={handleAlphabeticOrderChange}>
          <option value="from A to Z">A to Z</option>
          <option value="from Z to A">Z to A</option>
        </select>
      </div>

      {/* Orden por población */}
      <div className={styles.filterGroup}>
        <label>Population Order:</label>
        <select onChange={handlePopulationOrderChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
