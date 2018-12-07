exports.up = function(knex, Promise) {
	return knex.schema.createTable('users_quizzes', table => {
		table.increments();
		table.integer('user_id').unsigned().references('users.id');
		table.integer('quiz_id').unsigned().references('quizzes.id');
		table.integer('score').unsigned().defaultTo(0);
		table.integer('vote').defaultTo(0);
		table.boolean('favorite').defaultTo(false);
	});
};

exports.down = function(knex, Promise) {
	return knex.scema.dropTableIfExists('user_quizzes');
};
