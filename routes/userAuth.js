module.exports = function(app,passport){



    //Register
    app.post('/users/register', passport.authenticate('local-signup',{
        failureRedirect: '/',
        failureFlash: true,

    }),
    function(req,res){
    
        res.redirect('/home/user/' + req.user.id + "/" + req.user.firstName + "/" + req.user.lastName)
    });

    //Log in
    app.post('/users/login', passport.authenticate('local-signin', {
        failureRedirect: '/',

        failureFlash: true
        
    }),
        function(req,res){
        console.log(req.user);

        res.redirect('/home/user/' + req.user.id + "/" + req.user.firstName + "/" + req.user.lastName)
    });


    //Update Customer

    app.post('/customer/update', passport.authenticate('local-update',{
        failureRedirect: '/',
        failureFlash: true,
        successFlash: true
    }),
        function(req,res){
            res.redirect('/home/user/' + req.user.id + "/" + req.user.firstName + "/" + req.user.lastName)
        });
}