require("dotenv").config();
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Passport Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback", // If go any error Change it to "http://localhost:5000/auth/google/callback" save it as REDIRECT_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Here you would typically save the user to your database
        // For this example, we'll just pass the profile
        return done(null, profile);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Google OAuth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    try {
      // Create JWT token
      const token = jwt.sign(
        {
          id: req.user.id,
          email: req.user.emails[0].value,
          name: req.user.displayName,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Redirect to frontend with token
      res.redirect(`${process.env.CLIENT_URL}/${token}`);
    } catch (error) {
      res.redirect(`${process.env.CLIENT_URL}/error`);
    }
  }
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
