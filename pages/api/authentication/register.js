import { hashPassword } from "../../../lib/bcrypt";
import { client } from "../../../lib/db";
import sendEmail from "../../../lib/mail";
require("colors");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, username, password } = req.body;
    // Hash the password
    const hashedPassword = await hashPassword(password);
    // Send verification email
    sendEmail();
    // Store user object in the database
    if (hashedPassword) {
      try {
        await client.query(
          `INSERT INTO "user" ("email", "username", "password")
           VALUES ('${email}', '${username}', '${hashedPassword}')`
        );
        return res
          .status(200)
          .json({ success: true, message: "User added successfully" });
      } catch (error) {
        throw new Error(error.stack.red);
      }
    }
  }
}
