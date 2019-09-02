/* The userDBHelper is an object which will handle all of the user related db
operations  such as saving new users or retrieving existing ones. You can find
it in the userDBHelper.js in this projects databaseHelpers folder. */
let userDBHelper

/**
 *
 * This module exports a function  which registers users by using
 * the specified injectedUserDBHelper.
 *
 * @param injectedUserDBHelper - this object handles the execution of user
 * related database operation such as storing them when they register
 *
 * @return {{registerUser: registerUser, login: *}}
 */
module.exports = injectedUserDBHelper => {

  //assign the injectedUserDBHelper to the file's userDBHelper
  userDBHelper = injectedUserDBHelper

  return {
    registerUser: registerUser,
    login: login
  }
}

/**
 *
 * Handles the requests to register a user. The request's body will contain
 * a username and password. The method which will check if the user exists,
 * if they do exist then we will notify the client of this, and if they don't
 * exist then we will attempt to register the user, and then send the client a
 * response notifying them of whether or not the user was sucessfully registered
 *
 * @param req - request from api client
 * @param res - response to respond to client
 */
function registerUser(req, res) {

    console.log(`authRoutesMethods: registerUser: req.body is:`, req.body);

    //query db to see if the user exists already
    userDBHelper.doesUserExist(req.body.username, (sqlError, doesUserExist) => {

      //check if the user exists
      if (sqlError !== null || doesUserExist){

        //message to give summary to client
        const message = sqlError !== null ? "Operation unsuccessful" : "User already exists"

        //detailed error message from callback
        const error =  sqlError !== null ? sqlError : "User already exists"

        sendResponse(res, message, sqlError)

        return
      }

      //register the user in the db
      userDBHelper.registerUserInDB(req.body.username, req.body.password, dataResponseObject => {

        //create message for the api response
        const message =  dataResponseObject.error === null  ? "Registration was successful" : "Failed to register user"

        sendResponse(res, message, dataResponseObject.error)
      })
    })
  }




function login(registerUserQuery, res){


}

/**
 *
 * sends a response created out of the specified parameters to the client.
 * The typeOfCall is the purpose of the client's api call.
 *
 * @param res - response to respond to client
 * @param message - message to send to the client
 * @param error - error to send to the client
 */
function sendResponse(res, message, error) {

        res
        .status(error !== null ? error !== null ? 400 : 200 : 400)
        .json({
             'message': message,
             'error': error,
        })
}
