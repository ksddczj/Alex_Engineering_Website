// Require the express web application framework (https://expressjs.com)
const express = require('express')

// Create a new web application by calling the express function
const app = express()
const port = process.env.PORT || 3000;

const path = require('path'); // Added to support access to file system paths

// Tell our application to serve all the files under the `public_html` directory
app.use(express.static(path.join(__dirname, 'public_html')));

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('views', './view'); 
//this is not recommended because if you if you execute node index.js from another path
//for example from c:\ rather than the path where the index.js is located
//the ./view will refer to c:\view. this is clearly the wrong path.
app.set('view engine', 'ejs');

//require the insertRow method from DBOperation module
const {insertRowToDB} = require(path.join(__dirname, '/database/DBOperation'));

// **routes**
app.post('/clientrequest', (req, res) => {
  const submittedData = req.body;

  res.render('thankyou', { 
    submittedData: submittedData
  });

  // save submittedData to DB
  console.log("Client message received.")
  insertRowToDB(req); //
});

app.post("/searchprojects", async (req, res) => {
  const searchTerm = req.body.projectnamekeyword;
  console.log(searchTerm);
  res.render("existingproject", {});

  // logic to fetch data from DB and handle the fetched data afterwords 
  // development pending
  console.log("Search project request handled.");
});

//listen to port
app.listen(port, ()=> {
  // When the application starts, print to the console that our app is
  // running at http://localhost:3000. Print another message indicating
  // how to shut the server down.
  console.log(`Web server running at: http://localhost:${port}`)
  console.log(`Type Ctrl+C to shut down the web server`)
})
