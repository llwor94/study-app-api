const express = require('express');
const router = express.Router({ mergeParams: true });
const helpers = require('../../../db/helpers/friendHelpers');

router.use((req, res, next) => {
	if (req.user.id) {
		console.log(req.user);
		next();
	} else {
		return next({ code: 401 });
	}
});

router.param('friendId', async (req, res, next, id) => {
	let friend = await helpers.checkUser(id);
	if (!friend) return next({ code: 400 });
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
			res.status(200).json({ message: 'Request Successful' });
		})
		.catch(next);
});

module.exports = router;
