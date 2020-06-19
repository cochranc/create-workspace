/**
 * database.js
 *   Functions that have to do with the database.
 */

// +-------+-----------------------------------------------------------
// | To Do |
// +-------+

// Update user information
// Split change password into two functions, one for password recovery
// PGP Public key

// +-------------------------------+-----------------------------------
// | Summary of Exported Functions |
// +-------------------------------+

/*
   PRIMARY
     query(txt,callback(rows,error))
       send a database query
     sanitize(txt) 
       sanitize a database input

   USER INFO
     userExists(userinfo, callback(exists))
       Determine if a user is in the database (via username or email)

   IMAGE INFO
     imageExists(userid, title)
       Determine if an image with the given title is in the database.
     imageInfo(imageid, callback(info,error))
       Get information on an image.
 */

// +---------+---------------------------------------------------------
// | Globals |
// +---------+

var auth = require('./auth.js');  // Include private-strings that should not be on the public repo
var mysql = require('mysql'); // Include the mysql library
var bcrypt = require('bcrypt-nodejs'); // Include Blowfish Algorithm for hashing passwords
var validate = require('validator'); // Include validation functions

// Make a connection pool to handle concurrencies esp. that of async calls
var pool = mysql.createPool({
  host : auth["mysql-hostname"],
  user : auth["mysql-username"],
  password : auth["mysql-password"],
  //database : auth["mysql-database"]
});

// +-----------+-------------------------------------------------------
// | Utilities |
// +-----------+

/*
  Procedure:
    hashPassword(passwordtohash, callback(hashedPassword,err));
  Purpose:
    Hashes a password with Blowfish Algorithm
  Parameters:
    passwordtohash, a plaintext version of a password to hash
  callback(hashedPassword, error), a function describing what to do with the result
  Produces:
    [Nothing.  Passes control to the hashed password.]
  Pre-conditions:
    None
  Post-conditions:
    The password will be hashed with Blowfish Crypt
  Preferences:
    This function is not available outside of this document.
*/
var hashPassword = (function (passwordtohash, callback) {
  bcrypt.hash(passwordtohash, null, null, function(err,hash) {
    callback(hash, err);
  });
});// hashPassword(passwordtohash, callback)

/*
  Procedure:
    sanitize(string);
  Purpose:
    Sanitizes a string for MySQL insertion without risking injection
  Parameters:
    string, the string to sanitize
  Produces:
    sanitizedString, a string - returned
  Pre-conditions:
    None
  Post-conditions:
    sanitizedString will be safe to insert into a MySQL
  Preferences:
    This function is not available outside of this document.
*/
var sanitize = (function (string) {
  var escaped = validate.escape(string);
  escaped = escaped.replace(/'/g, '&#39;');
  // Restore ampersands (and other things?)
  // escaped = escaped.replace("&amp;", "&");
  return escaped;
}); // sanitize(string);
module.exports.sanitize = sanitize;

// +--------------------+----------------------------------------------
// | Primary Procedures |
// +--------------------+

/*
  Procedure:
    database.query(query, callback(rows, error));
  Purpose:
    Make a query on the current database
  Parameters:
    query, a SQL formatted string
    callback(rows, error), a function describing what to do with the result
  Produces:
    [Nothing; Passes rows/error to the callback.]
  Pre-conditions:
    None
  Post-conditions:
    The MySQL database will be altered as requested
  Preferences:
    Please sanitize input.
*/
var query = (function (query, callback) {
  pool.getConnection(function(err,connection) {
    connection.query(query, function(err,rows,fields) {
      if (err) {
        callback(null, err);
      }
      else{
        callback(rows,null);
      }
    });
    connection.release();
  });
}); // database.query(query, callback(rows, error));
module.exports.query = query;

/**
 * Query a database and call the callback with true (success)
 * or false (error) along with any error.
 */
module.exports.queryBoolean = function(query, callback) {
  module.exports.query(query, function(result,error) {
    if (error) {
      callback(false, error);
    }
    else {
      callback(true, null);
    }
  });
} // queryBoolean

/**
 * Do a sequence of queries.  If all of the queries succeed, call the
 * callback with true as the first parameter.  If any of the queries
 * fail, call the callback with false as the first parameter and an error
 * as the second parameter.
 */
var querySequenceAll = function(queries, callback) {
  // See if any queries remain
  if (queries.length == 0) {
    console.log("Finished query sequence.");
    callback(true,null);
    return;
  } // if we are out of queries

  // Start with the first query
  console.log("Query:", queries[0]);
  query(queries[0], function(rows, err) {
    if (err) {
      console.log("Failed");
      callback(false,err);
      return;
    } // if (err)
    console.log("Result", rows);
    // Make a copy of the queries
    var newQueries = queries.concat([]);
    console.log("newQueries", newQueries);
    // Remove the first one, which we just did
    newQueries.shift();
    // And try it all over again
    querySequenceAll(newQueries, callback);
  }); // query
} // querySequenceAll
module.exports.querySequenceAll = querySequenceAll;

/**
 * Do a sequence of queries, call the callback when the first query
 * succeeds.  If none of the queries succeed, call the callback with
 * defaultError.
 */
var querySequenceAny = function(queries, defaultError, callback) {
  // See if any queries remain
  if (queries.length == 0) {
    callback(null, defaultError);
    return;
  } // if there are no queries left

  // Try the first query.
  query(queries[0], function(rows,err) {
    // If we fail
    if (err) {
      // Make a copy of the array
      var newQueries = queries.concat([]);
      // Delete the first element
      newQueries.shift();
      // And try again on the remaining queries
      querySequenceAny(newQueries, defaultError, callback);
    } // if err
  }); // query
}; // querySequenceAny
module.exports.querySequenceAny = querySequenceAny;

/**
 * Determine if a user owns something (image, album, ...).
 * Practica:
 *   userOwns(17,"album",1234,function(ok,error) { ... });
 */
var userOwns = function(userid,type,id,callback) {
  // Sanitize the inputs
  userid = sanitize(userid);
  id = sanitize(id);

  // Make sure that they are valid ids (all numbers).
  if (isNaN(userid)) {
    callback(false, "Invalid user id: " + userid);
    return;
  }
  if ((!id) || (isNaN(id))) {
    callback(false, "Invalid " + type + " id: " + id);
    return;
  }

  // Make sure that the user owns the thing
  var getUser = "SELECT userid FROM " + type + "s WHERE " + type + 
      "id=" + id + ";";
  console.log("getUser", getUser);
  query(getUser, function(rows, err) {
    console.log("rows",rows,"err",err);
    if (err) {
      callback(false,err);
      return;
    } // if (err)
    if (rows.length == 0) {
      callback(false,"No such " + type + ": " + id);
      return;
    }
    if (rows[0].userid != userid) {
      callback(false,"User " + userid + " does not own " + type + " " + 
          id);
      return;
    }
    // Okay, we've checked all of the sensible failure points.  The
    // user owns it.
    callback(true,null);
  }); // query
}; // userOwns
module.exports.userOwns = userOwns;

// +--------+----------------------------------------------------------
// | Images |
// +--------+

/**
 * Delete an image.  Calls the callback with either true or false
 * and an optional error.
 */
module.exports.deleteImage = function(userid, imageid, callback) {
  // Sanitize the inputs
  userid = sanitize(userid);
  imageid = sanitize(imageid);

  // Make sure that they are valid ids (all numbers).
  if (isNaN(userid)) {
    callback(false, "Invalid userid: " + userid);
    return;
  }
  if ((!imageid) || (isNaN(imageid))) {
    callback(false, "Invalid imageid: " + imageid);
    return;
  }

  // Make sure that the user owns the image
  var getUser = "SELECT userid FROM images WHERE imageid=" + imageid + ";";
  console.log("getUser", getUser);
  query(getUser, function(rows, err) {
    console.log("rows",rows,"err",err);
    if (err) {
      callback(false,err);
      return;
    } // if (err)
    if (rows.length == 0) {
      callback(false,"No such image: " + imageid);
      return;
    }
    if (rows[0].userid != userid) {
      callback(false,"User " + userid + " does not own image " + imageid);
      return;
    }
    // Okay, the user owns the image.  Delete everything related to
    // the image (in order).
    var queries = [
      "DELETE FROM albumContents WHERE imageid=" + imageid,
      "DELETE FROM comments WHERE onImage=" + imageid,
      "DELETE FROM images WHERE imageid=" + imageid
    ];
    querySequenceAll(queries, callback);
  }); // query(getUser,...)
}; // deleteImage

/**
 * Delete an image.
 * DEPRECATED.  This deletes things in the wrong order, which would violate constraints.  It also seems
 * to delete comments even if it fails to delete the image.
 */
module.exports.deleteImageOld = (function (userid, imageid, callback) {
  // Sanitize the inputs
  userid=sanitize(userid);
  imageid=sanitize(imageid);
  module.exports.query("DELETE FROM images WHERE imageid='" + imageid + "' AND userid= '" + userid + "';", function (rows, error){
    if (error) {
      callback(null, error);
      return;
    }
    module.exports.query("DELETE FROM albumContents WHERE imageid='" +imageid + "';", function (success, error){
      if (error)
        callback(null, error);
      else
        module.exports.query("DELETE FROM comments WHERE onImage='" + imageid + "';",function(success, error){
          if (error)
              callback(error);
          else
            callback(success, null);
        });
    });
  });
});

/*
  Procedure:
    imageExists(userid, checkString);
  Purpose:
    Checks to see if an image with the given string as a title exists 
    for the user
  Parameters:
    userid, the userid of the current session user
    checkstring, a string containing a desired title for an image
    callback(exists), a function describing what to do with the result
  Produces:
    exists, a BOOLEAN result
  Pre-conditions:
    [None]
  Post-conditions:
    [None]
 */
module.exports.imageExists = (function(userid, checkString, callback){
  checkstring = sanitize(checkString); // Always sanitize user input.
  // check if string is a username
  module.exports.query("SELECT title FROM images WHERE title = '" + checkString + "'AND userid = " + userid + ";", function (rows, error){
    if (!rows[0]){ // string is not a username
      callback(false);
    }
    // username exists
    else callback(true);
  });
}); // database.imageExists(userid, checkString, callback(exists));

/**
 * Get the title, code, username, modification date, rating, and more
 * for an image.  If it finds the information, calls `callback(info,null)`.
 * Otherwise, calls `callback(null,error)`.
 */    
module.exports.imageInfo=(function(imageid, callback) {
  imageid=sanitize(imageid);
  module.exports.query("SELECT images.title, images.code, users.username, images.modifiedAt, images.rating, images.imageid, images.userid, images.featured FROM images, users WHERE images.imageid= '" + imageid + "' and images.userid = users.userid;", function (rows, error){
    if (error)
      callback(null, error);
    else if (!rows[0])
      callback(null, "ERROR: Image does not exist.");
    else
      callback(rows[0], null);
  });
});

// +-----------+-------------------------------------------------------
// | Workspace |
// +-----------+

/*
  Procedure:
    database.wsExists(userid, checkString, callback(exists));
  Purpose:
    Checks to see if a workspace with the given string as a name exists 
    for the user
  Parameters:
    userid, the userid of the current session user
    checkstring, a string containing a desired name for a workspace
    callback(exists), a function describing what to do with the result
  Produces:
    exists, a BOOLEAN result
  Pre-conditions:
    [None]
  Post-conditions:
    [None]
*/
module.exports.wsExists = (function(userid, checkString, callback) {
  checkstring = sanitize(checkString); // Always sanitize user input.
  // check if string is a username
  module.exports.query("SELECT name FROM workspaces WHERE name = '" + checkString + "'AND userid = " + userid + ";", function (rows, error) {
    if (!rows[0]) { // string is not a username
      callback(false);
    }
    // username exists
    else callback(true);
  });
}); // database.wsExists(userid, checkString;

// +---------------+---------------------------------------------------
// | Cookie Tokens |
// +---------------+

/* Cookie token getter/setter */
module.exports.setToken = (function (userid, token, callback){
  module.exports.query("UPDATE users SET token='" + token +"' WHERE userid='" + userid + "';", function(result, error){
    if (error){
      callback(false, error);
    }
    else {
      callback(true, null);
    }
  });
});

module.exports.checkToken = (function (userid, token, callback){
  module.exports.query("SELECT token FROM users WHERE userid='" + userid + "';", function(result, error){
    if (error){
      callback(false, error);
    }
    else if(result[0] != null) {
      if (result[0].token === token){
        callback(true, null);
      }
      else {
        callback(false, "Token does not match.");
      }
    }
    else {
      callback(false, "No session token");
    }
  });
});
