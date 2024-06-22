const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
