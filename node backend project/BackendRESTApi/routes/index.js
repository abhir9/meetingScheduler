"use strict";
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var CalenderSchema = require("../models/calendarId");
var calenderOp = mongoose.model('scheduleMeeting', CalenderSchema);
var CounterSchema = require("../models/counter");
var counterOp = mongoose.model('counter', CounterSchema);
var dbConfig= require('../config/dbConfig');

// connection with database
mongoose.connect('mongodb://'+dbConfig.hostname+':'+dbConfig.port+'/'+dbConfig.database);


// fetching All the meeting details from database
router.route("/")
    .get(function(req, res) {
        var response = {};
        calenderOp.find({}, function(err, data) {
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
    });

	
	// fetching All the counter details from database
router.route("/counters")
    .get(function(req, res) {
        var response = {};
        counterOp.find({}, function(err, data) {
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
    });

//scheduling a new meeting
router.route("/")
    .post(function(req, res) {
        var cal = new calenderOp();
        var count = new counterOp();
        var response = {};
        var now = Date.now();

        cal.calendarId = req.body.calendarId;
        cal.startTime = req.body.startTime;
        cal.duration = req.body.duration;
        cal.startDate = req.body.startDate;
        cal.subject = req.body.subject;
        cal.creationTime = now;
        cal.status = "scheduled";
        cal.meetingId = Math.random().toString(36).slice(2);
        var array = [];
        array = req.body.users;
        cal.users = array;

        counterOp.find({}, function(err, data) {
            if (err) {
                response = {
                    "error": true,
                    "message": "Error fetching data"
                };
            } else {

              var totalsc = data[data.length - 1].totalScheduled;
              var totaltr = data[data.length - 1].totalTransantion;

                counterOp.update({
                    totalScheduled: totalsc
                }, {
                    $set: {
                        totalScheduled: totalsc + 1,totalTransantion:totaltr+1
                    }
                }, function(err) {
                    if (err) {
                        response = {
                            "error": true,
                            "message": "Error deleting data"
                        };
                    } else {
                        response = {
                            "error": false,
                            "message": "Counter updated "
                        };
                    }
                });


            }
        });


        cal.save(function(err) {
            // save() will run insert() command of MongoDB.
            // it will add new data in collection.
            if (err) {
                response = {
                    "error": true,
                    "message": "Error adding data"
                };
            } else {
                response = {
                    "error": false,
                    "meetingId": cal.meetingId
                };
            }
            res.json(response);
        });



    });

// fetching perticular meeting with meetingId

router.route("/:id").get(function(req, res) {
    var response = {};
    calenderOp.find({
        meetingId: req.params.id
    }, function(err, data) {
        // This will run Mongo Query to fetch data based on meetingId.
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




// delete Meeting using meetingId

router.route("/:id").delete(function(req, res) {
    var response = {};
    var count = new counterOp();
    // find the data
    calenderOp.find({
        meetingId: req.params.id
    }, function(err, data) {
        if (err) {
            response = {
                "error": true,
                "message": "Error fetching data"
            };
        } else {
            // data exists, remove it.
            calenderOp.remove({
                meetingId: req.params.id
            }, function(err) {
                if (err) {
                    response = {
                        "error": true,
                        "message": "Error deleting data"
                    };
                } else {
                    response = {
                        "error": false,
                        "message": "Data associated with " + req.params.id + "is deleted"
                    };
                }
                res.json(response);
            });
            counterOp.find({}, function(err, data) {
                if (err) {
                    response = {
                        "error": true,
                        "message": "Error fetching data"
                    };
                } else {
                    var totalsc = data[data.length - 1].totalScheduled;
                    var totalDel = data[data.length - 1].totalDeleted;
   	                var totaltr = data[data.length - 1].totalTransantion;

                    counterOp.update({
                        totalScheduled: totalsc
                    }, {
                        $set: {
                            totalScheduled: totalsc - 1,
                            totalDeleted: totalDel + 1,
							totalTransantion:totaltr+1

                        }
                    }, function(err) {
                        if (err) {
                            response = {
                                "error": true,
                                "message": "Error deleting data"
                            };
                        } else {
                            response = {
                                "error": false,
                                "message": "Counter updated "
                            };
                        }
                    });
                }
            });
        }
    });
})

// clear the counter
router.route("/clearCounter").put(function(req, res ) {
    var response = {};
	console.log('api hitted');
            counterOp.find({}, function(err, data) {
                if (err) {
                    response = {
                        "error": true,
                        "message": "Error fetching data"
                    };
                } else {
                    counterOp.update({}, {
                        $set: {
                            totalCancled: 0,totalScheduled:0 ,totalDeleted:0,totalTransantion:0
                        }
                    }, function(err) {
                        if (err) {
                            response = {
                                "error": true,
                                "message": "Error deleting data"
                            };
                        } else {
                            response = {
                                "error": false,
                                "message": "Counter Reset "
                            };
                        }
						                res.json(response);

                    });
                }
            });
});
    


// cancle the meeting
router.route("/:id").put(function(req, res) {
    var response = {};
    var count = new counterOp();
    // find the data
    calenderOp.find({
        meetingId: req.params.id
    }, function(err, data) {
        if (err) {
            response = {
                "error": true,
                "message": "Error fetching data"
            };
        } else {
            // data exists, remove it.
            calenderOp.update({
                meetingId: req.params.id
            }, {
                $set: {
                    status: "cancled"
                }
            }, function(err) {
                if (err) {
                    response = {
                        "error": true,
                        "message": "Error deleting data"
                    };
                } else {
                    response = {
                        "error": false,
                        "message": "Meeting associated with " + req.params.id + "is canceled "
                    };
                }
                res.json(response);
            });
            counterOp.find({}, function(err, data) {
                if (err) {
                    response = {
                        "error": true,
                        "message": "Error fetching data"
                    };
                } else {
                    var totalsc = data[data.length - 1].totalScheduled;
                    var totalcan = data[data.length - 1].totalCancled;
                    var totaltrn = data[data.length - 1].totalTransantion;
					
                    counterOp.update({
                        totalScheduled: totalsc
                    }, {
                        $set: {
                            totalCancled: totalcan + 1,totalTransantion:totaltrn+1
                        }
                    }, function(err) {
                        if (err) {
                            response = {
                                "error": true,
                                "message": "Error deleting data"
                            };
                        } else {
                            response = {
                                "error": false,
                                "message": "Counter updated "
                            };
                        }
                    });
                }
            });
        }
    });
})
module.exports = router;
