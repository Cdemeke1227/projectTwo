var db = require("../models");

module.exports = function(app) {
  app.get("/api/customers", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Appointments
    db.Customers.findAll({
      include: [db.Appointments]
    }).then(function(dbcustomer) {
      res.json(dbcustomer);
    });
  });

  app.get("/api/customer/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Appointments
    db.Customers.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Appointments]
    }).then(function(dbcustomer) {
      res.json(dbcustomer);
    });
  });

  app.post("/api/customer", function(req, res) {
    db.Customers.create(req.body).then(function(dbcustomer) {
      res.json(dbcustomer);
    });
  });

  app.delete("/api/customer/:id", function(req, res) {
    db.Customers.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbcustomer) {
      res.json(dbcustomer);
    });
  });

  // PUT route for updating customer details
  app.put("/api/customer", function(req, res) {
    db.Customers.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbCustomers) {
      res.json(dbCustomers);
    });
  });

};
