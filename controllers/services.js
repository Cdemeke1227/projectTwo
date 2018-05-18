// *********************************************************************************
//                      controllers/services-api-routes.js 
//  This file offers a set of function for retrieving and updating data in services
// *********************************************************************************

// Dependencies
// =============================================================

var db = require("../models");

var exports = module.exports = {};

  // This functions gets all the services, this also includes the Providers who offer that service, from the database and passes back through a callback
  exports.AllServices = function(cb){

      db.Services.findAll({
        include: [db.Providers]
      }).then(function (dbService) {
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

  exports.OneService = function(serviceID,cb){
      db.Services.findOne({
        where: {
          id: serviceID
        },
        include: [db.Providers]
      }).then(function(dbService){
          return cb(null,dbService);
      });
  };


  exports.providerServices = function(providerID, cb){
    var query = {
      id: providerID
    };

      db.Services.findAll({
        where: query,
        include: [db.Providers]
      }).then(function(dbServices){
        return cb(null,dbServices)
      })
  }

  // This function will retrieve the needed information through the data arguement to update a Service from the database
  exports.updateService = function(data,cb){
    var serviceID = data.id;
    var serviceName = data.serviceName;
    var description = data.description;
    var duration = data.duration;
    var price = data.price;
    var photoLinks = data.photoLinks;

      db.Services.update({
        service_name: serviceName,
        description: description,
        duration: duration,
        price: price,
        photolinks: photoLinks
      },{
        where: {
          id: serviceID
        }
      }).then(function(affectedRows){
          return cb(null, affectedRows);
      })
  }


  // This function will get the needed information about a Service and remove it from the database 

  exports.removeService = function(data,cb){
    var serviceID = data.id;

      db.Services.destroy({
        where: {
          id: serviceID
        }
      }).then(function(affectedRows){
          return cb(null,affectedRows);
      });
      
  }

    //Function that creates a new service
    exports.newService = function(data,cb){

      db.Services.create(data).then(function(affectedRows){
        return cb(null,affectedRows);
      });
    };