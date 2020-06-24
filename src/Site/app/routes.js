/**
 * app/routes.js
 *   Information on mapping various URLs to functions or files.
 */

// +-----------------------------+-------------------------------------
// | Additional Javascript Files |
// +-----------------------------+

var api = require("../functions/api.js");

// +-----------+-----------------------------------------------------
// | Utilities |
// +-----------+

/**
 * Send a file with an optional suffix.
 */
function sendFileWithSuffix(res,path,suffix) {
  res.sendfile(path, function(err) {
    if (err) {
      // console.log("First response: " + err);
      res.sendfile(path + suffix, function(err) {
        // console.log("Second response: " + err);
        if (err) {
          res.send(404,'');
        }
      });
    }
  });
}

// +---------+-------------------------------------------------------
// | Exports |
// +---------+

module.exports = function(app,database) {

  // --------------------------------------------------
  // Path: /
  //   HOME PAGE
  app.get('/', function(req, res) {
    res.render('create',{
      user: req.session.user
    });
  });

  // --------------------------------------------------
  // Path: /api
  //   Dynamic content distribution - return raw data through AJAX
  //   Removing this makes the lines laggy
  app.post('/api', function(req,res) { api.run(req.body, req, res); });
  app.get('/api', function(req,res) { api.run(req.query, req, res); });

  // --------------------------------------------------
  // Path: /css
  //   Distribute CSS files
  app.get('/css/:file', function(req,res) {
    sendFileWithSuffix(res, './public/css/' + req.params.file, '.css');
  });

  // --------------------------------------------------
  // Path: /js
  //   Distribute client-side Javascript files
  app.get('/js/:file', function(req,res) {
    sendFileWithSuffix(res, './public/js/' + req.params.file, '.js');
  });
};
