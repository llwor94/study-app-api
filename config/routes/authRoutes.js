require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../../db/dbConfig');
const { invalidLogin, invalidRegister } = require('../schema');

const router = express.Router();

function generateToken(payload) {
	return jwt.sign(payload, 'secret', {
		expiresIn: '1y',
	});
}

router.post('/register', ({ body }, res, next) => {
	if (invalidRegister(body)) return next({ code: 400 });

	body.password = bcrypt.hashSync(body.password, 8);
	db('users')
		.insert(body)
		.returning('id')
		.then(([ id ]) => {
			let token = generateToken({ id });
			return res.status(200).json({ token, user: { id, username: body.username } });
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
			return res.status(200).json({
				token,
				user: {
					id: response.id,
					username: response.username,
					img_url: response.img_url,
				},
			});
		})
		.catch(next);
});

router.patch('/update', async ({ body, user }, res, next) => {
	if (!user.id) return next({ code: 401 });

	let getUser = await db('users').where({ id: user.id }).first();
	if (!bcrypt.compareSync(body.currentPassword, getUser.password)) return next({ code: 401 });

	if (body.newPassword) body.newPassword = bcrypt.hashSync(body.newPassword, 8);

	db('users')
		.update({ username: body.newUsername, password: body.newPassword, img_url: body.newImg })
		.where({ id: user.id })
		.returning('id')
		.then(([ id ]) => {
			if (body.newPassword) {
				let token = generateToken({ id });
				return res.status(200).json({ token, user: { id } });
			} else {
				return res
					.status(200)
					.json({ user: { id, username: body.newUsername, img_url: body.newImg } });
			}
		})
		.catch(next);
});

module.exports = router;
