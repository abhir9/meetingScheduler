var assert= require('assert');
var should = require("should");
var supertest= require("supertest");




describe("positive unit test",function(){
	// positive test cases
  it("should pass the case by getting 200 status code while getting all userdetails",function(done){
	  	var server = supertest.agent("http://localhost:4001/usersDetails");
    server
    .get("/")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });
  it("should pass the case by getting 200 status code while getting online users",function(done){
	  	var server = supertest.agent("http://localhost:4001/loggedinUsers");
    server
    .get("/")
	.expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });  
});

describe("negative unit test",function(){
	// positive test cases
  it("should pass the case by getting 200 status code while getting all userdetails",function(done){
	  	var server = supertest.agent("http://localhost:4001/usersDetails");
    server
    .post("/")
    .expect("Content-type",/json/)
    .expect(404) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(404);
      done();
    });
  });
  it("should pass the case by getting 404 status code while getting online users",function(done){
	  	var server = supertest.agent("http://localhost:4001/loggedin");
    server
    .get("/")
	.expect("Content-type",/json/)
    .expect(404) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(404);
      done();
    });
  });  
});




