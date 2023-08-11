const { createActivity, getAllActivity } = require('../controllers/activitiesController');

const getActivitiesHandler = async (req, res) => {
    //PD: ESTA RUTA TRAE TODAS LAS ACTIVIDADES TURISTICA
    try {
        const activityAll = await getAllActivity();
        res.status(200).json(activityAll);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const createActivitiesHandler = async (req, res) => {
    //PD: ESTA RUTA CREA UNA ACTIVIDAD TURISTICA
    const { name, difficulty, duration, season, countries } = req.body;
    try {
        const newActivity = await createActivity( name, difficulty, duration, season, countries);
        res.status(201).json(newActivity);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}



module.exports = { createActivitiesHandler, getActivitiesHandler };