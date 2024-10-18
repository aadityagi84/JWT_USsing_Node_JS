const express = require("express");
const {
  handleCreateUser,
  loginController,
} = require("../Controllers/AuthController");
const router = express.Router();

router.post("/user-register", handleCreateUser);
router.post("/user-login", loginController);

module.exports = router;
