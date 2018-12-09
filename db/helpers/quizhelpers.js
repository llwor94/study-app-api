const db = require('../dbConfig');

module.exports = {
	getQuizzes(topic) {
		if (topic) {
			let topic = db('topics').where('id', topic).orWhere('name', topic).select('id');
			return db('quizzes').where('topic_id', topic);
		}
		return (
			db('quizzes as q')
				.join('topics as t', 'q.topic_id', 't.id')
				//.join('users as u', 'q.author', 'u.id')
				.select('q.id', 'q.title', 'q.votes', 't.name as topic')
		);
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
		console.log(quiz);
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
		let id;
		let topic = await db('topics')
			.where(db.raw('LOWER("name") = ?', name.toLowerCase()))
			.select('id')
			.first();
		if (!topic) {
			let [ id ] = await db('topics').returning('id').insert({ name });
		} else {
			let { id } = topic;
		}

		return id;
	},
	createQuiz(body) {
		let topic_id = this.getTopicId(body.topic);
		console.log(topic_id);
		return db('quizzes')
			.returning('id')
			.insert({ title, author, time_limit_seconds, topic_id });
	},
	updateQuiz({ topic = undefined, title = undefined, time_limit_seconds = undefined }, id) {
		let topic_id = undefined;
		if (topic) {
			topic_id = this.getTopicId(topic);
		}
		return db('quizzes').where({ id }).update({ topic_id, title, time_limit_seconds });
	},
	deleteQuiz(id) {
		return db('questions').where({ id }).del();
	},
};
