const db = require('../dbConfig');

module.exports = {
	getUser(query) {
		if (query.username) {
			return db('users')
				.where({ username: query.username })
				.select('email', 'username', 'id', 'img_url')
				.first();
		} else {
			return db('users')
				.where({ email: query.email })
				.select('email', 'username', 'id', 'img_url')
				.first();
		}
	},
	getUsers() {
		return db('users').select('email', 'username', 'id', 'img_url');
	},

	getUserById(id) {
		return db('users').where(id).select('email', 'username', 'id', 'img_url').first();
	},
};
