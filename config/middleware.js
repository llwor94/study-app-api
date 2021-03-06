const jwt = require('jsonwebtoken');
const secret = 'secret';

module.exports = {
	getUser(req, res, next) {
		const token = req.headers.authorization;
		req.user = {};
		console.log('token', token);

		if (token) {
			jwt.verify(token, secret, (err, decodedToken) => {
				if (err) return next(err);
				req.user.id = decodedToken.id;

				next();
			});
		} else return next();
	},
	errorHandler(err, req, res, next) {
		console.log(err);
		switch (err.code) {
			case 400:
				return res.status(400).json({
					error: true,
					message: 'There was a problem with your request.',
				});

			case 401:
				return res.status(401).json({
					error: true,
					message: 'You are unathorized to view the content.',
				});

			case 404:
				return res.status(404).json({
					error: true,
					message: 'The requested content does not exist.',
				});

			default:
				return res.status(500).json({
					error: true,
					message: 'There was an error performing the required operation',
				});
		}
	},
};
