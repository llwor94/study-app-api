const db = require('../dbConfig');
const _ = require('lodash');

module.exports = {
	async getQuizzes(topic, user) {
		if (topic) {
			let topic = db('topics').where('id', topic).orWhere('name', topic).select('id');
			return db('quizzes').where('topic_id', topic);
		}

		let questions = db
			.select(db.raw('count(quiz_id)::integer'))
			.from('questions')
			.whereRaw('quiz_id = q.id')
			.as('question_count');

		if (user.id) {
			let vote = db
				.select('vote')
				.from('users_quizzes')
				.where('user_id', user.id)
				.andWhereRaw('quiz_id = q.id')
				.as('user_vote');

			let score = db
				.select('score')
				.from('users_quizzes')
				.where('user_id', user.id)
				.andWhereRaw('quiz_id = q.id')
				.as('score');

			let favorite = db
				.select('favorite')
				.from('users_quizzes')
				.where('user_id', user.id)
				.andWhereRaw('quiz_id = q.id')
				.as('favorite');

			return db('quizzes as q')
				.join('topics as t', 'q.topic_id', 't.id')
				.join('users as u', 'q.author', 'u.id')
				.select(
					'q.id',
					'q.title',
					'q.votes',
					'q.description',
					'u.username as author',
					't.name as topic',
					questions,
					vote,
					score,
					favorite,
				);
		} else {
			return db('quizzes as q')
				.join('topics as t', 'q.topic_id', 't.id')
				.join('users as u', 'q.author', 'u.id')
				.select(
					'q.id',
					'q.title',
					'q.votes',
					'q.description',
					'u.username as author',
					't.name as topic',
					questions,
				);
		}
	},

	async getQuiz(quiz_id, user) {
		let quiz = await db('quizzes as q')
			.where('q.id', quiz_id)
			.join('topics as t', 'q.topic_id', 't.id')
			.select(
				'q.id',
				'q.title',
				'q.votes',
				'q.description',
				'q.time_limit_seconds',
				'q.author',
				't.name as topic',
			)
			.first();

		if (!quiz) return;
		if (user.id) {
			let user_quiz = await db('users_quizzes').where({ user_id: user.id, quiz_id }).first();
			if (user_quiz) {
				quiz = {
					...quiz,
					user_vote: user_quiz.vote,
					favorite: user_quiz.favorite ? true : false,
					score: user_quiz.score,
				};
			} else {
				quiz = { ...quiz, user_vote: 0, favorite: false, score: 0 };
			}
		}
		let author = await db('users')
			.where('id', quiz.author)
			.select('id', 'username', 'img_url')
			.first();
		let questions = await db('questions')
			.select(db.raw('count(quiz_id)::integer'))
			.groupBy('quiz_id')
			.where({ quiz_id })
			.first();
		if (questions) {
			quiz.question_count = questions.count;
		} else {
			quiz.question_count = 0;
		}
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
	async createQuiz({ title, author, time_limit_seconds, topic, description }) {
		let topic_id = await this.getTopicId(topic);

		return db('quizzes')
			.returning('id')
			.insert({ title, author, time_limit_seconds, topic_id, description });
	},
	async updateQuiz(
		{
			topic = undefined,
			title = undefined,
			time_limit_seconds = undefined,
			description = undefined,
		},
		id,
	) {
		let topic_id = undefined;
		if (topic) {
			topic_id = await this.getTopicId(topic);
		}
		return db('quizzes')
			.where({ id })
			.returning('id')
			.update({ topic_id, title, time_limit_seconds, description });
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
		if (!entry) {
			let body = { ..._.omitBy({ vote, score, favorite }, _.isUndefined), user_id, quiz_id };
			if (vote) {
				if (vote === 1) await db('quizzes').where('id', quiz_id).increment('votes', 1);
				if (vote === -1) await db('quizzes').where('id', quiz_id).decrement('votes', 1);
			}
			return db('users_quizzes').returning('id').insert(body);
		}
		if (score) {
			let questions = await db('questions').where({ quiz_id });
			if (score > questions.length) return;
		}
		if (vote && vote !== entry.vote) {
			let difference = Math.abs(vote - entry.vote);
			if (vote < entry.vote)
				await db('quizzes').where('id', quiz_id).decrement('votes', difference);
			else await db('quizzes').where('id', quiz_id).increment('votes', difference);
		}

		return db('users_quizzes')
			.returning('id')
			.where({ quiz_id, user_id })
			.update({ vote, score, favorite });
	},
};
