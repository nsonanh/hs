//MARK: --- REQUIRE MODULES

/* Create the port that we’re connecting to */
const port = 3000

/* Get a connection to the mySql database */
const mySqlConnection = require('./databaseHelpers/mySqlWrapper')

/* The bearerTokenDBHelper handles all of the database operations
relating to saving and retrieving oAuth2 bearer tokens */
const accessTokenDBHelper = require('./databaseHelpers/accessTokensDBHelper')(mySqlConnection)

/* The userDBHelper handles all of the database operations relating
to users such as registering and retrieving them */
const userDBHelper = require('./databaseHelpers/userDBHelper')(mySqlConnection)

/* Here we instantiate the model we just made and inject the dbHelpers we use in it */
const oAuthModel = require('./authorisation/accessTokenModel')(userDBHelper, accessTokenDBHelper)
/* We require the node-oauth2-server library */
const oAuth2Server = require('node-oauth2-server')

const express = require('express')
var cors = require('cors');
const expressApp = express()

/* Now we instantiate the oAuth2Server and pass in an object which tells
the the password library that we're using the password  grant type and
give it the model we just required. */
expressApp.oauth = oAuth2Server({
  model: oAuthModel,
  grants: ['password'],
  debug: true
})

/* require the functions that that will handle requests to
the restrictedAreaRoutes */
const restrictedAreaRoutesMethods = require('./restrictedArea/restrictedAreaRoutesMethods.js')

/* require the constructor for the restrictedAreaRoutes.
The router will handle all requestts with a base url of: 'restrictedArea' */
const restrictedAreaRoutes = require('./restrictedArea/restrictedAreaRoutes.js')(express.Router(), expressApp, restrictedAreaRoutesMethods)

/* Here we require the authRoutesMethods object from the module. */
const authRoutesMethods = require('./authorisation/authRoutesMethods')(userDBHelper)

/* Now we instantiate the authRouter module and inject all
of its dependencies. */
const authRoutes = require('./authorisation/authRoutes')(express.Router(), expressApp, authRoutesMethods)

/* This is a library used to help parse the body of the api requests. */
const bodyParser = require('body-parser')

//MARK: --- REQUIRE MODULES

//MARK: --- INITIALISE MIDDLEWARE & ROUTES

//set the bodyParser to parse the urlencoded post data
expressApp.use(bodyParser.urlencoded({ extended: true }))
expressApp.use(cors());

//set the oAuth errorHandler
expressApp.use(expressApp.oauth.errorHandler())

//set the authRoutes for registration and & login requests
/* Here we asign the authRouter as middleware in the express app.
 By doing this all request sent to routes that start with /auth
 will be handled by this router*/
expressApp.use('/auth', authRoutes)

//set the restrictedAreaRoutes used to demo the accesiblity or routes that ar OAuth2 protected
/* Here we asign the restrictedAreaRouter as middleware in the express app.
 By doing this all request sent to routes that start with /auth
 will be handled by this router*/
expressApp.use('/restrictedArea', restrictedAreaRoutes)

//MARK: --- INITIALISE MIDDLEWARE & ROUTES

//init the server
expressApp.listen(port, () => {

   console.log(`listening on port ${port}`)
})
