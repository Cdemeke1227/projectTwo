// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the services
  app.get("/api/services", function(req, res) {
    var query = {};
    if (req.query.providers_id) {
      query.ProvidersId = req.query.providers_id;
    }
    // 1. Add a join here to include all of the Providers to these services
    db.Services.findAll({
      where: query
    }).then(function(dbServices) {
      res.json(dbServices);
    });
  });

  // Get route for retrieving a single Service
  app.get("/api/services/:id", function(req, res) {
    // 2. Add a join here to include the Provider who wrote the Services
    db.Services.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbServices) {
      console.log(dbServices);
      res.json(dbServices);
    });
  });

  // Services route for saving a new Services
  app.Services("/api/services", function(req, res) {
    db.Services.create(req.body).then(function(dbServices) {
      res.json(dbServices);
    });
  });

  // DELETE route for deleting services
  app.delete("/api/services/:id", function(req, res) {
    db.Services.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbServices) {
      res.json(dbServices);
    });
  });

  // PUT route for updating services
  app.put("/api/services", function(req, res) {
    db.Services.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbServices) {
      res.json(dbServices);
    });
  });
};
