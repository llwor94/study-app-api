exports.up = function(knex, Promise) {
	return knex.schema.createTable('comments', table => {
		table.increments();
		table.text('text').notNullable();
		table.int('author').references('users.id');
		table.int('post').references('posts.id');
		table.timestamp('created_at').defaultTo(knex.fn.now());
	});
};

exports.down = function(knex, Promise) {
	return knex.scema.dropTableIfExists('comments');
};
