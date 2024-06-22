const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Google OAuth credentials
const clientId = "YOUR_GOOGLE_OAUTH_CLIENT_ID";
const clientSecret = "YOUR_GOOGLE_OAUTH_CLIENT_SECRET";
const callbackURL = "/auth/google/callback";

// Configure Passport.js to use Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: callbackURL,
    },
    (accessToken, refreshToken, profile, cb) => {
      // You can store the user's profile information in your database here
      // For now, just return the profile
      return cb(null, profile);
    }
  )
);

// Serialize user to session
passport.serializeUser((user, cb) => {
  cb(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// Google OAuth login route
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google OAuth callback route
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("/"); // Redirect to homepage after successful login
  }
);

module.exports = router;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function Login() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkLogin = async () => {
//       try {
//         const response = await axios.get("/users/me");
//         setIsLoggedIn(true);
//         navigate("/dashboard");
//       } catch (error) {
//         // Handle error
//       }
//     };
//     checkLogin();
//   }, []);

//   const handleLogin = () => {
//     window.location.href = "/auth/google";
//   };

//   return (
//     <div>
//       {isLoggedIn ? (
//         <p>You are already logged in.</p>
//       ) : (
//         <button onClick={handleLogin}>Login with Google</button>
//       )}
//     </div>
//   );
// }

// export default Login;
