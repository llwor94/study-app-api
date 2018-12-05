const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../db/dbConfig');

const SALT_ROUNDS = 8;

function generateToken(payload) {
	return jwt.sign(payload, process.env.SECRET || 'secret', {
		expiresIn: '3h',
	});
}

router.post('/register', (req, res, next) => {
	let { username, password, email } = req.body;
	if (!username || !password || !email) return next({ code: 400 });
	password = bcrypt.hashSync(password, SALT_ROUNDS);
	return db('users')
		.insert({ username, password, email })
		.then(ids => {
			let id = ids[0];
			let token = generateToken({ id });
			res.json({ id, token, username });
		})
		.catch(next);
});

router.post('/login', (req, res, next) => {
	let { email, password } = req.body;
	if (!email || !password) return next({ code: 404 });
	return db('users')
		.where({ email })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken({ id: user.id });
				res.json({ id: user.id, token, username: user.username });
			} else next({ code: 400 });
		})
		.catch(next);
});

module.exports = router;
