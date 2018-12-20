const express = require('express');
const router = express.Router();
const db = require('../../db/dbConfig');

router.get('/', ({ query }, res, next) => {
	if (query.username) {
		db('users')
			.where({ username: query.username })
			.select('email', 'username', 'id', 'img_url')
			.first()
			.then(user => res.status(200).json(user))
			.catch(next);
	} else {
		db('users')
			.select('email', 'username', 'id', 'img_url')
			.then(users => res.status(200).json(users))
			.catch(next);
	}
});

module.exports = router;
