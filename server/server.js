require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const cors = require('cors')

connectDB();

app.use(express.json());

app.use(cors())

app.get("/", (req, res, next) => {
  res.send("Api running");
});

// Connecting Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));
const donationRoutes = require('./routes/donation');
app.use('/api/donations', donationRoutes);
app.use('/api/requests', require('./routes/request')); 
app.use('/api/bloodTypeCounts', require('./routes/bloodTypeCounts'));
// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
