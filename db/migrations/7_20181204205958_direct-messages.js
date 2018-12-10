exports.up = function(knex, Promise) {
	return knex.schema.createTable('direct_messages', table => {
		table.increments();
		table.text('message').notNullable();
		table.integer('from').unsigned().references('users.id').onDelete('CASCADE');
		table.integer('to').unsigned().references('users.id').onDelete('CASCADE');
		table.timestamp('created_at').defaultTo(knex.fn.now());
	});
};

exports.down = function(knex, Promise) {
	return knex.scema.dropTableIfExists('direct_messages');
};
