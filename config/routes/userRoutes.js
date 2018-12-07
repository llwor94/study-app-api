const express = require('express');
const router = express.Router();
const db = require('../../db/dbConfig');

router.get('/', (req, res, next) => {
	db('users').then(data => res.send({ error: false, data }));
});

module.exports = router;
