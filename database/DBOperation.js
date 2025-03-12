const path = require("path");
const sqlite3 = require("sqlite3").verbose();

//cnnection to DB
const connectToDB = async function () {

  return await new Promise((resolve, reject) => {
    console.log("Starting the DB connection...");
    const db = new sqlite3.Database(
      path.join(__dirname, "/myDB"),
      sqlite3.OPEN_READWRITE,
      (err) => {
        if (err) {
          reject(new Error(`Failed to connect to DB! Detail: ${err.message}`));
        } else {
          console.log("DB connection successful.");
          resolve(db);
        }
      }
    );
  });
};

//create empty tables
const createTable = function () {
  const connectedDB = connectToDB();
  connectedDB.serialize(() => {
    connectedDB.run(
      "CREATE TABLE IF NOT EXISTS Client(id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, email TEXT, mobile TEXT, street TEXT, city TEXT, state TEXT, servicetype TEXT, message TEXT)",
      (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log("Table Client created successfully.");
        }
      }
    );
    connectedDB.run("DELETE FROM Client");

    connectedDB.run(
      "CREATE TABLE IF NOT EXISTS Project(id INTEGER PRIMARY KEY AUTOINCREMENT, projectname TEXT, status TEXT)",
      (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log("Table Project created successfully.");
        }
      }
    );
    connectedDB.run("DELETE FROM Project");
  });
  closeDbConnection(connectedDB);
};

//display content in DB
const displayDBContent = function () {
  const connectedDB = connectToDB();
  connectedDB.serialize(() => {
    connectedDB.each("SELECT * FROM Client", (err, row) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(
          `${row.id} ${row.firstname} ${row.lastname} ${row.email} ${row.mobile} ${row.street} ${row.city} ${row.state} ${row.servicetype} ${row.message}`
        );
      }
    });

    connectedDB.each("SELECT * FROM Project", (err, row) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`${row.id} ${row.projectname} ${row.status}`);
      }
    });
  });
  closeDbConnection(connectedDB);
};

//close DB connection
const closeDbConnection = async function (connectedDB) {

  await new Promise((resolve, reject) => {
    console.log("Starting to close DB...");
    connectedDB.close((err) => {
      if (err) {
        reject(new Error(`Failed to close DB! Detail: ${err.message}`));
      } else {
        console.log("Database connection closed.");
        resolve();
      }
    });
  });
};

const insertRowToDB = async function (req) {
  try {
    //connect DB
    const connectedDB = await connectToDB();

    //insert row to table
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

    await new Promise((resolve, reject) => {
      console.log("Starting to insert row...");
      connectedDB.run(
        `INSERT INTO Client (firstname, lastname, email, mobile, street, city, state, servicetype, message) VALUES ('${firstname}', '${lastname}', '${email}', '${mobile}', '${street}', '${city}', '${state}', '${servicetype}', '${message}')`,
        (err) => {
          if (err) {
            reject(new Error(`Insertion failed! Detail: ${err.message}`));
          } else {
            console.log("A row has been inserted to Table Client.");
            resolve("Promise resolved.");
          }
        }
      );
    });

    //close DB
    await closeDbConnection(connectedDB);
    console.log("DB operation completed!")
  } catch (err) {
    console.log(`\x1b[31m${err.message}\x1b[0m`);
  }
};

module.exports = { insertRowToDB, createTable, displayDBContent };
