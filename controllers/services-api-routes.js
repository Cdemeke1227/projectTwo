// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

var db = require("../models");

var exports = module.exports = {};

  exports.AllServices = function(cb){

      db.Services.findAll(
        // include: [db.Providers]
      ).then(function (dbService) {
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