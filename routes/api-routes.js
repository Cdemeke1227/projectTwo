// Dependencies
// =============================================================
var goTo = require('../controllers/main-controller.js');

module.exports = function(app){

    //Post route to update appointments
    app.post('/appointment/update/:id', goTo.updateAppointment);


    //Post route to create a new appointment
    app.post('/appointment/new', goTo.createAppointment);


    //Post Route to create a new provider
}


var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

    // GET route for getting all of the services
    app.get("/api/services", function (req, res) {
        var query = {};
        if (req.query.providers_id) {
            query.ProvidersId = req.query.providers_id;
        }
        // 1. Add a join here to include all of the Providers to these services
        db.Services.findAll({
            where: query,
            order: ['category','price']
        }).then(function (dbServices) {
            res.json(dbServices);
        });
    });


    // Get route for retrieving a single Service
    app.get("/api/services/:id", function (req, res) {
        // 2. Add a join here to include the Provider who wrote the Services
        db.Services.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (dbServices) {
            console.log(dbServices);
            res.json(dbServices);
        });
    });

    app.get("/api/providers", function (req, res) {
        // Here we add an "include" property to our options in our findAll query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Services
        db.Providers.findAll({
            include: [db.Services, db.Schedules]
        }).then(function (dbProvider) {
            res.json(dbProvider);
        });
    });

    //     app.post('/update/:userType/:userId', customerAction.update)
}

//////////////////////////////////////
//Seed data for Services Model

// db.Services.create(
//     { category: 'Cuts', service_name: "Men's Cut and Style", description: "Scissor, razor or shears cut and style", duration: "00:30:00", price: "30", created_at: new Date(Date.UTC(Date)), updated_at: new Date(Date.UTC(Date)) })
//     .then( service =>{
//         console.log(service.category);
//         console.log(service.service_name);
//         console.log(service.price);
//     });

    // { category: 'Cuts', service_name: "Women's Cut and Style", description: "Scissor cut and style", duration: "00:30:00", price: "65" },
    // { category: 'Cuts', service_name: "Child's Cut and Style", description: "Scissor, razor or shears cut and style", duration: "00:30:00", price: "20" },
    // { category: 'Color', service_name: "Full Color", description: "Scalp to end - long hair or short", duration: "02:00:00", price: "120" },
    // { category: 'Color', service_name: "Re-growth Color", description: "Roots - top of crown", duration: "01:30:00", price: "40" },
    // { category: 'Color', service_name: "Highlights", description: "Full foils throughout", duration: "01:30:00", price: "115" },
    // { category: 'Color', service_name: "Partial Highlights", description: "Top of crown and face framing", duration: "01:30:00", price: "65" },
    // { category: 'Revive', service_name: "Deep Condition", description: "Intense condition and heat for healing", duration: "01:00:00", price: "55" },
    // { category: 'Revive', service_name: "4 Step Healing Rejuvenation", description: "4 step cleanse, nourish, hydrate, condition", duration: "01:00:00", price: "75" }

