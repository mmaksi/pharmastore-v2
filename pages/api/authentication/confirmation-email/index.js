import { client } from "../../../../lib/db";

export default async function handler(req, res) {
  const confirmationToken = req.query.token;

  try {
    const foundUser = await client.query(
      `SELECT * from "user" WHERE "emailToken" = '${confirmationToken}'`
    );
    const savedToken = foundUser.rows[0].emailToken;
    // Check if confirmation token matches the token in the database
    if (savedToken === confirmationToken) {
      // Set isConfirmed to true
      await client.query(
        `UPDATE "user" SET "isConfirmed" = TRUE WHERE "emailToken" = '${savedToken}'`
      );
      // remove the token from the database
      await client.query(
        `UPDATE "user" SET "emailToken" = '' WHERE "emailToken" = '${savedToken}'`
      );
      // Redirect the user to the homepage
      return res.redirect(307, "/");
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Email confirmation failed" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong in our servers" });
    throw new Error(error.stack.red);
  }
}
