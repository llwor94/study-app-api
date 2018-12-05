exports.up = function(knex, Promise) {
	return knex.schema.createTable('posts', table => {
		table.increments();
		table.string('title').notNullable();
		table.text('body').notNullable();
		table.int('author').references('users.id');
	});
};

exports.down = function(knex, Promise) {
	return knex.scema.dropTableIfExists('posts');
};
