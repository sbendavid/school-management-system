const express = require("express");
const cors = require("cors");

const indexRoute = require("./src/routes/index");
const CONFIG = require("./src/config/config");
const connectDB = require("./src/config/db");
const swaggerDocs = require("./src/utils/swagger");

const PORT = CONFIG.ENV.PORT;

// Initialize app and environment variables
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Connect to the database
connectDB();

// Route middlewares
app.use("/api/v1", indexRoute);

swaggerDocs(app);

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
