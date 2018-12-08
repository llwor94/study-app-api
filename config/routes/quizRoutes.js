const express = require('express');
const router = express.Router();
const { protected } = require('../middleware');
const { invalidQuiz, invalidQuestion } = require('../schema');
const {
	getQuizzes,
	getQuiz,
	getTopics,
	createQuiz,
	createQuestion,
	updateQuiz,
} = require('../../db/helpers/quizhelpers');

router.get('/', ({ query }, res, next) => {
	console.log('quizzes/', query.topic);
	getQuizzes(query.topic)
		.then(quizzes => {
			res.json(quizzes);
		})
		.catch(next);
});

router.get('/topics', ({ query }, res, next) => {
	console.log('query', query.name);
	getTopics(query.name)
		.then(topics => {
			res.json(topics);
		})
		.catch(next);
});

router.get('/:id', ({ params }, res, next) => {
	console.log('quizzes/:id', params.id);
	getQuiz(params.id)
		.then(quiz => {
			if (!quiz) return next({ code: 404 });
			res.json(quiz);
		})
		.catch(next);
});

router.put('/:id/questions', protected, ({ params, body, user }, res, next) => {
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

router.patch('/:id/edit', protected, ({ params, body, user }, res, next) => {
	getQuiz(params.id)
		.then(quiz => {
			if (!quiz) return next({ code: 404 });
			if (quiz.author !== user) return next({ code: 401 });
			if (body.votes || (!body.title && !body.topic)) return next({ code: 400 });
			updateQuiz(body, params.id)
				.then(quiz => {
					if (!quiz) return next({ code: 404 });
					res.json(quiz);
				})
				.catch(next);
		})
		.catch(next);
});

router.post('/', protected, ({ body, user }, res, next) => {
	if (invalidQuiz(body)) return next({ code: 400 });
	body.author = user;
	createQuiz(body)
		.then(quiz => {
			if (!quiz) return next({ code: 404 });
			res.json(quiz);
		})
		.catch(next);
});
module.exports = router;
