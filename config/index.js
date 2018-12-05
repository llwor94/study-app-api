const authRoutes = require('./routes/authRoutes');
const { errorHandler } = require('./middleware');

module.exports = server => {
	server.use('/api/auth', authRoutes);
	server.use(errorHandler);
};
