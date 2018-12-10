const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const configureRoutes = require('./config');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.get('/api/', (req, res) => {
	res.sendFile(path.join(__dirname + '/doc.html'));
});

configureRoutes(app);

module.exports = app;
