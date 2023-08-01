import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, postActivity } from "../../redux/actions";
import validations from "./validations";

const Form = () => {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const [newActivity, setnewActivity] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  const [error, setError] = useState({});

  const handleInputChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    const validationErrors = validations({
      ...newActivity,
      [property]: value,
    });

    setError(validationErrors);

    setnewActivity({
      ...newActivity,
      [property]: value,
    });
  };

  const handleCountrySelect = (event) => {
    // El método Array.from() crea una nueva instancia de Array a partir de un objeto iterable.
    const selectedCountry = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );

    setnewActivity({
      ...newActivity,
      countries: selectedCountry,
    });
  };

  // Función de comparación para ordenar alfabéticamente los países
  const compareCountries = (a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  };

  const disabled =
    newActivity.name === "" ||
    newActivity.difficulty === "" ||
    newActivity.duration === "" ||
    newActivity.season === "" ||
    newActivity.countries.length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Enviar los datos al servidor
    dispatch(postActivity(newActivity));

    // Limpiar el formulario después de enviar los datos
    setnewActivity({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });

    alert("Turistic activity created successfully!");
  };

  return (
    <div className={styles.container}>
      <h1>Create new Activity</h1>
      <form className={styles.glassefect} onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={newActivity.name}
          name="name"
          onChange={handleInputChange}
        />
        {error.name && <p>{error.name}</p>}

        <label>Difficulty:</label>
        <select
          name="difficulty"
          value={newActivity.difficulty}
          onChange={handleInputChange}
        >
          <option value="">Select difficulty...</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        {error.difficulty && <p>{error.difficulty}</p>}

        <label>Duration:</label>
        <input
          type="text"
          value={newActivity.duration}
          name="duration"
          onChange={handleInputChange}
        />
        {error.duration && <p>{error.duration}</p>}

        <label>Season:</label>
        <select
          name="season"
          value={newActivity.season}
          onChange={handleInputChange}
        >
          <option value="">Select season...</option>
          <option value="Summer">Summer</option>
          <option value="Autumn">Autumn</option>
          <option value="Winter">Winter</option>
          <option value="Spring">Spring</option>
        </select>
        {error.season && <p>{error.season}</p>}

        <label>Add country:</label>
        <select
          value={newActivity.countries}
          name="countries"
          onChange={handleCountrySelect}
        >
          <option value="">Select countries...</option>
          {allCountries.sort(compareCountries).map((country) => (
            <option key={country.id} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        {error.countries && <p>{error.countries}</p>}

        <button type="submit" disabled={disabled}>
          Create
        </button>
      </form>
    </div>
  );
};

export default Form;
