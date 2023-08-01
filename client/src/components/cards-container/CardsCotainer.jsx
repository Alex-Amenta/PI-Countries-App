import { Link } from "react-router-dom";
import Card from "../card/Card";
import styles from "./CardsContainer.module.css";
import { useState } from "react";
import Pagination from "../pagination/Pagination";
// import { useSelector } from "react-redux";

const CardsContainer = ({ countries }) => {
  // const Allcountries = useSelector((state) => state.countries);

  // State para manejar estado actual
  const [currentPage, setCurrentPage] = useState(1);

  const countriesPerPage = 10;

  // Calcular los índices de inicio y fin para los países de la página actual
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <nav>
        <Pagination
          countries={countries.length}
          countriesPerPage={countriesPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </nav>
      <section className={styles.containerCards}>
        {currentCountries.map((country) => {
          return (
            <Link className={styles.link} to={`/detail/${country.id}`}>
              <Card
                key={country.id}
                id={country.id}
                name={country.name}
                flag={country.flag}
                continent={country.continent}
                capital={country.capital}
                population={country.population}
                area={country.area}
              />
            </Link>
          );
        })}
      </section>

      <footer>
        <Pagination
          countries={countries.length}
          countriesPerPage={countriesPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </footer>
    </div>
  );
};

export default CardsContainer;
