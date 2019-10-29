const express = require('express');
const connection = require('./db');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const port = process.env.PORT || 5000;

//app.use(routes);
app.get('/',(req,res)=>res.send({message:'hello express is working'}));
app.listen(port, () => console.log(`The app is listening on port ${port}`));
