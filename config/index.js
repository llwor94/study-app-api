const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizzes');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');

const { errorHandler, getUser } = require('./middleware');

module.exports = server => {
	server.use(getUser);
	server.use('/api/auth', authRoutes);
	server.use('/api/quizzes', quizRoutes);
	server.use('/api/users', userRoutes);
	server.use('/api/posts', postRoutes);

	server.use(errorHandler);
};
