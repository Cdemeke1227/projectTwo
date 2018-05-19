// *********************************************************************************
//                      controllers/services-api-routes.js 
//  This file offers a set of function for retrieving and updating data in services
// *********************************************************************************

// Dependencies
// =============================================================

var db = require("../models");

var exports = module.exports = {};

  // This functions gets all the services, this also includes the Providers who offer that service, from the database and passes back through a callback
  exports.AllServices = function(data, cb){
    console.log(data);
    var query = {}

      if(data.specific === 'service'){
        if(data.service_name){
          query.where = {
            service_name: data.service_name
          };
        }
      }else if(data.specific === 'provider'){
        if(data.provider_id){
          query.where = {
            provider_id : data.provider_id
          };
        };
      }

    if(data.groupBy){
      query.group = data.groupBy
    };

      query.include = [db.Providers];
      console.log(query);
      db.Services.findAll(query).then(function (dbService) {
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
          cb({message: "There was an error finding what you're looking for. Please check your queries if they exists in the database."});
        }
  
        
      });

  }

  exports.OneService = function(serviceName,cb){
      db.Services.findAll({
        where: {
          service_name: serviceName
        },
        include: [db.Providers]
      }).then(function(dbService){
          return cb(null,dbService);
      });
  };


  exports.providerServices = function(providerID, cb){
    var query = {
      provider_id: providerID
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