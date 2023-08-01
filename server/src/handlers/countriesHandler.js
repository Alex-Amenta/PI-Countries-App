const { getCountryById, getAllCountries, searchCountryName } = require('../controllers/countriesController');

const getCountriesHandler = async (req, res) => {
    //PD: ESTA RUTA TRAE A TODOS LOS PAISES CON SU INFO
    const { name } = req.query;

    try {
        if (!name) {
            const countries = await getAllCountries();
            res.status(200).json(countries);
        } else {
            const countryName = await searchCountryName(name);

            if (countryName.length !== 0) {
                res.status(200).json(countryName);
            }
        }
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
};


const getCountriesIdHandler = async (req, res) => {
    // PD: ESTA RUTA OBTIENE EL DETALLE DE UN PAIS ESPECIFICO
    const { id } = req.params;
    try {
        const country = await getCountryById(id);

        !country
            ? res.status(404).json({ msg: 'Pais no encontrado' })
            : res.status(200).json(country);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getCountriesHandler,
    getCountriesIdHandler
}