var exports = module.exports = {};

    exports.home = function(req,res){
        res.render('home', {LoggedIn : false});
    };

    exports.loggedIn = function(req,res){
        res.render('home', {LoggedIn : true});
    };
    
    exports.schedule = function(req,res){
        res.render('schedule');
    };

    exports.about = function(req,res){
        res.render('about');
    };

    exports.provider = function(req, res){
        res.render('provider');
    };

    exports.service = function(req,res){
        res.render('service');
    };

