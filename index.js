const express = require("express");
const { DatabseConnection } = require("./config/db");
const app = express();
require("dotenv").config();
const AuthRoutes = require("./routes/AuthRoute");
const cookieParser = require("cookie-parser");
const { requireLogin } = require("./middleware/AuthMiddleware");

const PORT = process.env.PORT || 8000;

// middlewares
// Middleware for parsing JSON and form data
app.use(express.json());
// to accepted form
app.use(express.urlencoded({ extended: true }));
// db connection
DatabseConnection();
// Use cookie-parser middleware
app.use(cookieParser());
// routes
app.use("/", AuthRoutes);

// frontent Code
app.get("/", requireLogin, (req, res) => {
  res.send({
    success: true,
    message: "User profile data",
    user: req.user,
  });
});

// EndPoint setup
app.listen(PORT, () => {
  console.log(`Server will Working on http://localhost:${PORT}`);
});
