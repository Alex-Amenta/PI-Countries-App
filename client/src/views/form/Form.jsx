import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import validations from "./validations";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../redux/actions";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = () => {
  // TRAYENDO DATOS CON REDUX
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);
  const navigate = useNavigate();

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
  const [selectedCountries, setSelectedCountries] = useState([]); // estado para los paises seleccionados

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setError(validations({ ...newActivity, [name]: value }));
    setnewActivity({ ...newActivity, [name]: value });
  };

  const handleCountrySelect = (event) => {
    const countrySelect = event.target.value;

    // Verificar si el país ya ha sido seleccionado y si se sobrepasa de 6 paises
    if (selectedCountries.includes(countrySelect)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This country is already selected...",
      });
    }

    if (selectedCountries.length >= 6) {
      return Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Only 6 countries please!",
      });
    }

    // Agregar el país seleccionado a la lista de países seleccionados
    setSelectedCountries([...selectedCountries, countrySelect]);

    setnewActivity({
      ...newActivity,
      countries: [...newActivity.countries, countrySelect],
    });

    setError({ ...error, countries: "" });
  };

  const handleRemoveCountry = (country) => {
    setSelectedCountries(selectedCountries.filter((c) => c !== country));

    setnewActivity({
      ...newActivity,
      countries: newActivity.countries.filter((c) => c !== country),
    });
  };

  const disabled =
    newActivity.name === "" ||
    newActivity.difficulty === "" ||
    newActivity.duration === "" ||
    newActivity.season === "" ||
    newActivity.countries.length === 0;

  const compareCountries = (a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://countries-app-wz2v.onrender.com/activities", newActivity)
      .then((response) => {
        if (!response.data) {
          throw new Error("Failed to create new activity");
        }

        // Si la operacion es exitosa manda los datos y limpia el form
        setnewActivity({
          name: "",
          difficulty: "",
          duration: "",
          season: "",
          countries: [],
        });
        // Limpiar los países seleccionados
        setSelectedCountries([]);
        Swal.fire({
          icon: "success",
          title: "Turistic activity created successfully!",
        });
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to create activity",
        });
        console.log(error.message);
      });
  };

  return (
    <div className={styles.container}>
      <h1>Create new Activity</h1>
      <form className={styles.glassefect} onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          placeholder="Enter name..."
          value={newActivity.name}
          name="name"
          onChange={handleInputChange}
        />
        {error.name && <p className={styles.error_message}>{error.name}</p>}

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
        {error.difficulty && (
          <p className={styles.error_message}>{error.difficulty}</p>
        )}

        <label>Duration:</label>
        <select
          name="duration"
          value={newActivity.duration}
          onChange={handleInputChange}
        >
          <option value="">Select duration...</option>
          <option value="1">1 hour</option>
          <option value="2">2 hour</option>
          <option value="3">3 hour</option>
          <option value="4">4 hour</option>
          <option value="5">5 hour</option>
          <option value="6">6 hour</option>
          <option value="7">7 hour</option>
          <option value="8">8 hour</option>
          <option value="9">9 hour</option>
          <option value="10">10 hour</option>
          <option value="11">11 hour</option>
          <option value="12">12 hour</option>
        </select>
        {error.duration && (
          <p className={styles.error_message}>{error.duration}</p>
        )}

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
        {error.season && <p className={styles.error_message}>{error.season}</p>}

        <label>Add country:</label>
        <select
          value={newActivity.countries}
          name="countries"
          onChange={handleCountrySelect}
        >
          <option value="">Select countries...</option>
          {allCountries.sort(compareCountries).map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
        {error.countries && (
          <p className={styles.error_message}>{error.countries}</p>
        )}

        {/* Lista de países seleccionados */}
        <div className={styles.selectedCountries}>
          {selectedCountries.map((countryId) => {
            const country = allCountries.find((c) => c.id === countryId);
            return (
              <div key={countryId} className={styles.selectedCountry}>
                <div className={styles.button_container}>
                  <button
                    type="button"
                    onClick={() => handleRemoveCountry(countryId)}
                  >
                    X
                  </button>
                </div>
                <img src={country?.flag || ""} alt={country?.name || ""} />
                <h2>{country?.name || ""}</h2>
              </div>
            );
          })}
        </div>
        <button
          type="submit"
          disabled={disabled}
          className={!disabled ? styles.create : styles.button_create}
        >
          <span>Create</span>
        </button>
      </form>
    </div>
  );
};

export default Form;
