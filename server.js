const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const configureRoutes = require('./config');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('public'));
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/public/documentation.html'));
});

configureRoutes(app);

module.exports = app;
