const jwt = require("jsonwebtoken");
const token = jwt.sign({ foo: "bar" }, process.env.JWT_SECRET);

async function signData(data) {
  try {
    const token = await jwt.sign(
      {
        data,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return token;
  } catch (error) {
    throw new Error(`Failed to generate a token`.red, error.stack.red);
  }
}

module.exports = {
  signData,
};
