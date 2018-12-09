const db = require('../dbConfig');

module.exports = {
	createQuestion: question => {
		return db('questions').returning('id').insert(question);
	},
	getQuestions: quiz_id => {
		return db('questions')
			.where({ quiz_id })
			.select('question', 'option1', 'option2', 'option3', 'option4', 'quiz_id as quiz');
	},
	getQuestion: id => {
		return db('questions')
			.where({ id })
			.select('question', 'option1', 'option2', 'option3', 'option4', 'quiz_id')
			.first();
	},
	updateQuestion: (
		{
			question = undefined,
			option2 = undefined,
			option3 = undefined,
			option4 = undefined,
			answer = undefined,
		},
		id,
	) => {
		return db('questions')
			.where({ id })
			.update({ question, option2, option3, option4, answer });
	},
	deleteQuestion: id => {
		return db('questions').where({ id }).del();
	},
};
