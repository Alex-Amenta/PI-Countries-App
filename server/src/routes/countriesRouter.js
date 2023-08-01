const { Router } = require('express');
const { getCountriesHandler, getCountriesIdHandler } = require('../handlers/countriesHandler');

countriesRouter = Router();

countriesRouter.get('/', getCountriesHandler);

countriesRouter.get('/:id', getCountriesIdHandler);

module.exports = countriesRouter;