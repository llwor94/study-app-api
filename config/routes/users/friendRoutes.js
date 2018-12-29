const express = require('express');
const router = express.Router({ mergeParams: true });

router.use((req, res, next) => {
	if (req.user.id) {
		console.log(req.user);
		next();
	} else {
		console.log('uhoh');
	}
});

router.get('/', (req, res, next) => {
	console.log('yay', req.user);
});

module.exports = router;
