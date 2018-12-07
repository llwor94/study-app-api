const Joi = require('joi');

const registerUserSchema = {
	username: Joi.string().alphanum().min(4).max(10).required(),
	password: Joi.string().required(),
	email: Joi.string().required(),
	img_url: Joi.string(),
};

const loginUserSchema = {
	email: Joi.string().required(),
	password: Joi.string().required(),
};

const quizSchema = {
	title: Joi.string().alphanum().required(),
	time_limit_seconds: Joi.number().integer(),
	topic: Joi.string().alphanum().max(20).required(),
};

module.exports = {
	invalidRegister(user) {
		const { error } = Joi.validate(user, registerUserSchema);
		return error;
	},
	invalidLogin(user) {
		const { error } = Joi.validate(user, loginUserSchema);
		return error;
	},
	invalidQuiz(quiz) {
		const { error } = Joi.validate(quiz, quizSchema);
		return error;
	},
};
