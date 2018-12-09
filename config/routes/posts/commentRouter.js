const express = require('express');
const router = express.Router({ mergeParams: true });

const helpers = require('../../../db/helpers/commentHelpers');

router.param('commentId', (req, res, next, id) => {
	console.log('this is the quiz route', id, req.user);
	helpers
		.getComment(id)
		.then(comment => {
			console.log(comment);
			if (!comment) return next({ code: 404 });
			if (comment.author.id === req.user.id) req.user.authorized = true;
			req.comment = comment;
			next();
		})
		.catch(next);
});

router.get('/', ({ post }, res, next) => {
	helpers
		.getComments(post.id)
		.then(response => {
			console.log(response);
			res.status(200).json(response);
		})
		.catch(next);
});

router.get('/:commentId', ({ comment }, res, next) => {
	res.status(200).json(comment);
});

router.post('/', ({ post, user, body }, res, next) => {
	if (!body.text) return next({ code: 400 });
	if (!user.id) return next({ code: 401 });
	body.author = user.id;
	helpers
		.createComment(body, post.id)
		.then(response => {
			console.log(response);
			if (!response) return next({ code: 404 });
			res.status(200).json(response);
		})
		.catch(next);
});

router.patch('/:commentId', ({ comment, user, body }, res, next) => {
	if (!body.text) return next({ code: 400 });
	if (!user.authorized) return next({ code: 401 });

	helpers
		.editComment(comment.id, body.text)
		.then(response => {
			res.status(200).json(response);
		})
		.catch(next);
});

router.delete('/:commentId', ({ comment, user }, res, next) => {
	if (!user.authorized) return next({ code: 401 });

	helpers
		.deleteComment(comment.id)
		.then(response => {
			res.status(200).json(response);
		})
		.catch(next);
});

module.exports = router;
