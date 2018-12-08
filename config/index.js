const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quiz/index');
const userRoutes = require('./routes/userRoutes');
//const questionRoutes = require('./routes/questionRoutes');

const { errorHandler } = require('./middleware');

module.exports = server => {
	server.use('/api/auth', authRoutes);
	server.use('/api/quizzes', quizRoutes);
	server.use('/api/users', userRoutes);
	//server.use('/api/questions', questionRoutes);
	server.use(errorHandler);
};
