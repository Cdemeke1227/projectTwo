var db = require("../models");

module.exports = function(app){
    //Register
    app.post('/users/register', function(req,res){


        console.log(db.Account);
        db.Account.create({
            name: req.body.name.body,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password

        }).then(function(dbAccounts){
                // res.json(dbAccounts);
            });
    });

}
