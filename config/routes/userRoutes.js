const express = require('express');
const router = express.Router();
const db = require('../../db/dbConfig');

router.get('/', (req, res, next) => {
	db('users').then(users => res.status(200).json(users)).catch(next);
});

module.exports = router;
