exports.up = function(knex, Promise) {
	return knex.schema.createTable('comments', table => {
		table.increments();
		table.text('text').notNullable();
		table.int('author').unsigned().notNullable().references('users.id').onDelete('CASCADE');
		table.int('post_id').notNullable().references('posts.id').onDelete('CASCADE');
		table.timestamp('created_at').defaultTo(knex.fn.now());
	});
};

exports.down = function(knex, Promise) {
	return knex.scema.dropTableIfExists('comments');
};
