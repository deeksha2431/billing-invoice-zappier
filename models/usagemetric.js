const mongoose = require("mongoose");

const usageMetricSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  metric: { type: String, required: true },
  value: { type: Number, required: true },
});

module.exports = mongoose.model("UsageMetric", usageMetricSchema);

// // UsageDetails.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function UsageDetails() {
//   const [usageData, setUsageData] = useState([]);

//   useEffect(() => {
//     const fetchUsage = async () => {
//       try {
//         const response = await axios.get("/users/me/usage");
//         setUsageData(response.data);
//       } catch (error) {
//         // Handle error
//       }
//     };
//     fetchUsage();
//   }, []);

//   // ... (render usage data)
// }

// export default UsageDetails;
