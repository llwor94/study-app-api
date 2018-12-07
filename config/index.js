const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const userRoutes = require('./routes/userRoutes');

const { errorHandler } = require('./middleware');

module.exports = server => {
	server.use('/api/auth', authRoutes);
	server.use('/api/quizzes', quizRoutes);
	server.use('/api/users', userRoutes);
	server.use(errorHandler);
};
