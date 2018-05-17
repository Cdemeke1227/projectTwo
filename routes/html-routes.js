// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var goTo = require('../controllers/main-controller.js');

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.
    //For any route that requires a user to be logged in simply add isLoggedIn before you call the function to goTo.somefunction
  //When users visit the page 
  app.get('/',goTo.Welcome);


  //When users go to the home page

  app.get('/home/:userType?/:id?', goTo.home)

  //When users go to the about page

  app.get('/about/:userType?/:id?', goTo.about)


  // schedule route loads schedule.handlebar view and makes sure the user is logged in before they can access the page
  app.get("/schedule/:userType?/:id?",isLoggedIn, goTo.schedule);

// service route loads service.handlebar view
  app.get("/service", goTo.service);


  // EVERYTHING UNDER HERE WILL BE UPDATED




  // about provider loads provider.handlebar view 
  app.get("/provider",goTo.provider);



  app.get("/api/stylist/:id", goTo.stylist);


  app.get("/bookings", goTo.bookings);

  function isLoggedIn(req, res, next) {
 
    if (req.isAuthenticated())

        return next();
    //Redirects home with a loginMessage flash message
    req.flash('logInMessage',"Please Log in to access that option");

    res.redirect('/');

}

  function isAdmin(req, res, next) {
 
    if (req.isAuthenticated() && req.user.admin === true)


      return next();
  //Redirects home with a loginMessage flash message
    req.flash('logInMessage',"Yikes");

    res.redirect('/');

}
};
