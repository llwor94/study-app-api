const db = require('../dbConfig');
const _ = require('lodash');

module.exports = {
	createQuestion(question) {
		if (
			(!question.option3 && question.answer === 3) ||
			(!question.option4 && question.answer === 4)
		)
			return;
		return db('questions').returning('id').insert(question);
	},
	async getQuestions(quiz_id) {
		let questions = await db('questions')
			.where({ quiz_id })
			.select('id', 'question', 'option1', 'option2', 'option3', 'option4', 'quiz_id');

		return questions.map(question => {
			question.options = _.compact([
				question.option1,
				question.option2,
				question.option3,
				question.option4,
			]);
			return _.pick(question, [ 'id', 'question', 'options', 'quiz' ]);
		});
	},
	async getQuestion(id) {
		let question = await db('questions')
			.where({ id })
			.select('id', 'question', 'quiz_id', 'answer')
			.first();
		let options = await db('questions')
			.where({ id })
			.select('option1', 'option2', 'option3', 'option4')
			.first();

		question.options = _.compact(Object.values(options));
		return question;
	},
	async updateQuestion(
		{
			question = undefined,
			option1 = undefined,
			option2 = undefined,
			option3 = undefined,
			option4 = undefined,
			answer = undefined,
		},
		id,
	) {
		let currentQuestion = await db('questions').where({ id }).first();
		if (
			(!currentQuestion.option3 &&
				!option3 &&
				(currentQuestion.answer === 3 || answer === 3)) ||
			(!currentQuestion.option4 && !option4 && (currentQuestion.answer === 4 || answer === 4))
		) {
			return null;
		}

		return db('questions')
			.where({ id })
			.returning('id')
			.update({ question, option1, option2, option3, option4, answer });
	},
	deleteQuestion(id) {
		return db('questions').where({ id }).del();
	},
};
