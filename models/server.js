const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const zapier = require("zapier");
const User = require("./models/User");
const Invoice = require("./invoice");
const UsageMetric = require("./usagemetric");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Configure Passport
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Find or create user based on profile
      // ... (implementation omitted for brevity)
      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Find user by ID
  // ... (implementation omitted for brevity)
  done(null, user);
});

// Middleware to use Passport authentication
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Error connecting to MongoDB:", err));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/billing-invoice-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a new user
const newUser = new User({
  googleId: "1234567890",
  email: "john.doe@example.com",
  name: "John Doe",
});

newUser.save((err, user) => {
  if (err) {
    console.error(err);
  } else {
    console.log("User saved:", user);
  }
});

// Create a new invoice
const newInvoice = new Invoice({
  userId: "123456789012345678901234",
  date: new Date(),
  amount: 100,
  status: "paid",
});

newInvoice.save((err, invoice) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Invoice saved:", invoice);
  }
});

// Create a new usage metric
const newUsageMetric = new UsageMetric({
  userId: "123456789012345678901234",
  date: new Date(),
  metric: "cpu_usage",
  value: 50,
});

newUsageMetric.save((err, usageMetric) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Usage metric saved:", usageMetric);
  }
});

// Define API routes

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/dashboard"); // Redirect to user dashboard
  }
);

// In `server.js`, add routes:
app.get(
  "/users/me",
  ensureAuthenticated, // Middleware to check authentication
  (req, res) => {
    res.json(req.user);
  }
);

app.post("/users/:userId/usage", ensureAuthenticated, (req, res) => {
  const userId = req.params.userId;
  const { metric, value } = req.body;

  // Update user's usage data
  // ... (implementation omitted for brevity)

  res.json({ message: "Usage data updated successfully" });
});

// ... (more routes below)

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
