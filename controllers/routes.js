var exports = module.exports = {};

    exports.home = function(req,res){
        res.render('home', {LoggedIn : false, messageLogIn : req.flash('logInMessage'), messageSignIn: req.flash('signUpMessage')});
    };

    exports.loggedIn = function(req,res){
        console.log(req.user);

        var firstName = req.user.firstName;
        var lastName = req.user.lastName;
        var email = req.user.email;
        var phone = req.user.phone;
        var notes = req.user.notes;
        var photoLink = req.user.photoLink;
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

