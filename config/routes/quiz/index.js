const express = require('express');
const router = express.Router();
const questionRouter = require('./questionRoutes');
const { invalidQuiz } = require('../../schema');
const {
	getQuizzes,
	getQuiz,
	getTopics,
	createQuiz,
	updateQuiz,
} = require('../../../db/helpers/quizHelpers');

router.use('/:quizId/questions', questionRouter);

router.param('quizId', (req, res, next, id) => {
	console.log('this is the quiz route', id, req.user);
	getQuiz(id)
		.then(quiz => {
			if (!quiz) return next({ code: 404 });
			if (quiz.author.id === req.user.id) req.user.authorized = true;
			req.quiz = quiz;
			next();
		})
		.catch(next);
});

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

router.get('/:quizId', ({ quiz }, res, next) => {
	console.log('quizzes/:id', quiz);
	res.json(quiz);
});

router.patch('/:quizId', ({ quiz, body, user }, res, next) => {
	if (!user.authorized) return next({ code: 401 });
	if (invalidQuiz(body, true)) return next({ code: 400 });
	updateQuiz(body, quiz.id)
		.then(quiz => {
			if (!quiz) return next({ code: 404 });
			res.json(quiz);
		})
		.catch(next);
});

router.post('/', ({ body, user }, res, next) => {
	if (invalidQuiz(body)) return next({ code: 400 });
	body.author = user.id;
	createQuiz(body)
		.then(quiz => {
			if (!quiz) return next({ code: 404 });
			res.json(quiz);
		})
		.catch(next);
});

router.delete('/:quizId', ({ quiz, body, user }, res, next) => {
	if (!user.authorized) return next({ code: 401 });
});

module.exports = router;
