// *********************************************************************************
//                      controllers/services-api-routes.js 
//  This file offers a set of function for retrieving and updating data in services
// *********************************************************************************

// Dependencies
// =============================================================

var db = require("../models");

var exports = module.exports = {};

  // This functions gets all the services from the database and passes back through a callback
  exports.AllServices = function(cb){

      db.Services.findAll().then(function (dbService) {
        if(dbService.length > 0){
          var services = [];
          for(var i = 0; i < dbService.length; i++){
              var servicesObj = {
                service: dbService[i].dataValues
              };

              services.push(servicesObj);
          };

          console.log(services);
          return cb(null,services);
        }else {
          cb(false);
        }
  
        
      });

  }


  // This function will retrieve the needed information through the data arguement to update a Service from the database
  exports.update = function(data,cb){

  }

              //IF WE HAVE TIME
  // This function will get the needed information about a Service and remove it from the database 

  exports.removeService = function(data,cb){

  }