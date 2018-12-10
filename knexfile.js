// Update with your config settings.
require('dotenv').config();

const localPg = {
	host: 'localhost',
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: prcoess.env.DB_PASS,
};
const dbConnection = process.env.DATABASE_URL || localPg;
module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './db/db.sqlite3',
		},
		pool: {
			afterCreate: function(conn, cb) {
				conn.run('PRAGMA foreign_keys = ON', cb);
			},
		},
		useNullAsDefault: true,
		migrations: {
			directory: './db/migrations',
			tableName: 'dbmigrations',
		},
	},

	production: {
		client: 'pg',
		connection: dbConnection,
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			directory: './db/migrations',
			tableName: 'dbmigrations',
		},
	},
};
