const db = require('../dbConfig');

module.exports = {
	getFriends(id) {
		return db('friends as f')
			.where('f.user_1', id)
			.join('users as u', 'f.user_2', 'u.id')
			.select('u.id', 'u.username', 'u.img_url');
	},
	checkUser(id) {
		return db('users').where({ id }).first();
	},
	checkFriendship(user_1, user_2) {
		return db('friends').where({ user_1 }).andWhere({ user_2 }).first();
	},
	createFriendship(user_1, user_2) {
		return db('friends').insert(
			[ { user_1: user_1, user_2: user_2 }, { user_1: user_2, user_2: user_1 } ],
			[ 'id' ],
		);
	},
};
