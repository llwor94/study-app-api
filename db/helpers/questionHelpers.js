const db = require('../dbConfig');
const _ = require('lodash');

module.exports = {
	createQuestion: question => {
		return db('questions').returning('id').insert(question);
	},
	async getQuestions(quiz_id) {
		let questions = await db('questions')
			.where({ quiz_id })
			.select('question', 'option1', 'option2', 'option3', 'option4', 'quiz_id as quiz');

		return questions.map(question => {
			question.options = _.compact([
				question.option1,
				question.option2,
				question.option3,
				question.option4,
			]);
			return _.pick(question, [ 'question', 'options', 'quiz' ]);
		});
	},
	async getQuestion(id) {
		let question = await db('questions').where({ id }).select('question', 'quiz_id').first();
		let options = await db('questions')
			.where({ id })
			.select('option1', 'option2', 'option3', 'option4')
			.first();

		question.options = _.compact(Object.values(options));
		return question;
	},
	updateQuestion: (
		{
			question = undefined,
			option1 = undefined,
			option2 = undefined,
			option3 = undefined,
			option4 = undefined,
			answer = undefined,
		},
		id,
	) => {
		return db('questions')
			.where({ id })
			.update({ question, option1, option2, option3, option4, answer });
	},
	deleteQuestion: id => {
		return db('questions').where({ id }).del();
	},
};
