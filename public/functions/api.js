const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const router = express.Router();

const { format, parse } = require("date-fns");
const mongoose = require("mongoose");
const config = require("../../db.config");
const Order = require("../../models/Order");
const Worker = require("../../models/Worker");
const Size = require("../../models/Size");
const Fabric = require("../../models/Fabric");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for all requests
app.use(cors());

app.set("view engine", "pug");

// MongoDB connection
mongoose
  .connect(config.mongodb.url, config.mongodb.options)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err.message);
  });

app.use("/.netlify/functions/api", router);

// Middleware to parse FormData
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to fetch orders from the database
router.get("/orders", async (req, res) => {
  try {
    // Fetch all orders and populate the worker name and sizes
    const orders = await Order.find().populate("size_id", "dimensions");
    console.log(orders);
    const status = orders.filter((order) => order.status === 1).length;
    res.render("index", { data: orders, status_counter: status });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get an order by ID
router.get("/orders/:orderId", async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId).populate("size_id");
    // const size = await Size.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    console.error("Error retrieving order:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to handle POST requests from the form
router.post("/orders", async (req, res) => {
  try {
    console.log("New order created");

    // Parse date string into JavaScript Date object using date-fns
    const parsedDate = parse(req.body.date, "yyyy-MM-dd", new Date());

    // Format date using date-fns
    const formattedDate = format(parsedDate, "dd/MM/yyyy");

    // Create size document
    const size = await Size.create({
      dimensions: [req.body.width, req.body.height],
    });

    // Create a new order instance using the request body
    const order = new Order({
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      type: req.body.type,
      size_id: size._id,
      type2: req.body.type2,
      mechanism: req.body.mechanism,
      sum: req.body.sum,
      date: formattedDate,
      comment: req.body.comment,
    });

    // Save the order to the database
    await order.save();

    // Send response
    res
      .status(201)
      .json({ message: "Order created successfully", order: order });
  } catch (err) {
    console.error("Error saving order to database:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to handle POST requests from the form
router.post("/worker", async (req, res) => {
  try {
    console.log("New worker added");

    const worker = new Worker({
      name: req.body.name,
    });

    // Save the order to the database
    await worker.save();

    res
      .status(201)
      .json({ message: "Worker added successfully", worker: worker });
  } catch (err) {
    console.error("Error saving order to database:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/size", async (req, res) => {
  try {
    console.log("New size created");

    // Create a new order instance using the request body
    const size = new Size({
      dimensions: req.body.dimensions,
    });

    // Save the order to the database
    await size.save();

    res.status(201).json({ message: "Size created successfully", size: size });
  } catch (err) {
    console.error("Error saving size to database:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/sizes", async (req, res) => {
  try {
    const sizes = await Size.find();

    console.log(sizes);
    res.json({ data: sizes });
  } catch (error) {
    console.error("Error fetching sizes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Dummy authentication logic
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  // You can replace this dummy authentication logic with your actual authentication logic
  if (username === "admin" && password === "admin123") {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "username or password is incorrect" });
  }
});

// Middleware to authenticate admin routes
function authenticateAdmin(req, res, next) {
  // Implement your authentication logic here
  const isLoggedIn = true; // Example: check if user is logged in
  if (isLoggedIn) {
    next(); // Proceed to the next middleware
  } else {
    res.redirect("/"); // Redirect to login page if not authenticated
  }
}

// Route to serve admin dashboard page
router.get("/admin", authenticateAdmin, async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders
    res.render("admin-dashboard", { data: orders }); // Send orders as JSON response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports.handler = serverless(app);
