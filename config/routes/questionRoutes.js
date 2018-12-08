const express = require('express');
const router = express.Router();
const { invalidQuestion } = require('../../schema');
const { protected } = require('../middleware');

router.post('/', protected, ({ params, body, user }, res, next) => {
	if (invalidQuestion(body)) return next({ code: 400 });
	getQuiz(params.id)
		.then(quiz => {
			if (!quiz) return next({ code: 404 });
			if (quiz.author !== user) return next({ code: 401 });
			question = { ...body, author: user, quiz_id: params.id };
			createQuestion(question)
				.then(question => {
					if (!question) return next({ code: 404 });
					res.json(question);
				})
				.catch(next);
		})
		.catch(next);
});

module.exports = router;
