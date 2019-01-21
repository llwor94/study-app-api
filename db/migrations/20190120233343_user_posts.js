exports.up = function(knex, Promise) {
	return knex.schema.createTable('users_posts', table => {
		table.increments();
		table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE');
		table.integer('post_id').unsigned().references('posts.id').onDelete('CASCADE');
		table.boolean('favorite').defaultTo(false);
		table.integer('vote').defaultTo(0);

		table.timestamps(true, true);
	});
};

exports.down = function(knex, Promise) {
	return knex.scema.dropTableIfExists('users_posts');
};
