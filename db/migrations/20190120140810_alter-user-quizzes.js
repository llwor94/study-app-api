exports.up = function(knex, Promise) {
	return knex.schema.alterTable('users_quizzes', table => {
		table.integer('score').unsigned().defaultTo(null).alter();
		table.timestamps(true, true);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.alterTable('users_quizzes', table => {
		table.integer('score').unsigned().defaultTo(null).alter();
		table.timestamps(true, true);
	});
};
