'use strict';

// Require and init API router module
const app = require('lambda-api')({ version: 'v1.0', base: 'v1' });
const _get = require('lodash/get');
const ExampleFunc = require('./functions/ExampleFunc');

//----------------------------------------------------------------------------//
// Define Middleware
//----------------------------------------------------------------------------//

// Add CORS Middleware
app.use((req, res, next) => {
  // Add default CORS headers for every request
  res.cors();

  // Call next to continue processing
  next();
});

// Add Authorization Middleware
app.use((req, res, next) => {
  // Check for Authorization Bearer token
  if (req.auth.type === 'Bearer') {
    // Get the Bearer token value
    let token = req.auth.value;
    // Set the token in the request scope
    req.token = token;
    // Do some checking here to make sure it is valid (set an auth flag)
    req.auth = true;
  }

  // Call next to continue processing
  next();
});

//----------------------------------------------------------------------------//
// Build API routes
//----------------------------------------------------------------------------//

app.get('/test', async (req, res) => {
  const example = await ExampleFunc();

  // Send the response
  res.status(200).json(example);
});

app.post('/post-test', async (req, res) => {
  try {
    const data = _get(req, 'body');
    if (data.testdata) {
      res.status(200).json({ status: data.testdata });
    } else {
      res.status(500).json({ status: 'no body data sent' });
    }
  } catch (error) {
    console.log('errorinroute', error);
    res.status(500).json({ status: 'notsent2' });
  }
});

// Default Options for CORS preflight
app.options('/*', (req, res) => {
  res.status(200).json({});
});

// Log routes to console for debugging
//app.routes(true)

//----------------------------------------------------------------------------//
// Main router handler
//----------------------------------------------------------------------------//
module.exports.router = (event, context, callback) => {
  // !!!IMPORTANT: Set this flag to false, otherwise the lambda function
  // won't quit until all DB connections are closed, which is not good
  // if you want to freeze and reuse these connections
  context.callbackWaitsForEmptyEventLoop = false;

  if (event.source === 'serverless-plugin-warmup') {
    return 'Lambda is warm!';
  }

  // Run the request
  app.run(event, context, callback);
}; // end router handler
