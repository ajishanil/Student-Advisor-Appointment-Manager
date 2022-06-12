const express = require("express"); //express is a back end web application framework
const backend = express(); // Define the express as 'backend'
const router = require("./routes/routes"); // Import the router created in ./routes/routes
const initialServer = require("./database/initialForServer");
const bodyParser = require("body-parser"); //  body-parser is process data sent through an HTTP request body
const cookieParser = require("cookie-parser"); // cookie-parser is a middleware which parses cookies attached to the client request object
var session = require("express-session"); // Express-session: an HTTP server-side framework used to create and manage a session middleware.
const cors = require("cors");
var passport = require("passport");

// this will allows the front end to access the backend
backend.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// Import the passport configure created in ./config/passport
var passport = require("./config/passport");

// DB connection
require("./database/connection"); // import database configuration

// Check is super admin existing
initialServer.createAdminByServer();

backend.use(express.urlencoded({ extended: true }));
backend.use(express.json());
backend.use(cookieParser()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
backend.use(session({ 
  secret: "super-secret", // This is the secret used to sign the session id cookie
  resave: false,  // forces the session to be saved back to the session store, it will be modified by new request
  saveUninitialized: false, // forces a session that is 'uninitialized' to be saved to the store
  name: 'sessionId', // name of this session, session id
  cookie: {
    maxAge: 1000 * 60 * 60 * 2, // 2 hours
    // maxAge: 1000 * 60 * 1, // 1 mins
    sameSite: 'lax', // will set the sameSite atrribute to Strict for strict same site enforcement
    ecure: false, // Remember to set this
  },
})); //  Assigning it to the secret parameter allows express-session to use it to encrypt the sessionId if i am not mistaken.

backend.use(express.json()); // This method is used to parse the incoming requests with JSON payloads and is based upon the bodyparser.


backend.use(passport.initialize()); // Initialises the authentication module.
backend.use(passport.session()); // passport.session() is another middleware that
// alters the request object and change the 'user' value that is currently the session id (from the client cookie) into the true deserialized user object.
global.passport = passport; // set passport as a global variable for authController.js

// if request path like this http://localhost:3001/api/×××××, go to router
backend.use("/api", router);

// Here the port is 3001
backend.listen(3001, function () {
  console.log("Server started successfully");
});
