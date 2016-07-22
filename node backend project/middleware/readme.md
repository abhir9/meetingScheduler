
/** i have done front ui part with this middleware after disscussion on call i have stoped it.
 * so you will find some ejs configuration in code that i have used for checking purpose.
 * we can exclude that part if requrement says.
 * (You will get some ui link to check backend 3rd party api and login reporting submodule)
 **/


Required Technology & frameworks & tools
	*Node.js
	*Express.js
	*mongoDb
	*mocha
	*postman
	*atom
	
Config:
	* I have keep static configuration data in config file.
	
Logging:
	* for logging i have used morgan 
	
Static:
	* I have made "public" folder as static resources holder.	
	
Authentication:
	* All the REST api call url accessible without any authentication.
	* if any authentication requred please specify.
	
Test framework:
	* i have use mocha & supertest framework for test.
	* i have not used any code coverage framework (if require please specify).
	
Test cases:
	* I have make unit test cases for positive and negative test cases .
	* I have not included any integration test cases( if require please specify).
	* i have not made any request validation (if require please specify).
	* i have not made any response validation (if require please specify).

Modules:
	"body-parser": "^1.15.2" -> Parse each and every incoming request before handlers, 
    "express": "^4.14.0",	 -> Node js framework
    "mocha": "^2.5.3",		 -> testing framework
    "mongoose": "^4.5.4",	 -> provides ORM with mongodb
    "morgan": "^1.7.0",		 -> for logging
    "should": "^9.0.2",		 -> testing framework
    "supertest": "^1.2.0"	 -> testing framework

	
urls :
 1. for login  							  ---- GET: http://localhost:4001/login	
 2. for logout 							  ---- GET: http://localhost:4001/logout	 
 3. for currently loggedin Users 		  ---- GET: http://localhost:4001/loggedinUsers
 4.	for all login logout details of users ---- GET: http://localhost:4001/usersDetails
 5. for run test cases					  ---- mocha (in cmd , make sure server is up & run on another terminal)
 