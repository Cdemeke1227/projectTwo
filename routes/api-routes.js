module.exports = function(app,passport){



    //Register
    app.post('/users/register', passport.authenticate('local-signup',{
        failureRedirect: '/',
        failureFlash: true,

    }),
    function(req,res){
        console.log(req.user);
    
        res.redirect('/home/customer/' + req.user.firstName + "/" + req.user.lastName)
    });

    //Log in
    app.post('/users/login', passport.authenticate('local-signin', {
        failureRedirect: '/',

        failureFlash: true
        
    }),
        function(req,res){
        console.log(req.user);

        res.redirect('/home/customer/' + req.user.firstName + "/" + req.user.lastName)
    });
}