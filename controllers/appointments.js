// *************************************************************************************************
//                              controllers/appointments.js  
//      This file will contain all the functions required to update or make appointments 
//                          
//
//     
// *************************************************************************************************


var db = require("../models");


var exports = module.exports = {};

    //This function will gather all the appointments and return it through a callbac
    exports.viewAllAppointments = function(cb){
        //NOTES this should have
        // Schedule
        // Providers
        // Appointments
        db.Schedules.findAll({
            include: [{all:true}]
              }).then(function(dbSchedules) {
                return cb(null,dbSchedules);
              });

    };
    //This function will get the required information from the data object argument then update the Appointment, and then will pass back wether it failed or succeeded through the callback
    exports.update = function(data,cb){
        var appointmentId = data.id;
        var startTime = data.startTime;
        var endTime = data.endTime;
        var duration = data.duration;

        db.Appointments.update({
            appointStart: startTime,
            appointEnd: endTime,
            duration: duration
        },{
            where: {
                id : appointmentId
            }
        }).then(function(affectedRows){
            return cb(null,affectedRows);
        })
    };

    //This function will gather the information needed from the data object arguement to create a new Appointment, and then will pass back wether it failed or succeeded through the callback

    exports.newAppointment = function(data,cb){

        var startTime = data.startTime;
        var endTime = data.endTime;
        var duration = data.duration;

        db.Appointments.create({
            appointStart: startTime,
            appointEnd: endTime,
            duration: duration
        }).then(function(affectedRows){
            return cb(null,affectedRows);
        })
    };

