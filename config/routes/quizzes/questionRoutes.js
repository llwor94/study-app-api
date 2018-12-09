const express = require('express');
const router = express.Router({ mergeParams: true });
const _ = require('lodash');
const { invalidQuestion } = require('../../schema');
const helpers = require('../../../db/helpers/questionHelpers');

router.param('questionId', (req, res, next, id) => {
	helpers
		.getQuestion(id)
		.then(response => {
			req.question = response;
			next();
		})
		.catch(next);
});

router.get('/', ({ quiz }, res, next) => {
	helpers
		.getQuestions(quiz.id)
		.then(response => {
			res.status(200).json(response);
		})
		.catch(next);
});

router.get('/:questionId', ({ question }, res, next) => {
	res.status(200).json(_.pick(question, [ 'question', 'options', 'quiz_id' ]));
});

router.post('/', ({ quiz, body, user }, res, next) => {
	if (invalidQuestion(body)) return next({ code: 400 });

	if (!user.authorized) return next({ code: 401 });
	let question = { ...body, author: user.id, quiz_id: quiz.id };
	helpers
		.createQuestion(question)
		.then(response => {
			if (!response) return next({ code: 404 });
			res.status(200).json(response);
		})
		.catch(next);
});

router.patch('/:questionId', ({ question, body, user }, res, next) => {
	if (!user.authorized) return next({ code: 401 });
	if (invalidQuestion(body, true)) return next({ code: 400 });
	helpers
		.updateQuestion(body, question.id)
		.then(response => {
			if (!response) return next({ code: 404 });
			res.status(200).json(response);
		})
		.catch(next);
});

router.patch('/:questionId/play', ({ question, body, user }, res, next) => {
	if (!body.option) return next({ code: 400 });
	let correct = body.option === question.answer;
	if (!user.id) {
		if (correct) return res.status(200).json({ question: question.id, correct });
		return res.status(200).json({ question: question.id, correct });
	}
});

router.delete('/:questionId', ({ question, user }, res, next) => {
	if (!user.authorized) return next({ code: 401 });
	helpers
		.deleteQuestion(question.id)
		.then(response => {
			if (!response) return next({ code: 404 });
			res.status(200).json(response);
		})
		.catch(next);
});

module.exports = router;
