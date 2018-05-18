//
// *************************************************************************************************
//                              controllers/rendering-controller.js  
//
//      THIS PAGE WILL HANDLE ANYTHING DEALING WITH GATHERING STATIC INFORMATION AND RENDERING 
//                              IT THROUGH TO THE HANDLEBARS
//
// *************************************************************************************************

var db = require("../models");
// Including the modules for Customers
var getCustomer = require('./customers.js');

//Including the modules for Services
var getService = require('./services.js')

//Including the modules for Providers
var getProviders = require("./provider.js");

//Including the modules for Appointments
var getAppointments = require('./appointments.js');

//Including the modules for Schedules
var getSchedules = require('./schedule.js')


var exports = module.exports = {};


//Sets viewBuilder as global so it can be access by all routes
var viewBuilder = {};

// This Function will handle logic for when users go to the path '/'
// This will figure out if there's a user already logged in by checking if(req.user) and redirect back to /home + the other params. If there's no user just redirect to /home
exports.Welcome = function(req,res, next){
    if(req.user){
        res.redirect('/home/' + req.user.userType + '/' + req.user.id)
    }else {
        res.redirect('/home');
    }
    
}


// This function will be the main function that buils the viewBuilder containing all the stuff we're going to need to render in views and will be created at the '/hjome' path
exports.home = function(req, res){
    //If there's no user logged in this will be the basic view builder
    viewBuilder = {
        LoggedIn : false,
        messageLogIn : req.flash('logInMessage'), 
        messageSignIn: req.flash('signUpMessage'),
        messagesettingsMessage: req.flash('settingsMessage'),
        admin: false
    };

    // If there is a user logged all of this will be added to viewBuilder
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

        //If a user is a Admin set the admin equal to true
        if(req.user.userType === 'admin'){
            viewBuilder.admin = true;
        }
    };

    // console.log(viewBuilder);

    res.render('home', viewBuilder);

}

// Handles for when user goes to the path '/about'
exports.about = function (req, res) {
    res.render('about', viewBuilder);
};




// Handles when users go to providers page!!!***THIS FUNCTION STILL NEEDS MORE INFORMATION TO BE GATHERED BEFORE IT CAN RENDER ALL STATIC INFORMATION ON THIS PAGE
exports.provider = function (req, res) {


    getCustomer.AllInfo(function(err,clients){
        console.log(clients);
        viewBuilder.Customers = clients;
        console.log(viewBuilder);
        res.render('provider', viewBuilder);
    });

   
};


// Handles when users go to services page!!!***THIS FUNCTION STILL NEEDS MORE INFORMATION TO BE GATHERED BEFORE IT CAN RENDER ALL STATIC INFORMATION ON THIS PAGE

exports.service = function (req, res) {

    res.render('service', viewBuilder);
    

};






exports.bookings = function (req, res) {
  };
    





exports.schedule = function (req, res) {
   //
    //This is were we get all services information
    // We make a call to the callback function AllServices located in the services.js module that we predefined as getService at the top
    getService.AllServices(function(err,services){
        if(err){

            //If there is an error getting All Services create a flash message
            req.flash('AllServiceError','There was an error with getting All Services');
            //Add the flash message to the viewBuilder
            viewBuilder.ErrorAllService = req.flash('AllServiceError');

        }else{

            //If there was no error continue on with the process
            console.log(services); //Logging so we can see the information we got before adding it to viewBuilder

            viewBuilder.Services = services;

            //Now we call on the function to get all the Providers joined with their Services
            getProviders.AllWithServices(function(err,data){
                if(err){

                    //If there was an error create a flash message for this error
                    req.flash('ProvidersAndServicesError','There was an error with getting Providers with their services');
                    //Add that flash message into viewBuilder
                    viewBuilder.ErrorProviderServ = req.flash('ProvidersAndServicesError');

                }else{
                    //If no error continue

                    console.log(data); //Console the data


                    viewBuilder.ProvAndServe = data;

                    //Schedule joined with Appointments, then right join with Providers

                    //Will do soon

                    // getSchedules.getWithAppRProv(function(err,data){
                    //     if(err){

                    //         res.flash('bigJoinError', "There was an error with this crazy join");

                    //         viewBuilder.ErrorCrazy = req.flash('bigJoinError');

                    //     }else{

                    //         console.log(data);

                    //         viewBuilder.ScheWAppRProv = data;


                    //     }
                    // })
                            //Now call function to get Providers with all their Schedules
                            getProviders.AllWithSchedules(function(err,data){
                                if(err){
        
                                    req.flash('ProvWithSchedError',"There was an error with getting Providers with their Schedules");
        
                                    viewBuilder.ErrorProvSched = req.flash('ProvWithSchedError');
                                }else {
        
                                    viewBuilder.ProvAndSchedules = data;
        
                                    //res.json is here so you can see the full object we're passing do res.render('schedule', viewBuilder) to pass it through
                                    // res.json(viewBuilder);
        
                                }
                            })
                }

        

                })
  
            };
        })
  
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


//
//
//  These functions below are functions that handle calls from the front end
//
//



exports.updateAppointment = function(req,res){
    var data = {
        id : req.params.id,
        startTime: req.body.id,
        endTime: req.body.endTime,
        duration: data.duration
    };
    getAppointments.update(data,function(results){
        console.log(results);

        res.redirect()
    })
};


exports.createAppointment = function(req,res){
    var data = {
        startTime: req.body.id,
        endTime: req.body.endTime,
        duration: data.duration
    };
    getAppointments.newAppointment(data,function(results){
        console.log(results);

        res.redirect()
    })
};