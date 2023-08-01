import {
    GET_COUNTRIES,
    GET_COUNTRY_ID,
    GET_COUNTRY_NAME,
    GET_ACTIVITIES,
    POST_ACTIVITY,
    FILTER_BY_CONTINENT,
    FILTER_BY_ACTIVITY,
    ALPHABETIC_ORDER,
    POBLATION_ORDER
} from "./types"

const initialState = {
    allCountries: [],
    allActivities: [],
    countries: [],
    country: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                allCountries: action.payload,
                countries: action.payload
            }

        case GET_COUNTRY_ID:
            return {
                ...state,
                country: action.payload
            }

        case GET_COUNTRY_NAME:
            return {
                ...state,
                countries: action.payload,
                country: action.payload
            }

        case GET_ACTIVITIES:
            return {
                ...state,
                allActivities: action.payload
            }

        case POST_ACTIVITY:
            return {
                ...state,
                allActivities: [...state.allActivities, action.payload]
            }

        case FILTER_BY_CONTINENT:
            const { continent } = action.payload;
            // Obtener la lista completa de países desde el estado
            const allCountries = state.allCountries;
            if (continent === "All Continents") {
                // Si se selecciona "Todos los Continentes", mostrar todos los países sin filtrar
                return { ...state, countries: allCountries };
            } else {
                const filteredContinent = allCountries.filter((country) => country.continent === continent);
                return { ...state, countries: filteredContinent };
            }

        case FILTER_BY_ACTIVITY:
            const { activity } = action.payload;
            const filteredActivity = state.allCountries.filter(
                (country) => country.activities && country.activities.some((act) => act.name === activity));

            return { ...state, countries: filteredActivity }


        case ALPHABETIC_ORDER:
            // Verificamos si el usuario seleccionó ordenar de A a Z (ascendente) o de Z a A (descendente)
            const order = action.payload === "from A to Z" ? 1 : -1;

            // Realizamos una copia del array original de países utilizando el operador spread [...state.countries]
            // Esto garantiza que no modificamos el estado original directamente y trabajamos sobre una copia
            const alphaOrder = [...state.countries].sort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();

                if (nameA < nameB) {
                    return -1 * order;
                    // Si a viene antes que b, devolvemos -1 para que a se ubique antes que b (orden ascendente) o después que b (orden descendente)
                }
                if (nameA > nameB) {
                    return 1 * order;
                    // Si a viene después que b, devolvemos 1 para que a se ubique después de b (orden ascendente) o antes que b (orden descendente)
                }
                return 0; // Si los nombres son iguales, no se cambia el orden
            });

            return {
                ...state,
                countries: alphaOrder,
            };

        case POBLATION_ORDER:
            // Verifica si el orden debe ser ascendente ('asc') o descendente ('desc')
            const populationOrder = action.payload === 'asc' ?
                [...state.countries].sort((a, b) => a.population - b.population)
                :
                [...state.countries].sort((a, b) => b.population - a.population)

            return {
                ...state,
                countries: populationOrder
            }

        default:
            return { ...state }
    }
}

export default rootReducer;