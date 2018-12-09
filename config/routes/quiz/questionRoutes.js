const express = require('express');
const router = express.Router({ mergeParams: true });
const { protected, optionalProtected } = require('../../middleware');
const { invalidQuestion } = require('../../schema');
const {
	createQuestion,
	getQuestions,
	getQuestion,
	updateQuestion,
} = require('../../../db/helpers/questionHelpers');

router.param('questionId', (req, res, next, id) => {
	console.log(req.quiz, req.user, id);
	getQuestion(id)
		.then(response => {
			req.question = response;
			next();
		})
		.catch(next);
});

router.get('/', ({ quiz }, res, next) => {
	getQuestions(quiz.id)
		.then(response => {
			res.json(response);
		})
		.catch(next);
});

router.get('/:questionId', ({ question }, res, next) => {
	res.json(question);
});

router.post('/', ({ quiz, body, user }, res, next) => {
	if (invalidQuestion(body)) return next({ code: 400 });

	if (!user.authorized) return next({ code: 401 });
	let question = { ...body, author: user.id, quiz_id: quiz.id };
	createQuestion(question)
		.then(response => {
			if (!response) return next({ code: 404 });
			res.json(response);
		})
		.catch(next);
});

router.patch('/:questionId', ({ question, body, user }, res, next) => {
	if (!user.authorized) return next({ code: 401 });
	if (invalidQuestion(body, true)) return next({ code: 400 });
	updateQuestion(body, question.id).then(response => {
		if (!response) return next({ code: 404 });
		res.json(response);
	});
});

module.exports = router;
