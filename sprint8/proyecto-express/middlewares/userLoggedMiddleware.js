const db = require('../database/models');
function userLoggedMiddleware(req, res, next) {
    //console.log('-----------1> ', req.cookies.userEmail);
    if (req.cookies.userEmail){
        db.Users.findOne({
            raw: true,
            where: {
                email: req.cookies.userEmail
            }
        })
        .then(function (userFromCookie) {
            //console.log('-----------2> ', userFromCookie); 
            delete userFromCookie.password;
            //console.log('-----------3> ', userFromCookie);
            req.session.userLogged = userFromCookie;                     
        }) 
    }

    //let emailInCookie = req.cookies.userEmail;
    // db.Users.findOne({
    //      where: {
    //         raw: true,
    //         email: req.cookies.userEmail
    //      }
    //     })
    //     .then(function(response){
            res.locals.isLogged = false;
            //console.log('>>>>> userLoggedMiddleware | ');
            // if (response) {
            //     res.locals.isLogged = userFromCookie;
            // }        
            if (req.session && req.session.userLogged){
                res.locals.isLogged = true;
                res.locals.userLogged = req.session.userLogged;
            }            
        // })
    // if (userFromCookie) {
    //     res.locals.isLogged = userFromCookie;
    // }

    // if (req.session && req.session.userLogged){
    //     res.locals.isLogged = true;
    //     res.locals.userLogged = req.session.userLogged;
    // }
    next();
}
module.exports = userLoggedMiddleware;