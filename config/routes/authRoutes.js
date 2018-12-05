const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 8;

function generateToken(payload) {
	return jwt.sign(payload, process.env.SECRET || 'secret', {
		expiresIn: '3h',
	});
}
