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


  // schedule route loads schedule.handlebar view
  app.get("/customer/schedule", function (req, res) {
    console.log("showing customer appointment scheduler");
    res.render("schedule");
  });

  // about route loads about.handlebar view
  app.get("/about", function (req, res) {

    res.render("about");
  });

  // about provider loads provider.handlebar view 
  app.get("/provider", function (req, res) {

    res.render("provider");
  });

  // service route loads service.handlebar view
  app.get("/service", function (req, res) {

    res.render("service");
  });


};
