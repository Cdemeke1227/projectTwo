var db = require("../models");

module.exports = function(app) {
  app.get("/api/appointments", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, db.Providers & db.Customers
    db.Providers.findAll({
      include: [db.Providers, db.Customers]
    }).then(function(dbAppointment) {
      res.json(dbAppointment);
    });
  });

  

  app.post("/api/appointment", function(req, res) {
    db.Appointments.create(req.body).then(function(dbAppointment) {
      res.json(dbAppointment);
    });
  });

  app.delete("/api/appointmen/:id", function(req, res) {
    db.Appointments.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbAppointment) {
      res.json(dbAppointment);
    });
  });

};
