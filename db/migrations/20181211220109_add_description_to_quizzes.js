exports.up = function(knex, Promise) {
	return knex.schema.table('quizzes', table => {
		table.string('description');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.table('quizzes', table => {
		table.dropColumn('description');
	});
};
