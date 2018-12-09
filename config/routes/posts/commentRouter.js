const express = require('express');
const router = express.Router({ mergeParams: true });

router.param('quizId', (req, res, next, id) => {
	console.log('this is the quiz route', id, req.user);
	helpers
		.getQuiz(id)
		.then(quiz => {
			console.log(quiz);
			if (!quiz) return next({ code: 404 });
			if (quiz.author.id === req.user.id) req.user.authorized = true;
			req.quiz = quiz;
			next();
		})
		.catch(next);
});

module.exports = router;
