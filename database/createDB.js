let sqlite3 = require('sqlite3').verbose();
let path = require('path');
let db = new sqlite3.Database(path.join(__dirname, '/myDB'), (err) => {
  if (err) {
    throw err.message;
  } else {
    console.log("DB connection successful.");
  }
});      

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS Client(id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, email TEXT, mobile TEXT, street TEXT, city TEXT, state TEXT, servicetype TEXT, message TEXT)", (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Table Client created successfully.");
        }
    });
    db.run("DELETE FROM Client");

    db.run("CREATE TABLE IF NOT EXISTS Project(id INTEGER PRIMARY KEY AUTOINCREMENT, projectname TEXT, status TEXT)", (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Table Project created successfully.");
        }
    });
    db.run("DELETE FROM Project");

});

db.close();