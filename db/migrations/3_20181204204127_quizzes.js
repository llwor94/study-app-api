exports.up = function(knex, Promise) {
	return knex.schema.createTable('quizzes', table => {
		table.increments();
		table.string('title').notNullable();
		table.integer('author').unsigned().references('users.id').onDelete('CASCADE');
		table.integer('time_limit_seconds').unsigned();
		table.integer('votes').defaultTo(0);
		table.integer('topic_id').unsigned().references('topics.id');
	});
};

exports.down = function(knex, Promise) {
	return knex.scema.dropTableIfExists('quizzes');
};
