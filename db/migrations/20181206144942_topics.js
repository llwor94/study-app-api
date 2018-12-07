exports.up = function(knex, Promise) {
	return knex.schema.createTable('topics', table => {
		table.increments();
		table.string('name').notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.scema.dropTableIfExists('topics');
};
