var db = require("../models");

module.exports = function(app) {
  app.get("/api/schedules", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Services
    db.Providers.findAll({
      include: [db.Providers]
    }).then(function(dbSchedules) {
      res.json(dbSchedules);
    });
  });

  

  app.post("/api/schedule", function(req, res) {
    db.Schedules.create(req.body).then(function(dbSchedules) {
      res.json(dbSchedules);
    });
  });

  app.delete("/api/schedule/:id", function(req, res) {
    db.Schedules.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbSchedules) {
      res.json(dbSchedules);
    });
  });

};
