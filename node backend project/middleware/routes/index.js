"use strict";

var express = require('express');
var router = express.Router();
var LocalStrategy = require('passport-local').Strategy;
var userCredentials = require('../models/user');
var dateTime = require('date-time');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user);
    })

    passport.deserializeUser(function(user, done) {
        done(null, user);
    })

    passport.use(new LocalStrategy(function(username, password, done) {
        process.nextTick(function() {
            userCredentials.findOne({
                'username': username,
            }, function(err, user) {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false);
                }

                if (user.password != password) {
                    return done(null, false);
                }

                return done(null, user);
            });
        });
    }));

    router.get('/login', function(req, res, next) {
        res.render('login');
    });

    router.post('/login', function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.redirect('/loginFailure');
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                var value;
                var id = user['_id'];
                var timeInMss = dateTime() + "";
                var update = {
                    $set: {
                        status: 'online'
                    }
                };
                var callback = function(err, data) {
                    if (err) return next(err);
                };
                userCredentials.findByIdAndUpdate({
                    _id: id
                }, {
                    $set: {
                        status: 'online',
                        'logintime': timeInMss
                    }
                }, callback);

                console.log('-------------------------' + req.user.username + ' is logged in ');
                req.session.save(function(err) {
                    if (err) {
                        next(err);
                    }
                });
                if (user.username === 'admin')
                    value = 'Admin';
                else
                    value = 'Users'
                return res.redirect('loginSuccess' + value);
            });
        })(req, res, next);
    });


    router.get('/logout', function(req, res, next) {
        var id = req.user['_id'];
        var timeInMss = dateTime() + "";
        var update = {
            '$set': {
                'status': 'offline',
                'logoutime': timeInMss
            }
        };
        var callback = function(err, data) {
            if (err) return next(err);
        };
        userCredentials.findByIdAndUpdate(id, update, callback);
        req.logout();
        res.redirect('login');
    })
    router.get('/loginFailure', function(req, res, next) {
        res.render('failed');
    })

    router.get('/loginSuccessAdmin', function(req, res, next) {
        res.render('admin');
    })
    router.get('/loginSuccessUsers', function(req, res, next) {
        res.render('users');
    })

    router.get('/loggedinUsers', function(req, res, next) {
				 var response={};
	userCredentials.find({
            status: 'online'
        }, function(err, data) {
                  if (err) {
                response = {
                    "error": true,
                    "message": "Error fetching data"
                };
            } else {
				if(JSON.stringify(data)==='[]')
				{
					response = {
                    "error": true,
                    "message": "Error fetching data"
                };
				}
				else
				{
					  response = {
                    "error": false,
                    "message": data
                };
				}
              
            }
            res.json(response);
        });

    })
	 router.get('/usersDetails', function(req, res, next) {
		 var response={};
        userCredentials.find({}, function(err, data) {
                   if (err) {
                response = {
                    "error": true,
                    "message": "Error fetching data"
                };
            } else {
				if(JSON.stringify(data)==='[]')
				{
					response = {
                    "error": true,
                    "message": "Error fetching data"
                };
				}
				else
				{
					  response = {
                    "error": false,
                    "message": data
                };
				}
              
            }
            res.json(response);
        });

    })
    return router;
}