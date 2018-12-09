const db = require('../dbConfig');

module.exports = {
	hi: 'WHAT THE FUCK',
	getQuizzes: topic => {
		if (topic) {
			let topic = db('topics').where('id', topic).orWhere('name', topic).select('id');
			return db('quizzes').where('topic_id', topic);
		} else
			return db('quizzes as q')
				.join('topics as t', 'q.topic_id', 't.id')
				.join('users as u', 'q.author', 'u.id')
				.select('q.id', 'q.title', 'u.username as author', 'q.votes', 't.name as topic');
	},
	getQuiz: async id => {
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
		let author = await db('users')
			.where('id', quiz.author)
			.select('id', 'username', 'img_url')
			.first();
		quiz.author = author;
		return quiz;
	},
	getTopics: name => {
		if (name) {
			return db('topics').where('id', name).orWhere('name', name);
		}
		return db('topics');
	},
	getTopicId: async name => {
		let { id } = await db('topics')
			.where(db.raw('LOWER("name") = ?', name.toLowerCase()))
			.select('id')
			.first();
		if (!id) {
			[ id ] = await db('topics').returning('id').insert({ name: topic });
		}
		return id;
	},
	createQuiz: ({ title, author, time_limit_seconds, topic }) => {
		//let topic_id = this.getTopicId(topic);
		console.log(this.hi);
		// return db('quizzes')
		// 	.returning('id')
		// 	.insert({ title, author, time_limit_seconds, topic_id });
	},
	updateQuiz: ({ topic = undefined, title = undefined, time_limit_seconds = undefined }, id) => {
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
