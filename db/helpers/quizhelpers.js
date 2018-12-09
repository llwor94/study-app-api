const db = require('../dbConfig');
const _ = require('lodash');

module.exports = {
	getQuizzes(topic) {
		if (topic) {
			let topic = db('topics').where('id', topic).orWhere('name', topic).select('id');
			return db('quizzes').where('topic_id', topic);
		}
		return db('quizzes as q')
			.join('topics as t', 'q.topic_id', 't.id')
			.join('users as u', 'q.author', 'u.id')
			.select('q.id', 'q.title', 'q.votes', 'u.username as author', 't.name as topic');
	},
	async getQuiz(id) {
		let quiz = await db('quizzes as q')
			.where('q.id', id)
			.join('topics as t', 'q.topic_id', 't.id')
			.select(
				'q.id',
				'q.title',
				'q.votes',
				'q.time_limit_seconds',
				'q.author',
				't.name as topic',
			)
			.first();
		if (!quiz) return;
		let author = await db('users')
			.where('id', quiz.author)
			.select('id', 'username', 'img_url')
			.first();
		quiz.author = author;
		return quiz;
	},
	getTopics() {
		return db('topics');
	},
	async getTopicId(name) {
		let topic = await db('topics')
			.where(db.raw('LOWER("name") = ?', name.toLowerCase()))
			.select('id')
			.first();
		if (!topic) {
			let [ id ] = await db('topics').returning('id').insert({ name });
			return id;
		} else {
			return topic.id;
		}
	},
	async createQuiz({ title, author, time_limit_seconds, topic }) {
		let topic_id = await this.getTopicId(topic);

		return db('quizzes')
			.returning('id')
			.insert({ title, author, time_limit_seconds, topic_id });
	},
	async updateQuiz({ topic = undefined, title = undefined, time_limit_seconds = undefined }, id) {
		let topic_id = undefined;
		if (topic) {
			topic_id = await this.getTopicId(topic);
		}
		return db('quizzes').where({ id }).update({ topic_id, title, time_limit_seconds });
	},
	deleteQuiz(id) {
		return db('quizzes').where({ id }).del();
	},
	async userQuizUpdate(
		{ vote = undefined, score = undefined, favorite = undefined },
		user_id,
		quiz_id,
	) {
		let entry = await db('users_quizzes').where({ user_id, quiz_id }).first();
		console.log(entry);
		if (!entry) {
			let body = { ..._.omitBy({ vote, score, favorite }, _.isUndefined), user_id, quiz_id };
			if (vote) {
				if (vote === 1) await db('quizzes').where('id', quiz_id).increment('votes', 1);
				if (vote === -1) await db('quizzes').where('id', quiz_id).decrement('votes', 1);
			}
			return db('users_quizzes').insert(body);
		}
		if (score) {
			let questions = await db('questions').where({ quiz_id });
			if (score > questions.length) return;
		}
		if (vote !== entry.vote) {
			let difference = Math.abs(vote - entry.vote);
			console.log(difference);
			if (vote < entry.vote)
				await db('quizzes').where('id', quiz_id).decrement('votes', difference);
			else await db('quizzes').where('id', quiz_id).increment('votes', difference);
		}

		return db('users_quizzes').update({ vote, score, favorite });
	},
};
