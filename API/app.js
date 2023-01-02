'use strict';

// load modules
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');

// import models
const { sequelize } = require('./models');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// enable ALL cors requests
app.use(cors());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// setup json parsing for request body
app.use(express.json());

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// add routes
app.use('/api', routes);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  console.log('global handler called');
  const errorMessages = err.errors;
  console.log(errorMessages.map(err => err.message));
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  };
  res.status(err.status || 500).json({
    message: errorMessages.map(err => err.message)
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// handle Sequelize operation asynchronously
console.log('Testing the connection to the database...');
(async() => {
  try {
    // test connection to database
    await sequelize.authenticate();
    console.log('Connection to database was successful!');

    // Sync the models
    console.log('Synchronizing the models with the database...');
    await sequelize.sync();
  }
  catch (error) {
    console.log('Unable to connect to the database');
  }
})();

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
