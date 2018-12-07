const db = require('../dbConfig');

module.exports = {
	getQuizzes(topic) {
		if (topic) {
			let topic = db('topics').where('id', topic).orWhere('name', topic).select('id');
			return db('quizzes').where('topic', topic);
		} else return db('quizzes');
	},
	async getQuiz(id) {
		let questions = await db('questions').where('quiz_id', id);
		let quiz = await db('quizzes').where({ id }).first();
		if (!quiz) return;
		quiz.questions = questions;
		return quiz;
	},
	getTopics(name) {
		if (name) {
			return db('topics').where('id', name).orWhere('name', name);
		}
		return db('topics');
	},
	async createQuiz({ title, author, time_limit_seconds, topic }) {
		let { id } = await db('topics')
			.where(db.raw('LOWER("name") = ?', topic.toLowerCase()))
			.select('id')
			.first();

		if (!id) {
			[ id ] = await db('topics').returning('id').insert({ name: topic });
		}
		topic_id = id;
		return db('quizzes')
			.returning('id')
			.insert({ title, author, time_limit_seconds, topic_id });
	},
};
