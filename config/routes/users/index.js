const express = require('express');
const router = express.Router();
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
		helpers
			.getUsers()
			.then(users => {
				console.log(users);
				res.status.json(users);
			})
			.catch(next);
	}
});

module.exports = router;
