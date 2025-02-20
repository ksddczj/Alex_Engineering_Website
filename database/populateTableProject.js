let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(".\\database\\myDB", sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            throw err.message;
        }else {
            console.log("DB connection successful.");
        }
}); 

function InsertData(
  projectname,
  status
) {
  db.run(
    `INSERT INTO Project (projectname, status) VALUES ('${projectname}', '${status}')`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`A row has been inserted to Table Project`);
      }
    }
  );
}

InsertData('Project Drop Deck', '10%');
InsertData('Project Widener', '20%');
InsertData('Project Low Loader', '30%');
InsertData('Project Tilt Tray', '40%');
InsertData('Project Side Loader', '50%');
InsertData('Project Flat Top', '60%');
InsertData('Project Extendable', '70%');
InsertData('Project B-Double', '80%');
InsertData('Project Road Train', '90%');
InsertData('Project Heavy Haulage', '100%');


db.close();