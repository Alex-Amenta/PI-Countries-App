const { Activity, Country } = require('../db.js');

const getAllActivity = async () => await Activity.findAll({
    include: {
        model: Country,
        attributes: ['id'],
        through: { attributes: [] }
    }
});

const createActivity = async (name, difficulty, duration, season, countries) => {
    // Verificar si ya existe una actividad con el mismo nombre y atributos
    const existingActivity = await Activity.findOne({
        where: {
            name,
        },
    });

    if (existingActivity) {
        // Si ya existe una actividad con los mismos atributos, no se crea una nueva
        throw new Error("Activity with the same name and attributes already exists");
    }

    // Si no existe una actividad duplicada, se crea la nueva actividad
    const newActivity = await Activity.create({
        name,
        difficulty,
        duration,
        season,
        countries
    });

    if (countries && countries.length > 0) {
        const countryNames = countries.map((country) => country.toUpperCase());

        const countryFind = await Country.findAll({
            where: {
                id: countryNames,
            },
        });

        if (countryFind) {
            // Relacionar la actividad con los países encontrados en la base de datos
            await newActivity.addCountries(countryFind);
        }
    }

    return newActivity;

}

module.exports = { createActivity, getAllActivity };