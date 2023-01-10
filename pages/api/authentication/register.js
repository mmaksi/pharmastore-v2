import { hashPassword } from "../../../lib/bcrypt";
import { client } from "../../../lib/db";
import sendEmail from "../../../lib/mail";
import { signData } from "../../../lib/token";
require("colors");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, username, password } = req.body;
    // Check if request body is complete
    if (email && username && password) {
      // Hash the password
      const hashedPassword = await hashPassword(password);
      // Generate a token specific to the email valid for 1 hour
      const emailToken = await signData(email);
      // Send a confirmation email
      await sendEmail("http://localhost:3000", emailToken);
      // Check if emailToken and password are generated and hashed respectively
      if (emailToken && hashedPassword) {
        // Store user's data and his token in the database
        try {
          await client.query(
            `INSERT INTO "user" ("email", "username", "password", "emailToken")
             VALUES ('${email}', '${username}', '${hashedPassword}', '${emailToken}')`
          );
          return res
            .status(200)
            .json({ success: true, message: "Token added successfully" });
        } catch (error) {
          res.status(500).json({
            success: false,
            message: "Something went wrong in our servers",
          });
          throw new Error(error.stack.red);
        }
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Part of data is missing" });
    }
  }
}
