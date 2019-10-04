const { MongoClient } = require("mongodb");
const MongoUrl = "mongodb://localhost:27017/MasterPassword";

MongoClient.connect(
  MongoUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(error, database) {
    if (error) throw error;
    console.log("Database created!");
    const masterPasswordDB = database.db("MasterPassword");
    masterPasswordDB.createCollection("secrets", (error, result) => {
      if (error) throw error;
    });
    console.log("Collecion secrets created!");
    database.close();
  }
);
