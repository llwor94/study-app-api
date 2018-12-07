exports.up = function(knex, Promise) {
	return knex.schema.createTable('posts', table => {
		table.increments();
		table.string('title').notNullable();
		table.text('body').notNullable();
		table.int('author').unsigned().references('users.id');
		table.timestamp('created_at').defaultTo(knex.fn.now());
	});
};

exports.down = function(knex, Promise) {
	return knex.scema.dropTableIfExists('posts');
};
