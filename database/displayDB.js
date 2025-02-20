let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(".\\database\\myDB", (err) => {
  if (err) {
    throw err.message;
  } else {
    console.log("DB connection successful.");
  }
});      

db.serialize(() => {
    
    db.each("SELECT * FROM Client", (err,row) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log(`${row.id} ${row.firstname} ${row.lastname} ${row.email} ${row.mobile} ${row.street} ${row.city} ${row.state} ${row.servicetype} ${row.message}`);
        }
    });

    db.each("SELECT * FROM Project", (err,row) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log(`${row.id} ${row.projectname} ${row.status}`);
        }
    });

});

db.close();