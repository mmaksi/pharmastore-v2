const nodemailer = require("nodemailer");
require("colors");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

async function sendEmail(host, emailToken) {
  const mailOptions = {
    from: "Pharmastore",
    to: "markmaksi97@gmail.com",
    subject: "Subject",
    html: `<h1>Thank you for signing up to Pharmastore!</h1> <br/> Please <a href="${host}/api/authentication/confirmation-email?token=${emailToken}">Confirm your email by clicking here</a> <br/> <p>If the link is not working please copy this link and paste it in your browser: ${host}/api/authentication/confirmation-email?token=${emailToken}</p> <br/> <p color: "red">Please note that this link is valid only for 1 hour.</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`Failed to send confirmation email`.red, error.red);
  }
}

module.exports = sendEmail;
