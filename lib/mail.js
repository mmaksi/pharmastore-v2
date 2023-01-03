const nodemailer = require("nodemailer");
require("colors");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const mailOptions = {
  from: "Pharmastore",
  to: "markmaksi97@gmail.com",
  subject: "Subject",
  text: "Email content",
};

async function sendEmail() {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
  } catch (error) {
    throw new Error(`Failed to send verification email`.red, error.red);
  }
}

module.exports = sendEmail;
