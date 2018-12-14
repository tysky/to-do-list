const getServer = require('./server');

const port = process.env.PORT || 8080;
getServer().listen(port, () => console.log(`Listening on port ${port}!`));
