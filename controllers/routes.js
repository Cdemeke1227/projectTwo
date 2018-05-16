var db = require("../models");

var exports = module.exports = {};

exports.Welcome = function(req,res, next){
    if(req.user){
        res.redirect('/home/' + req.user.userType + '/' + req.user.id + '/' + req.user.firstName + '/' + req.user.lastName)
    }else {
        res.redirect('/home');
    }
    
}

exports.home = function(req, res){

    var viewBuilder = {
        LoggedIn : false,
        messageLogIn : req.flash('logInMessage'), 
        messageSignIn: req.flash('signUpMessage'),
        admin: false
    }


    if(req.user){
        viewBuilder.LoggedIn = true;
        viewBuilder.userId = req.user.id;
        viewBuilder.firstName = req.user.firstName;
        viewBuilder.lastName = req.user.lastName;
        viewBuilder.email = req.user.email;
        viewBuilder.phoneNumber = req.user.phone;
        viewBuilder.notes = req.user.notes;
        viewBuilder.photoLink = req.user.photoLink;
        viewBuilder.userType = req.user.userType;
        viewBuilder.updateRoute = "/update/" + req.user.userType + "/" + req.user.id

        if(req.user.userType === 'admin'){
            viewBuilder.admin = true;
        }
    };

    console.log(viewBuilder);

    res.render('home', viewBuilder);

}

// EVERYTHING UNDER HERE WILL BE UPDATED!!!!
exports.appointment = function (req, res) {
   
    res.render('appointments');
};


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




    
    exports.schedule = function(req,res){
        res.render('schedule');
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