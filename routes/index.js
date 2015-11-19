var express = require('express');
var router = express.Router();
var passport = require('passport');

var mongoose = require('mongoose');
var User = require('../models/user');
//var Businesscontact = require('../models/businesscontact');


//////////----
/* Render home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Home',
        displayName: req.user ? req.user.displayName : ''
    });
});

/* Render Login page. */
router.get('/login', function (req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/users');
    }
});

/* Process the Login Request */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/users',
    failureRedirect: '/login',
    failureFlash: true
}));

/* Show Registration Page */
router.get('/register', function (req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/');
    }
});

/* POST signup data. */
router.post('/register', passport.authenticate('local-registration', {
    //Success go to Profile Page / Fail go to Signup page
    successRedirect : '/users',
    failureRedirect : '/register',
    failureFlash : true
}));


/* Process Logout Request */
router.get('/logout', function (req, res){
  req.logout();
  res.redirect('/');
});


//////////----




/* Getting home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index'); 
});
*/
/* Getting about us page */
router.get('/about', function(req, res, next) {
   res.render('about'); 
});

/* Getting Projects page */
router.get('/projects', function(req, res, next) {
   res.render('projects'); 
});

/* Getting Services page */
router.get('/services', function(req, res, next) {
   res.render('services'); 
});

/* Getting contact page */
router.get('/contact', function(req, res, next) {
   res.render('contact'); 
});
module.exports = router;
