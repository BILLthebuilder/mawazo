const mongoose = require('mongoose');
require('dotenv').config();

const connection = mongoose
    .connect(
        `${process.env.HOST}${encodeURIComponent(process.env.PASSWORD)}${
            process.env.CLUSTER_NAME
        }-mlgkq.mongodb.net/test?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }
    )
    .then(() => {
        console.log('connected to the database');
    })
    .catch(err => {
        console.log('failed to connect to the database', err);
    });

module.exports = connection;
