import client from "../../../lib/db";

client.connect();

export default async function handler(req, res) {
  await client.query("SELECT * from titles", (err, resp) => {
    if (err) {
      console.log(err);
      return res.status(200).json({ name: "error" });
    }
    console.log(resp);
    return res.status(200).json({ name: resp });
    client.end();
  });

  //   return res.status(200).json({ name: "res" });
}
