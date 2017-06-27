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
  var doctor = isDoctor(req);
    res.render('profile', {
        user : req.user,
        navbar: true,
        doctor: doctor
    });
});


router.get('/sign-out', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/home', isLoggedIn, function(req, res, next) {
  var doctor = isDoctor(req);
  res.render('index', { 
    user : req.user,
    navbar: true,
    doctor: doctor
  });
});

router.get('/doctor-home', isLoggedIn, function(req, res, next) {
  var doctor = isDoctor(req);
  if (doctor) {
    res.render('doctor-home', { 
      user : req.user,
      navbar: true,
      doctor: doctor
    });
  } else {
    res.redirect('/home');
  }
});

router.get('/fruit-questions', isLoggedIn, function(req, res, next) {
  var doctor = isDoctor(req);
  res.render('fruit-questions', { 
    navbar: true,
    user : req.user,
    doctor: doctor
  });
});

router.get('/general-questions', isLoggedIn, function(req, res, next) {
  var doctor = isDoctor(req);
  res.render('general-questions', { 
    navbar: true,
    user : req.user,
    doctor: doctor
  });
});

router.get('/math-questions', isLoggedIn, function(req, res, next) {
  var doctor = isDoctor(req);
  res.render('math-questions', { 
    navbar: true,
    user : req.user,
    doctor: doctor
  });
});

router.get('/memory-game', isLoggedIn, function(req, res, next) {
  var doctor = isDoctor(req);
  res.render('memory-game', { 
    navbar: true,
    user : req.user,
    doctor: doctor
  });
});

router.get('/thank-you', isLoggedIn, function(req, res, next) {
  var doctor = isDoctor(req);
  res.render('thank-you', { 
    navbar: true,
    user : req.user,
    doctor: doctor
  });
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

function isDoctor(req) {
    if (req.user.local.role === "doctor") {
      return true;
    }
    return false;
}