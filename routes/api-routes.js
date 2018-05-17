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