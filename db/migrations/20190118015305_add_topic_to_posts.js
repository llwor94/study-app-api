exports.up = function(knex, Promise) {
	return knex.schema.table('posts', table => {
		table.integer('topic_id').unsigned().references('topics.id');
		table.integer('quiz_id').unsigned().references('quizzes.id');
		table.integer('votes').defaultTo(0);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.table('posts', table => {
		table.integer('topic_id').unsigned().references('topics.id');
		table.integer('quiz_id').unsigned().references('quizzes.id');
		table.integer('votes').defaultTo(0);
	});
};
