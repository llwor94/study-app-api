const express = require('express');
const router = express.Router();
const db = require('../../db/dbConfig');

router.get('/', (req, res, next) => {
	db('quizzes')
		.then(data => {
			res.json(data);
		})
		.catch(next);
});

module.exports = router;
