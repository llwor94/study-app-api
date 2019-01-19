const express = require('express');
const router = express.Router();

const commentRouter = require('./commentRouter');
const helpers = require('../../../db/helpers/postHelpers');
const { invalidPost } = require('../../schema');

router.param('postId', (req, res, next, id) => {
	helpers
		.getPost(id)
		.then(post => {
			if (!post) return next({ code: 404 });
			if (post.author.id === req.user.id) req.user.authorized = true;
			req.post = post;
			next();
		})
		.catch(next);
});

router.get('/', (req, res, next) => {
	helpers
		.getPosts()
		.then(response => {
			res.status(200).json(response);
		})
		.catch(next);
});

router.get('/:postId', ({ post }, res, next) => {
	res.status(200).json(post);
});

router.post('/', ({ body, user }, res, next) => {
	if (invalidPost(body)) return next({ code: 400 });
	if (!user.id) return next({ code: 401 });
	body.author = user.id;
	console.log(body);
	helpers
		.createPost(body)
		.then(response => {
			if (!response) return next({ code: 400 });
			res.status(200).json(response);
		})
		.catch(next);
});

router.patch('/:postId', ({ post, body, user }, res, next) => {
	if (!user.authorized) return next({ code: 401 });
	if (invalidPost(body, true)) return next({ code: 400 });
	helpers
		.updatePost(body, post.id)
		.then(response => {
			if (!response) return next({ code: 400 });
			res.status(200).json(response);
		})
		.catch(next);
});

router.delete('/:postId', ({ post, user }, res, next) => {
	if (!user.authorized) return next({ code: 401 });
	helpers
		.deletePost(post.id)
		.then(response => {
			if (!response) return next({ code: 400 });
			res.status(200).json(response);
		})
		.catch(next);
});

router.use('/:postId/comments', commentRouter);

module.exports = router;
