exports.up = function(knex, Promise) {
	return knex.schema.createTable('questions', table => {
		table.increments();
		table.string('question').notNullable();
		table.string('option1').notNullable();
		table.string('option2').notNullable();
		table.string('option3');
		table.string('option4');
		table.integer('answer').unsigned();
		table.integer('author').references('users.id');
		table.integer('quiz').references('quizzes.id');
	});
};

exports.down = function(knex, Promise) {
	return knex.scema.dropTableIfExists('questions');
};
