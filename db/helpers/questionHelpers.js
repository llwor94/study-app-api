const db = require('../dbConfig');

module.exports = {
	createQuestion(question) {
		return db('questions').returning('id').insert(question);
	},
	updateQuestion() {},
};
