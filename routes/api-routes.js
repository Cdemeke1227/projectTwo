module.exports = function(app,passport){



    //Register
    app.post('/users/register', passport.authenticate('local-signup',{
        successRedirect: "/home/customer",
        failureRedirect: '/home'

    }))

    //Log in
    app.post('/users/login', passport.authenticate('local-signin', {
        successRedirect: '/home/customer',
 
        failureRedirect: '/home'
    }
 
));
}