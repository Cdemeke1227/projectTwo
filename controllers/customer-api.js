var db = require("../models");

var exports = module.exports = {};

    exports.update = function(req,res){
        console.log(req.params.userType);

        //Depending on which user type is being updated you'll know which database to update

        if(req.params.userType === 'customer'){
            console.log("!!!!!!!!!!!!!!!!!!!!!");
            res.redirect(307, '/customer/update')
        }else {
            res.redirect(307, '/admin/update')
        };

        //After user saves settings redirect to homepage

        
        //I have to do another authentication with passport so it will not update the information right away on the backend, but you should still be able to update the database
        
    }

    exports.AllInfo = function(cb){
        db.Customers.findAll().then(function(dbCustomers){
            console.log(dbCustomers);
            if(dbCustomers.length > 0){
                var customers = [];
                for(var i =0; i < dbCustomers.length; i++){
                    dbCustomers[i].dataValues.modalID ="#settings" + dbCustomers[i].id + "Modal";
                    dbCustomers[i].dataValues.ModalID = "settings" + dbCustomers[i].id + "Modal";
                    var customerObj = {
                        customer: dbCustomers[i].dataValues};
    
                    customers.push(customerObj);
                }
                console.log(dbCustomers[0].dataValues);
                console.log(dbCustomers[1].dataValues);
                console.log(customers);
                return cb(null,customers);
            }
     
        });

    }