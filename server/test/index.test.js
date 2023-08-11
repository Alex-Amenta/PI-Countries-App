const { getAllActivity } = require('../src/controllers/activitiesController');
const server = require('../src/server');
const session = require('supertest');
const agent = session(server);

describe('Routes Test', () => {
    describe('GET /countries', () => {
        it('should respond with status 200', async () => {
            await agent.get('/countries').expect(200);
        });

        it('should respond with an array of countries', async () => {
            const response = await agent.get('/countries');
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('GET /countries/:id', () => {
        it('should respond with status 200', async () => {
            await agent.get('/countries/ARG').expect(200);
        });

        it('should respond with an object of the country', async () => {
            const response = await agent.get('/countries/ARG');
            expect(typeof response.body).toBe('object');
        });

        it('should respond with status 404 if the ID does not exist', async () => {
            await agent.get('/countries/ZZZ').expect(404);
        });
    });

    describe('GET /activities', () => {
        it('should respond with status 200', async () => {
            await agent.get('/activities').expect(200);
        });

        it('should respond with an array of activities', async () => {
            const response = await agent.get('/activities');
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('POST /activities', () => {
        const newActivity = {
            name: 'Activity',
            difficulty: 3,
            duration: '1 hour',
            season: 'Summer',
            countries: ['ARG', 'USA']
        };

        it('should respond with status 201 after creating a new activity', async () => {
            await agent.post('/activities').send(newActivity).expect(201);
        });

        // Agregamos una función para limpiar la base de datos después de los tests
        afterAll(async () => {
            // Eliminamos todas las actividades creadas durante los tests
            await getAllActivity().then((activities) => {
                activities.forEach(async (activity) => {
                    await activity.destroy();
                });
            });
        });
    });
});
