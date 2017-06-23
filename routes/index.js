var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sign-in', { loggedIn: false });
});

router.get('/home', function(req, res, next) {
  res.render('index', { loggedIn: true });
});

router.get('/fruit', function(req, res, next) {
  res.render('fruit', { loggedIn: true });
});

router.get('/general-questions', function(req, res, next) {
  res.render('general-questions', { loggedIn: true });
});

module.exports = router;
