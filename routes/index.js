var express = require('express');
var passport = require('passport');
var router = express.Router();

// show the signin form
router.get('/', function(req, res, next) {
  res.render('sign-in', { loggedIn: false, message: req.flash('signInMessage') });
});

// process the signin form
router.post('/sign-in', passport.authenticate('local-sign-in', {
    successRedirect : '/home', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// show the signup form
router.get('/sign-up', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('sign-up', { message: req.flash('signUpMessage') });
});

// process the signup form
router.post('/sign-up', passport.authenticate('local-sign-up', {
    successRedirect : '/home', // redirect to the secure profile section
    failureRedirect : '/sign-up', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));


// have to be logged in to visit
router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', {
        user : req.user, // get the user out of session and pass to template
        navbar: true
    });
});


router.get('/sign-out', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/home', isLoggedIn, function(req, res, next) {
  res.render('index', { navbar: true });
});

router.get('/fruit', isLoggedIn, function(req, res, next) {
  res.render('fruit', { navbar: true });
});

router.get('/general-questions', isLoggedIn, function(req, res, next) {
  res.render('general-questions', { navbar: true });
});

module.exports = router;

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
