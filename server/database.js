var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

// Create new database
let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQlite database.");
    db.run(
      `CREATE TABLE reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            review text, 
            rating float
            )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          var insert = "INSERT INTO reviews (review, rating) VALUES (?,?)";
          db.run(insert, ["It was okay!", 3]);
          db.run(insert, ["Very good", 4.5]);
        }
      }
    );
  }
});

module.exports = db;
