exports.up = function(knex, Promise) {
	return knex.schema.createTable('quizzes', table => {
		table.increments();
		table.string('title').notNullable();
		table.integer('author').references('users.id');
		table.integer('time_limit_seconds').unsigned();
		table.integer('votes');
	});
};

exports.down = function(knex, Promise) {
	return knex.scema.dropTableIfExists('quizzes');
};
