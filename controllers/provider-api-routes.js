var db = require("../models");

module.exports = function(app) {
  app.get("/api/providers", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Services
    db.Providers.findAll({
      include: [db.Services, db.Schedules]
    }).then(function(dbProvider) {
      res.json(dbProvider);
    });
  });

  app.get("/api/provider/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Services
    db.Providers.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Services, db.Schedules]
    }).then(function(dbProvider) {
      res.json(dbProvider);
    });
  });

  app.post("/api/provider", function(req, res) {
    db.Providers.create(req.body).then(function(dbProvider) {
      res.json(dbProvider);
    });
  });

  app.delete("/api/provider/:id", function(req, res) {
    db.Providers.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbProvider) {
      res.json(dbProvider);
    });
  });

  // PUT route for updating Provider details
  app.put("/api/provider", function(req, res) {
    db.Providers.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbProviders) {
      res.json(dbProviders);
    });
  });

};
