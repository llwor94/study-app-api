exports.up = function(knex, Promise) {
	return knex.schema.createTable('friends', table => {
		table.increments();
		table.integer('user_1').unsigned().references('users.id');
		table.integer('user_2').unsigned().references('users.id');
	});
};

exports.down = function(knex, Promise) {
	return knex.scema.dropTableIfExists('friends');
};
