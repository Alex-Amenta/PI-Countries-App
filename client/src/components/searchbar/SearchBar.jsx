import { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../../redux/actions";

const SearchBar = () => {
  const [countryName, setCountryName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (countryName.length === 0) {
      return alert("Please enter the name of a country");
    } else {
      dispatch(getCountryByName(countryName));
      setCountryName("");
    }
  };

  // Realizar la búsqueda en tiempo real
  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(getCountryByName(countryName));
    }, 500);

    return () => clearTimeout(timerId); // Limpiar el timer en cada cambio del input
  }, [dispatch, countryName]);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="search"
          name="search"
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
          placeholder="Search Country..."
        />
        <button type="submit" onClick={handleSubmit}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
