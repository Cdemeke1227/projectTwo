var db = require("../models");
var getCustomer = require('./customer-api.js');
var getService = require('./services-api-routes.js')
var exports = module.exports = {};
//Sets viewBuilder as global so it can be access by all routes
var viewBuilder = {};
exports.Welcome = function(req,res, next){
    if(req.user){
        res.redirect('/home/' + req.user.userType + '/' + req.user.id)
    }else {
        res.redirect('/home');
    }
    
}

exports.home = function(req, res){

    viewBuilder = {
        LoggedIn : false,
        messageLogIn : req.flash('logInMessage'), 
        messageSignIn: req.flash('signUpMessage'),
        messagesettingsMessage: req.flash('settingsMessage'),
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
        //Doing this to keep our site routing look clean 
        //If you have a new htmlRoute please build it here and in handlebars do a 'if LoggedIn statement' with the links
        viewBuilder.homeRoute = '/home/'+req.user.userType+'/'+req.user.id;
        viewBuilder.aboutRoute = '/about/'+req.user.userType+'/'+req.user.id;
        viewBuilder.scheduleRoute = '/schedule/'+req.user.userType+'/'+req.user.id;
        viewBuilder.updateRoute = "/update/" + req.user.userType + "/" + req.user.id

        if(req.user.userType === 'admin'){
            viewBuilder.admin = true;
        }
    };

    // console.log(viewBuilder);

    res.render('home', viewBuilder);

}

exports.about = function (req, res) {
    res.render('about', viewBuilder);
};




exports.provider = function (req, res) {

    getCustomer.AllInfo(function(err,clients){
        console.log(clients);
        viewBuilder.Customers = clients;
        console.log(viewBuilder);
        res.render('provider', viewBuilder);
    });

   
};


exports.service = function (req, res) {

    getService.AllServices(function(err,services){

        console.log(services);
        viewBuilder.Services = services;
        
        res.render('service', viewBuilder)
    })
    

};






exports.bookings = function (req, res) {
    db.Appointments.findAll({
        // include: [db.Providers]
    }).then(function (dbBooking) {
        console.log(dbBooking);
        //Not sure what this is supposed to render
        res.render('schedule', viewBuilder);
    });
  
};






exports.schedule = function (req, res) {
    db.Schedules.findAll({
        include: [db.Providers]
    }).then(function (dbProvider) {
        console.log(dbProvider);
        res.render('schedule', viewBuilder);
    });
  
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
        console.log(dbstylist);
        console.log(services[0]);
        //Not sure what this is supposed to render
        res.redirect(req.currentUrl)
    });
};

