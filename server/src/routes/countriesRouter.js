const { Router } = require('express');
const { getCountriesHandler, getCountriesIdHandler } = require('../handlers/countriesHandler');

const countriesRouter = Router();

countriesRouter.get('/', getCountriesHandler);

countriesRouter.get('/:id', getCountriesIdHandler);

module.exports = countriesRouter;