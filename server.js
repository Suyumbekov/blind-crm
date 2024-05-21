const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const { format, parse } = require("date-fns");
const mongoose = require("mongoose");
const config = require("./db.config");
const Order = require("./models/Order");
const Worker = require("./models/Worker");
const Fabric = require("./models/Fabric");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for all requests
app.use(cors());

// MongoDB connection
mongoose
  .connect(config.mongodb.url, config.mongodb.options)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err.message);
  });

// Middleware to parse FormData
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to fetch orders from the database
app.get("/api/orders", async (req, res) => {
  try {
    const workers = await Worker.find();

    // Fetch all orders and populate the worker name and sizes
    const orders = await Order.find();
    console.log(orders);
    const status = orders.filter((order) => order.status === 1).length;
    res.json({ data: orders, workers: workers, status_counter: status });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to update the status of an order
app.put("/api/order/:id", async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  try {
    // Find the order by ID and update its status
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// // Route to handle POST requests from the form
app.post("/api/order", async (req, res) => {
  try {
    console.log("New order created");

    // Parse date string into JavaScript Date object using date-fns
    const parsedDate = parse(req.body.date, "yyyy-MM-dd", new Date());

    // Format date using date-fns
    const formattedDate = format(parsedDate, "dd/MM/yyyy");

    // Create a new order instance using the request body
    const order = new Order({
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      type: req.body.type,
      dimensions: req.body.dimensions,
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

// // Route to handle POST requests from the form
app.post("/api/worker", async (req, res) => {
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

app.post("/api/fabric", async (req, res) => {
  try {
    console.log("New fabric created");

    // Create a new order instance using the request body
    const fabric = new Fabric({
      name: req.body.name,
      amount: req.body.amount,
    });

    // Save the order to the database
    await fabric.save();

    res
      .status(201)
      .json({ message: "Fabric created successfully", fabric: fabric });
  } catch (err) {
    console.error("Error saving fabric to database:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/fabrics", async (req, res) => {
  try {
    const fabrics = await Fabric.find();

    res.json({ data: fabrics });
  } catch (error) {
    console.error("Error fetching fabrics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// // Dummy authentication logic
// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   // You can replace this dummy authentication logic with your actual authentication logic
//   if (username === "admin" && password === "admin123") {
//     res.json({ success: true });
//   } else {
//     res.json({ success: false, message: "username or password is incorrect" });
//   }
// });

// // Middleware to authenticate admin routes
// function authenticateAdmin(req, res, next) {
//   // Implement your authentication logic here
//   const isLoggedIn = true; // Example: check if user is logged in
//   if (isLoggedIn) {
//     next(); // Proceed to the next middleware
//   } else {
//     res.redirect("/"); // Redirect to login page if not authenticated
//   }
// }

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
