var db = require("../models");

var exports = module.exports = {};

    exports.update = function(req,res){
        console.log(req.params.userType);

        //Depending on which user type is being updated you'll know which database to update

        if(req.params.userType === 'customer'){
         
        }else {

        };

        //After user saves settings redirect to homepage

        //I have to do another authentication with passport so it will not update the information right away on the backend, but you should still be able to update the database
        // res.redirect(307, '/customer/update')
    }