const express = require('express');
const router = express.Router();
const friendRouter = require('./friendRoutes');
const helpers = require('../../../db/helpers/userHelpers');

router.get('/', ({ query }, res, next) => {
	if (query.username || query.email) {
		helpers
			.getUser(query)
			.then(user => {
				console.log(user);
				res.status(200).json(user);
			})
			.catch(next);
	} else {
		console.log('here');
		helpers
			.getUsers()
			.then(users => {
				console.log(users);
				res.status(200).json(users);
			})
			.catch(next);
	}
});

router.get('/:id', (req, res, next) => {
	helpers.getUserById(req.params.id).then(user => res.status(200).json(user)).catch(next);
});

router.use('/friends', friendRouter);

module.exports = router;
