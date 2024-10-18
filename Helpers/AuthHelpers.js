const bcrypt = require("bcrypt");

// Function to generate hashed password
const PasswordGenrate = async (password) => {
  try {
    const saltRounds = 10; // 10 rounds are recommended for security
    const hashPassword = await bcrypt.hash(password, saltRounds);
    return hashPassword;
  } catch (error) {
    console.error(`Error generating hashed password: ${error.message}`);
    throw new Error("Password hashing failed"); // Throw error to handle properly
  }
};

// Function to compare plain password with hashed password
const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error(`Error comparing passwords: ${error.message}`);
    throw new Error("Password comparison failed");
  }
};

module.exports = { PasswordGenrate, comparePassword };
