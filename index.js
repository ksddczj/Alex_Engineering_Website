// Require the express web application framework (https://expressjs.com)
const express = require('express')

// Create a new web application by calling the express function
const app = express()
const port = process.env.PORT || 3000;

// Tell our application to serve all the files under the `public_html` directory
app.use(express.static('public_html'))

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

const path = require('path'); // Added to support access to file system paths

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('views', './view'); 
//this is not recommended because if you if you execute node index.js from another path
//for example from c:\ rather than the path where the index.js is located
//the ./view will refer to c:\view. this is clearly the wrong path.
app.set('view engine', 'ejs');

// set up DB
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(path.join(__dirname, '/database/myDB'), sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            throw err.message;
        }else {
            console.log("DB connection successful.");
        }
}); 


// *** Other route/request handlers go here ***


app.post('/clientrequest', (req, res) => {
  const submittedData = req.body;

  res.render('thankyou', { 
    submittedData: submittedData
  });

  // save submittedData to DB
  console.log("Client message received.")

  const {
    fname: firstname,
    lname: lastname,
    email,
    mobile,
    street,
    city,
    state,
    servicetype,
    message,
  } = req.body;

  db.run(
    `INSERT INTO Client (firstname, lastname, email, mobile, street, city, state, servicetype, message) VALUES ('${firstname}', '${lastname}', '${email}', '${mobile}', '${street}', '${city}', '${state}', '${servicetype}', '${message}')`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`A row has been inserted to Table Client`);
      }
    }
  );
});

app.post("/searchprojects", (req, res) => {
  const searchTerm = req.body.projectnamekeyword;
  console.log(searchTerm);
  res.render("existingproject", {});

  // save submittedData to DB
  console.log("Search project requested received.");
});



//listen to port
app.listen(port, ()=> {
  // When the application starts, print to the console that our app is
  // running at http://localhost:3000. Print another message indicating
  // how to shut the server down.
  console.log(`Web server running at: http://localhost:${port}`)
  console.log(`Type Ctrl+C to shut down the web server`)
})
