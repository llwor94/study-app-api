exports.up = function(knex, Promise) {
	return knex.schema.table('quizzes', table => {
		table.integer('question_time_limit').unsigned();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.table('quizzes', table => {
		table.dropColumn('question_time_limit');
	});
};
