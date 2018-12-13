const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const showdown = require('showdown');
const md = fs.readFileSync('./README.md', 'utf8');
const converter = new showdown.Converter({ tables: true });
const text = md;
const html = converter.makeHtml(text);

const configureRoutes = require('./config');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/public/documentation.html'));
});
app.get('/api', (req, res) => {
	res.send(html);
});

configureRoutes(app);

module.exports = app;
