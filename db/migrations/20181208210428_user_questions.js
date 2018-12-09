exports.up = function(knex, Promise) {
	return knex.schema.createTable('users_questions', table => {
		table.increments();
		table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE');
		table.integer('question_id').unsigned().references('questions.id').onDelete('CASCADE');
		table.integer('score').unsigned().defaultTo(0);
	});
};

exports.down = function(knex, Promise) {
	return knex.scema.dropTableIfExists('user_questions');
};
