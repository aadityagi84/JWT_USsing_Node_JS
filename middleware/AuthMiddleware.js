const JWT = require("jsonwebtoken");
require("dotenv").config();

const requireLogin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }
    // Verify token
    const decoded = JWT.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ success: false, message: "Unauthorized Access" });
  }
};
module.exports = { requireLogin };
