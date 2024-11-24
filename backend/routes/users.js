const router = require("express").Router();
const { authenticateJWT } = require("../middlewares/auth.mw");
const User = require("../models/User");
const logger = require("../utilities/logger");
const jwt = require("jsonwebtoken");
const auth_utils = require("../utilities/auth.utils");

const JWT_SECRET = process.env.JWT_SECRET || "PLACEHOLDER";

router.get("/", authenticateJWT, async (req, res) => {
  let result = await User.getAllUsers();
  res.status(200).send(result);
});

router.post("/addUser", async (req, res) => {
  const { email, password } = req.body;
  const regexPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*., ?])/;

  try {
    const existingUser = await User.getUserbyEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!regexPassword.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and contain a special character",
      });
    }

    const hashedPassword = await auth_utils.hashPassword(password);

    await User.addUser(email, hashedPassword);

    const newUser = await User.getUserbyEmail(email);

    // Generate JWT
    const payload = {
      id: newUser.id,
      email: newUser.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });

    res.status(201).json({ token });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getUser/:email", authenticateJWT, async (req, res) => {
  const { email } = req.params;

  try {
    let result = await User.getUserbyEmail(email);
    res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
