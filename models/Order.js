const mongoose = require("mongoose");

// Define a schema for the order
const orderSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  type: String,
  dimensions: [[Number]],
  type2: String,
  mechanism: String,
  sum: Number,
  date: String,
  comment: String,
  endDate: String,
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

// Define a model for the order
const Order = mongoose.model("order", orderSchema);

module.exports = Order;
