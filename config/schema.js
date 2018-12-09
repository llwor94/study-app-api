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
	votes: Joi.number().integer(),
};

const updateQuizSchema = Joi.object()
	.keys({
		title: Joi.string().alphanum(),
		time_limit_seconds: Joi.number().integer(),
		topic: Joi.string().alphanum().max(20),
	})
	.or('title', 'time_limit_seconds', 'topic');

const questionSchema = {
	question: Joi.string().required(),
	option1: Joi.string().required(),
	option2: Joi.string().required(),
	option3: Joi.string(),
	option4: Joi.string(),
	answer: Joi.number().integer().required().min(1).max(4),
};

const updateQuestionSchema = Joi.object()
	.keys({
		question: Joi.string(),
		option1: Joi.string(),
		option2: Joi.string(),
		option3: Joi.string(),
		option4: Joi.string(),
		answer: Joi.number().integer().min(1).max(4),
	})
	.or('question', 'option1', 'option2', 'option3', 'option4', 'answer');

module.exports = {
	invalidRegister(user) {
		const { error } = Joi.validate(user, registerUserSchema);
		return error;
	},
	invalidLogin(user) {
		const { error } = Joi.validate(user, loginUserSchema);
		return error;
	},
	invalidQuiz(quiz, update) {
		if (update) {
			const { error } = Joi.validate(quiz, updateQuizSchema);
			return error;
		}
		const { error } = Joi.validate(quiz, quizSchema);
		return error;
	},
	invalidQuestion(question, update) {
		if (update) {
			const { error } = Joi.validate(quiz, updateQuestionSchema);
			return error;
		}
		const { error } = Joi.validate(question, questionSchema);
		return error;
	},
};
