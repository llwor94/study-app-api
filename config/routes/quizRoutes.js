const express = require('express');
const router = express.Router();
const { getQuizzes, getQuiz } = require('../../db/helpers/quizhelpers');

router.get('/', ({ query }, res, next) => {
	console.log(query.topic);
	getQuizzes(query.topic)
		.then(data => {
			res.json({ error: false, data });
		})
		.catch(next);
});

router.get('/:id', ({ params }, res, next) => {
	console.log(params.id);
	getQuiz(params.id)
		.then(data => {
			if (!data) return next({ code: 404 });
			res.json({ error: false, data });
		})
		.catch(next);
});

module.exports = router;
