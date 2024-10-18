const JWT = require("jsonwebtoken");
const { PasswordGenrate, comparePassword } = require("../Helpers/AuthHelpers");
const User = require("../model/AuthModel"); // Change model name to 'User'

require("dotenv").config();

// Handle User Registration
const handleCreateUser = async (req, res) => {
  try {
    const { name, email, password, PhoneNumber } = req.body;

    if (!name || !email || !password || !PhoneNumber) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    const alreadyUser = await User.findOne({ email }); // Access model 'User'
    if (alreadyUser) {
      return res.status(201).send({
        success: false,
        message: "Already Registered. Please Login.",
      });
    }

    const encryptedPassword = await PasswordGenrate(password);
    const newUser = new User({
      email,
      name,
      password: encryptedPassword,
      PhoneNumber,
    });
    await newUser.save();

    return res.status(201).send({
      success: true,
      message: "User Registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.log("Error in creating user", error);
    return res.status(500).json({
      success: false,
      message: "Error in creating user",
      error: error.message,
    });
  }
};

// Login Controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid user credentials" });
    }

    const foundUser = await User.findOne({ email }); // Renamed variable to 'foundUser'

    if (!foundUser) {
      return res.status(404).json({
        success: false,
        message: "Email address is not registered",
      });
    }

    // console.log("Plain password:", password);
    // console.log("Hashed password from DB:", foundUser.password);

    if (!foundUser.password) {
      return res.status(400).json({
        success: false,
        message: "Password is missing for this user.",
      });
    }

    const match = await comparePassword(password, foundUser.password);

    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid password",
      });
    }

    const token = await JWT.sign(
      { _id: foundUser._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "2d",
      }
    );
    // Set token in cookies
    res.cookie("token", token, {
      httpOnly: true, // Inaccessible to JavaScript on the client side
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "Lax", // Helps protect against CSRF attacks
      maxAge: 2 * 24 * 60 * 60 * 1000, // Cookie expires in 2 days
    });

    // res.status(200).json({
    //   success: true,
    //   message: "Login successful",
    //   user: { name: foundUser.name, email: foundUser.email },
    //   token,
    // });
    res.redirect("/");
  } catch (error) {
    console.log("Error during login:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  handleCreateUser,
  loginController,
};
