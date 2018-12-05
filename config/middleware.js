const jwt = require('jsonwebtoken');
const secret = 'secret';

module.exports = {
	protected: function(req, res, next) {
		const token = req.headers.authorization;

		if (token) {
			jwt.verify(token, secret, (err, decodedToken) => {
				if (err) {
					console.log(err);
					return res.json({
						error: true,
						message: 'You are not authorized',
					});
				} else {
					req.user = decodedToken.user;
					next();
				}
			});
		} else {
			return res
				.json({
					error: true,
					message: 'No token provided',
				})
				.catch(err => res.status(500).send(err));
		}
	},
	errorHandler: function(err, req, res, next) {
		console.log(err);
		if (err.errno === 19) return res.status(405).json('Title is already taken');
		switch (err.code) {
			case 404:
				res.status(404).json('The requested file does not exist.');
				break;
			case 400:
				res.status(400).json('Please complete all the required fields');
				break;
			case 403:
				res.json({
					error: true,
					msg: 'You are unathorized to view the content.',
				});
				break;
			default:
				res.status(500).json({
					error: true,
					message: 'There was an error performing the required operation',
				});
				break;
		}
	},
};
