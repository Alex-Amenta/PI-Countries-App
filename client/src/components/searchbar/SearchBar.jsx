import { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCountryByName } from "../../redux/actions";
import Swal from "sweetalert2";
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  const [countryName, setCountryName] = useState("");
  const [notfound, setNotFound] = useState(false);
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!countryName.length) {
      Swal.fire({
        icon: "info",
        text: "Please enter the name of a country",
      });
    } else {
      // Buscar el país por nombre en la lista de países almacenada en countries
      const foundCountry = countries.find((country) =>
        country.name.toLowerCase().includes(countryName.toLowerCase())
      );

      if (foundCountry) {
        dispatch(getCountryByName(countryName));
        setNotFound(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `"${countryName}" not found, please try again`,
        });
        setNotFound(true);
      }
      setCountryName("");
    }
  };

  const handleInputChange = (e) => {
    setCountryName(e.target.value);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="search"
            name="search"
            value={countryName}
            onChange={handleInputChange}
            placeholder="Search Country..."
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className={styles.button}
          >
            <SearchIcon/>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

// // Realizar la búsqueda en tiempo real
// useEffect(() => {
//   const timerId = setTimeout(() => {
//     dispatch(getCountryByName(countryName));
//   }, 500);

//   return () => clearTimeout(timerId); // Limpiar el timer en cada cambio del input
// }, [dispatch, countryName]);
