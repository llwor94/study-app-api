const db = require('../dbConfig');

module.exports = {
	getComments(post_id) {
		return db('comments as c')
			.where({ post_id })
			.join('users as u', 'u.id', 'c.author')
			.select(
				'c.id',
				'c.text',
				'u.username as author',
				'u.img_url as author_img',
				'c.post_id',
				'c.created_at',
			);
	},
	async getComment(id) {
		let comment = await db('comments').where({ id }).first();
		if (!comment) return;
		let author = await db('users')
			.where('id', comment.author)
			.select('id', 'username', 'img_url')
			.first();
		comment.author = author;
		return comment;
	},
	createComment({ text, author }, post_id) {
		return db('comments').returning('id').insert({ text, author, post_id });
	},
	editComment(id, text) {
		return db('comments').returning('id').where({ id }).update({ text });
	},
	deleteComment(id) {
		return db('comments').where({ id }).del();
	},
};
