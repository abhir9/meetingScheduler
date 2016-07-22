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
    "should": "^9.0.2",		 -> testin framework
    "supertest": "^1.2.0"	 -> testin framework

sample post payload:

{
    "CalendarId": 1231,
    "StartTime": "12:30am1",
    "Duration": 601,
    "StartDate": "12-5-2011",
    "subject": "node disscussion1",
    "users":[{
        "fisrtName":"abhi"
        },
        {
        "fisrtName":"abhi1"
        }
        ]
    
}

	
urls :
 1. for getting all meetings  ---- GET:   localhost:4004/calendarId
 2. for setting meeting 	  ---- POST:  localhost:4004/calendarId/(pass body )
 3. for delete meeting 		  ---- DELETE:localhost:4004/calendarId/(#meetingId)
 4. for cancle meeting 		  ---- PUT:   localhost:4004/calendarId/(#meetingId) 
 5. for reseting counter	  ---- PUT:   localhost:4004/calendarId/clearCounter
 6. for get all counter		  ---- GET:   localhost:4004/calendarId/counters	
 7. for run test cases		  ---- mocha in cmd(before that make sure server up and run another terminal) 
