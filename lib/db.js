// db.js
const { Client } = require("pg");

const client = new Client(process.env.DB_HOST);

async function connectDB() {
  try {
    client.connect();
  } catch (error) {
    console.error("Could not connect to postgres", error);
  }
}
// Connect to the database only once
connectDB();

module.exports = {
  client,
};
