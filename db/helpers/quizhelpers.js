const db = require('../dbConfig');

module.exports = {
	getQuizzes(topic) {
		if (topic) {
			let topic = db('topics').where('id', topic).orWhere('name', topic).select('id');
			return db('quizzes').where('topic_id', topic);
		} else
			return db('quizzes as q')
				.join('topics as t', 'q.topic_id', 't.id')
				.join('users as u', 'q.author', 'u.id')
				.select('q.id', 'q.title', 'u.username as author', 'q.votes', 't.name as topic');
	},
	async getQuiz(id) {
		let questions = await db('questions')
			.where('quiz_id', id)
			.select('id', 'question', 'option1', 'option2', 'option3', 'option4');
		let quiz = await db('quizzes as q')
			.join('users as u', 'q.author', 'u.id')
			.where('q.id', id)
			.select('q.id', 'q.title', 'u.username as author', 'q.votes', 'q.time_limit_seconds')
			.first();
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
	async getTopicId(name) {
		let { id } = await db('topics')
			.where(db.raw('LOWER("name") = ?', name.toLowerCase()))
			.select('id')
			.first();
		if (!id) {
			[ id ] = await db('topics').returning('id').insert({ name: topic });
		}
		return id;
	},
	createQuiz({ title, author, time_limit_seconds, topic }) {
		let topic_id = this.getTopicId(topic);

		return db('quizzes')
			.returning('id')
			.insert({ title, author, time_limit_seconds, topic_id });
	},
	updateQuiz({ topic = undefined, title = undefined }, id) {
		let topic_id = undefined;
		if (topic) {
			topic_id = this.getTopicId(topic);
		}
		return db('quizzes').where({ id }).update({ topic_id, title });
	},
};
