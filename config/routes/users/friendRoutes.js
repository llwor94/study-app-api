const express = require('express');
const router = express.Router({ mergeParams: true });
const helpers = require('../../../db/helpers/friendHelpers');

router.use((req, res, next) => {
	if (req.user.id) {
		console.log(req.user);
		next();
	} else {
		return next({ code: 404 });
	}
});

router.param('friendId', (req, res, next, id) => {
	helpers
		.checkFriendship(req.user.id, id)
		.then(response => {
			if (response) req.friendshipExists = true;
			next();
		})
		.catch(next);
});

router.get('/', (req, res, next) => {
	helpers
		.getFriends(req.user.id)
		.then(friends => {
			console.log(friends);
			res.status(200).json(friends);
		})
		.catch(next);
});

router.put('/:friendId', (req, res, next) => {
	console.log(req.user.id, req.params.friendId, req.friendshipExists);
	if (req.friendshipExists) return next({ code: 400 });
	helpers
		.createFriendship(req.user.id, req.params.friendId)
		.then(response => {
			console.log(response);
		})
		.catch(next);
});

module.exports = router;
