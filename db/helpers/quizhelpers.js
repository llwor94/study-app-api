const db = require('../dbConfig');

module.exports = {
	getQuizzes(topic) {
		if (topic) {
			let topic = db('topics').where('id', topic).orWhere('name', topic).select('id');
			return db('quizzes as q').where('q.topic', topic);
		} else return db('quizzes');
	},
	async getQuiz(id) {
		let questions = await db('questions').where('quiz_id', id);
		let quiz = await db('quizzes').where({ id }).first();
		if (!quiz) return;
		quiz.questions = questions;
		return quiz;
	},
};
