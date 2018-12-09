const express = require('express');
const router = express.Router();
const questionRouter = require('./questionRoutes');
const { invalidQuiz } = require('../../schema');
const helpers = require('../../../db/helpers/quizHelpers');

router.param('quizId', (req, res, next, id) => {
	console.log('this is the quiz route', id, req.user);
	helpers
		.getQuiz(id)
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
	helpers
		.getQuizzes(query.topic)
		.then(response => {
			console.log('response', response);
			res.json(response);
		})
		.catch(next);
});

router.get('/topics', (req, res, next) => {
	helpers
		.getTopics()
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
	helpers
		.updateQuiz(body, quiz.id)
		.then(quiz => {
			if (!quiz) return next({ code: 404 });
			res.json(quiz);
		})
		.catch(next);
});

router.post('/', ({ body, user }, res, next) => {
	if (invalidQuiz(body)) return next({ code: 400 });
	body.author = user.id;
	helpers
		.createQuiz(body)
		.then(quiz => {
			console.log(quiz);
			if (!quiz) return next({ code: 404 });
			res.json(quiz);
		})
		.catch(next);
});

router.delete('/:quizId', ({ quiz, body, user }, res, next) => {
	if (!user.authorized) return next({ code: 401 });
});

router.use('/:quizId/questions', questionRouter);

module.exports = router;
