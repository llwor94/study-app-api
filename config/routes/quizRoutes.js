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

router.get('/:id', (req, res, next) => {
	db('quizzes as qz').join('questions as q', 'q.quiz', 'qz.id');
});

module.exports = router;
