require('dotenv').config();
const server = require('./server');

const port = process.env.PORT || 3400;
server.listen(port, () => {
	console.log(`Ya made it to port ${port} mon`);
});
