const { Router } = require('express');

const routes = Router();

routes.get('/', (req, res) => res.send({ user: 'hello express' }));

module.exports = routes;
