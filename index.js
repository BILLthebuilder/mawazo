const express = require('express');
require('./db');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 5000;

app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.get('/', (req, res) => res.send({ message: 'hello express is working' }));
app.listen(port, () => console.log(`The app is listening on port ${port}`));
