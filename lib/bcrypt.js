const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

async function hashPassword(password) {
  try {
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error("Failed to hash the password");
    throw new Error(`Failed to hash the password`, error);
  }
}

module.exports = {
  hashPassword,
};
