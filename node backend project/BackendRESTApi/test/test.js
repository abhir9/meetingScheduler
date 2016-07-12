var assert= require('assert');
var should = require("should");
var supertest= require("supertest");


describe("Positive unit test",function(){
	// positive test cases
  it("should pass the case by getting 200 status code while getting all meetings",function(done){
	  	var server = supertest.agent("http://localhost:4004/calendarId");
    server
    .get("/")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
      res.body.error.should.equal(false);
      done();
    });
  });
  it("should pass the case by getting 200 status code while scheduling the meeting",function(done){
	  	var server = supertest.agent("http://localhost:4004/calendarId");
    server
    .post("/")
	.send({
    "CalendarId": 121,
    "StartTime": "12:30am1",
    "Duration": 6012,
    "StartDate": "12-5-2011",
    "subject": "node diss cussion1",
    "users":[{
        "fisrtName":"abhi"
        },
        {
        "fisrtName":"abhi1"
        }
	]}
    
)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
      res.body.error.should.equal(false);
      done();
    });
  });

  it("should pass the case by getting 200 status code while cancle the meeting",function(done){
  var server = supertest.agent("http://localhost:4004/calendarId/eop2ph2a3iejyvi");
  server
    .put("/")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
      res.body.error.should.equal(false);
      done();
    });
  });

  it("should pass the case by getting 200 status code while deleting the meeting",function(done){
  var server = supertest.agent("http://localhost:4004/calendarId/eop2ph2a3iejyvi");
  server
    .delete("/")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
      res.body.error.should.equal(false);
      done();
    });
  });

  it("should pass the case by getting 200 status code while getting by meeting id",function(done){
  var server = supertest.agent("http://localhost:4004/calendarId/jtasr646qnjhsemi");
  server
    .get("/")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
      res.body.error.should.equal(false);
      done();
    });
  });

  
  
});

describe("negative unit test",function(){
	// positive test cases
  it("should pass the case by getting 404 status code while getting all meetings",function(done){
	  	var server = supertest.agent("localhost:4004/calendarId/eop2ph2a3iejyvi");
    server
    .post("/")
    .expect("Content-type",/json/)
    .expect(404) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(404);
      done();
    });
  });
  it("should pass the case by getting 404 status code while scheduling the meeting",function(done){
	  	var server = supertest.agent("http://localhost:4004/calendarId");
    server
    .delete("/")
    .expect("Content-type",/json/)
    .expect(404) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(404);
      done();
    });
  });

  
});


