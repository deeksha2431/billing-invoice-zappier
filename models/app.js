// ... other routes and middleware ...
const express = require("express");
const path = require("path");
app.use("/auth", authRoutes);

const app = express();

// Set up the views directory
app.set("views", path.join(__dirname, "views"));

// Set up the view engine
app.set("view engine", "ejs");

// ... other routes and middleware ...

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
