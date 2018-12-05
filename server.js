const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const configureRoutes = require('./config');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

configureRoutes(app);

module.exports = app;
