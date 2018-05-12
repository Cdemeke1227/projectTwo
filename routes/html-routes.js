// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    
    res.render("index");
  });
  
    //Register Render
    app.get('/register', function(req,res, next){
      res.render('register', {success : false});

  });

  //Log in renger
  app.get('/login', function(req,res){
      res.render('login');
  });

};
