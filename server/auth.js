const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const db = require("./db");
const { protect } = require("./authMiddleware");

const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

// Prevent ANY caching (browser, CDN, proxy) on auth routes.
// Without this, a shared/intermediate cache can serve one user's
// response to a different user's request for the same URL,
// causing cross-user data leaks (e.g. wrong name showing after login).
router.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

/* ===========================
   SIGNUP
=========================== */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide name, email and password",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const existing = db
      .prepare("SELECT id FROM users WHERE email=?")
      .get(email.toLowerCase());

    if (existing) {
      return res.status(400).json({
        message: "Account already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = db
      .prepare(
        "INSERT INTO users(name,email,password) VALUES(?,?,?)"
      )
      .run(name, email.toLowerCase(), hashedPassword);

    const user = {
      id: result.lastInsertRowid,
      name,
      email: email.toLowerCase(),
    };

    res.status(201).json({
      success: true,
      user,
      token: generateToken(user.id),
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Signup failed",
      error: err.message,
    });
  }
});

/* ===========================
   LOGIN
=========================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    const user = db
      .prepare("SELECT * FROM users WHERE email=?")
      .get(email.toLowerCase());

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (!user.password) {
      return res.status(400).json({
        message:
          "This account uses Google Sign In. Please continue with Google.",
      });
    }

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user.id),
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Login failed",
      error: err.message,
    });
  }
});

/* ===========================
   GOOGLE LOGIN
=========================== */
router.post("/google", async (req, res) => {
  console.log("✅ Google route reached");

  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        message: "Missing Google credential",
      });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const email = payload.email.toLowerCase();
    const name = payload.name;

    let user = db
      .prepare("SELECT * FROM users WHERE email=?")
      .get(email);

    if (!user) {
      const result = db
        .prepare(
          "INSERT INTO users(name,email,password) VALUES(?,?,NULL)"
        )
        .run(name, email);

      user = {
        id: result.lastInsertRowid,
        name,
        email,
      };
    }

    const token = generateToken(user.id);

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error(err);

    res.status(401).json({
      message: "Google authentication failed",
      error: err.message,
    });
  }
});

/* ===========================
   ME - verify token on page load/refresh
=========================== */
router.get("/me", (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = db
      .prepare("SELECT id, name, email FROM users WHERE id=?")
      .get(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    res.json(user);
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

/* ===========================
   SET PASSWORD - for accounts created via Google that
   want to also enable email/password login
=========================== */
router.post("/set-password", protect, async (req, res) => {
  try {
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    db.prepare("UPDATE users SET password=? WHERE id=?").run(
      hashedPassword,
      req.user.id
    );

    res.json({
      success: true,
      message: "Password set successfully. You can now log in with email and password too.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to set password",
      error: err.message,
    });
  }
});

module.exports = router;