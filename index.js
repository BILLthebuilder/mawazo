const express = require('express');
const routes = require('./routes/user');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 5000;

app.use(routes);
app.listen(port, () => console.log(`The app is listening on port ${port}`));
