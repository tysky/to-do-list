const express = require('express');
const morgan = require('morgan');
const path = require('path');
const apiRoutes = require('./routes');


const app = express();

const logger = morgan('tiny');
app.use(logger);
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use('/api/v1', apiRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}!`));
