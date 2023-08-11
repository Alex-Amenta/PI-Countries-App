const { Router } = require('express');
const { createActivitiesHandler, getActivitiesHandler } = require('../handlers/activitiesHandler');

const activitiesRouter = Router();

activitiesRouter.post('/', createActivitiesHandler);

activitiesRouter.get('/', getActivitiesHandler);

module.exports = activitiesRouter;