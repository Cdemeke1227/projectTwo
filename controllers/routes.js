var db = require("../models");

var exports = module.exports = {};

exports.home = function (req, res) {
    res.render('home', {
        LoggedIn: false
    });
};

exports.appointment = function (req, res) {
   
    // res.render('appointments');
};
// exports.loggedIn = function (req, res) {
//     res.render('home', {
//         LoggedIn: true
//     });
// };

exports.schedule = function (req, res) {
    db.Schedule.findAll({
        include: [db.Providers]
    }).then(function (dbProvider) {
        res.json(dbProvider);

    });
    // res.render('schedule');
};

exports.bookings = function (req, res) {
    db.Appointments.findAll({
        // include: [db.Providers]
    }).then(function (dbBooking) {
        res.json(dbBooking);

    });
    // res.render('schedule');
};

exports.about = function (req, res) {
    res.render('about');
};

exports.provider = function (req, res) {
    db.Providers.findAll({
        include: [db.Services]
    }).then(function (dbProvider) {
        res.json(dbProvider);

    });

    // res.render('provider')
};

exports.service = function (req, res) {

    db.Services.findAll({
        include: [db.Providers]
    }).then(function (dbService) {
        res.json(dbService);

    });

    res.render('service')


};

exports.stylist = function (req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Providers.findOne({
        where: {
            id: req.params.id
        },
        include: [db.Services]
    }).then(function (dbstylist) {
        res.json(dbstylist);
        console.log(services[0]);
    });
};

exports.customer = function (req, res) {

    db.Customers.findAll({
        
    }).then(function (dbService) {
        res.json(dbService);

    });

    // res.render('customer')
    
    

};