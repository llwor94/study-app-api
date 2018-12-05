exports.up = function(knex, Promise) {
	return knex.schema.createTable('user_favorites', table => {
		table.increments();
		table.integer('user').unsigned().references('users.id');
		table.integer('quiz').unsigned().references('quizzes.id');
	});
};

exports.down = function(knex, Promise) {
	return knex.scema.dropTableIfExists('user_favorites');
};
