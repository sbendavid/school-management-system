const express = require("express");
const dotenv = require("dotenv");

const indexRoute = require("./src/routes/index");
const CONFIG = require("./src/config/config");
const connectDB = require("./src/config/db");

const PORT = CONFIG.ENV.PORT;

// Initialize app and environment variables
dotenv.config();
const app = express();
app.use(express.json());

// Connect to the database
connectDB();

// Route middlewares
app.use("/api/v1", indexRoute);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
