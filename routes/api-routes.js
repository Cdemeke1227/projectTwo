// Dependencies
// =============================================================
var goTo = require('../controllers/main-controller.js');
var servicesPack = require('../controllers/services.js');
var providersPack = require('../controllers/providers.js');

module.exports = function(app){
//
// ROUTES for SERVICES
//
    // GET route to get services within a range defined by the params range with providers who offer that service
    app.get('/retrieve/services/:something?/:id?',function(req,res){
        //So here I've built a call that can be used for multiple things depending on what you want to do.
        // The params are optional for when you want to get something specific about services
            // The something param (i didnt know what to name it sorry...) would either be provider or service (SINGULAR PLEASE)
            // The id param will either be the ID of the provider OR the ID of the service depending on the something param
            //IF YOU WANT TO
                // Get all services and providers that offer them -- leave the optional parameters empty
                // Get 1 specific type of service and providers that offer it -- '/retrieve/services/service/:serviceID'
                // Get all services that a specific provider offers -- '/retrieve/services/provider/:providerID'

        switch(req.params.something){
            case 'service':
                //Gets service by id and providers that offer that service
                servicesPack.OneService(req.params.id, function(results){
                    res.json(results);
                });
            break;
                //Gets all services that a specific provider offers
            case 'provider':
                servicesPack.providerServices(req.params.id, function(results){
                    res.json(results);
                });
            break;
            default:
                //Get all services and providers that offer them
                servicesPack.AllServices(function(results){
                res.json(results);
            });
            break;
        }
        
    
    });

    //PUT route to update service by ID
    app.put('/update/service/:id', function(req,res){
        //Build object to pass on to update service
        var data = {
            //Will be used to figure out which service we're updating will be retrieved from parameter
            serviceID: req.params.id,
            serviceName: req.body.serviceName,
            description: req.body.description,
            duration: req.body.duration,
            price: req.body.price,
            photoLinks: data.photoLinks
        };

        servicesPack.updateService(data,function(results){
            res.json(results);
        })
    })


    //POST route to create a new service

    app.post('/new/service', function(req,res){
        //Build the service data

        var data = {
            service_name: req.body.serviceName,
            description: req.body.description,
            duration: req.body.duration,
            price: req.body.price,
            photoLinks: data.photoLinks
        };

        servicesPack.newService(data,function(results){
            res.json(results);
        });
    });


    //DELETE route to delete service by ID
    app.delete('/delete/service/:id', function(req,res){
        //Get service id from params to delete service
        var data = {
            id : req.params.id
        };
        servicesPack.removeService(data,function(results){
            res.json(results);
        });
    });

//
// ROUTES for Providers **in progress**
//
        //This can use these queries
            // provider_id=
                //Providers ID
            // services=
                //yes or no to include with services or not
            // schedule=
                //yes or no to include with schedules or not
            // 
    //GET route to retrieve information about providers
    app.get('/revieve/providers', function(req,res){

    })
//
// Routes for APPOINTMENTS **in progress**
//
       
    //GET route to get appointments within a range defined by the queries 
    app.get('/recieve/appointments/', function(req,res){
        //
        // should only use the following query options **in progress**
    })
    //Post route to update appointments
    app.post('/appointment/update/:id', goTo.updateAppointment);


    //Post route to create a new appointment 
    app.post('/appointment/new/:id', goTo.createAppointment);

}



//////////////////////////////////////
//Seed data for Services Model

// db.Services.create(
//     { category: 'Cuts', service_name: "Men's Cut and Style", description: "Scissor, razor or shears cut and style", duration: "00:30:00", price: "30", created_at: new Date(Date.UTC(Date)), updated_at: new Date(Date.UTC(Date)) })
//     .then( service =>{
//         console.log(service.category);
//         console.log(service.service_name);
//         console.log(service.price);
//     });

    // { category: 'Cuts', service_name: "Women's Cut and Style", description: "Scissor cut and style", duration: "00:30:00", price: "65" },
    // { category: 'Cuts', service_name: "Child's Cut and Style", description: "Scissor, razor or shears cut and style", duration: "00:30:00", price: "20" },
    // { category: 'Color', service_name: "Full Color", description: "Scalp to end - long hair or short", duration: "02:00:00", price: "120" },
    // { category: 'Color', service_name: "Re-growth Color", description: "Roots - top of crown", duration: "01:30:00", price: "40" },
    // { category: 'Color', service_name: "Highlights", description: "Full foils throughout", duration: "01:30:00", price: "115" },
    // { category: 'Color', service_name: "Partial Highlights", description: "Top of crown and face framing", duration: "01:30:00", price: "65" },
    // { category: 'Revive', service_name: "Deep Condition", description: "Intense condition and heat for healing", duration: "01:00:00", price: "55" },
    // { category: 'Revive', service_name: "4 Step Healing Rejuvenation", description: "4 step cleanse, nourish, hydrate, condition", duration: "01:00:00", price: "75" }



// }
