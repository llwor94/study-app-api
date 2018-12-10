const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../../db/dbConfig');
const { invalidLogin, invalidRegister } = require('../schema');

const router = express.Router();
const SALT_ROUNDS = 8;

function generateToken(payload) {
	return jwt.sign(payload, process.env.SECRET || 'secret', {
		expiresIn: '1y',
	});
}

router.post('/register', ({ body }, res, next) => {
	if (invalidRegister(body)) return next({ code: 400 });

	body.password = bcrypt.hashSync(body.password, SALT_ROUNDS);
	db('users')
		.insert(body)
		.then(([ id ]) => {
			let token = generateToken({ id });
			return res.status(200).json({ token });
		})
		.catch(next);
});

router.post('/login', ({ body }, res, next) => {
	if (invalidLogin(body)) return next({ code: 400 });

	db('users')
		.where({ email: body.email })
		.first()
		.then(response => {
			if (!response) return next({ code: 404 });
			if (!bcrypt.compareSync(body.password, response.password)) return next({ code: 400 });

			const token = generateToken({ id: response.id });
			return res.status(200).json({ token });
		})
		.catch(next);
});

module.exports = router;
