import client from "../../../lib/db";

export default async function handler(req, res) {
  // Tries to connect to elephantSQL database
  client.connect(function (err) {
    if (err) {
      return console.error("could not connect to postgres", err);
    }
    // If there was no error perform the query
    // Fetch all products from a specific categories
    client.query("SELECT * from product", (err, resp) => {
      if (err) {
        console.log(err);
        return res.status(200).json({ name: "error" });
      }
      console.log(resp);
      return res.status(200).json({ name: resp });
      client.end();
    });
    //   return res.status(200).json({ name: "res" });
  });
}
