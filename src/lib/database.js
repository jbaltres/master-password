// Callback

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

// Promise
// const { MongoClient } = require("mongodb");

// async function initDatabase() {
//   // Connection URL
//   const url = "mongodb://localhost:27017/master-password";
//   // Database Name
//   const dbName = "master-password";

//   const client = new MongoClient(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   });

//   try {
//     // Use connect method to connect to the Server
//     await client.connect();

//     console.log("Database connected");
//     const db = client.db(dbName);
//     const secretsCollection = await db.createCollection("secrets");
//     console.log("Collection secrets created");
//   } catch (error) {
//     console.error(error.stack);
//   }
//   client.close();
// }

// initDatabase();
