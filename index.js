// import dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
require("dotenv").config();

// import new Skill Swap routes
const userRoutes = require("./routes/userRoutes");
const swapRoutes = require("./routes/swapRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const searchRoutes = require("./routes/searchRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");

const { initializeSocket } = require("./socket");

const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app); //create server
const io = initializeSocket(server); //start io server

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// database connection (mongoDB)
mongoose
  .connect('mongodb+srv://mahima:2ehwgR1w48wnJOQc@skillswapdb.cadjhjl.mongodb.net/?retryWrites=true&w=majority&appName=SkillSwapDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB Connected for SkillSwap database");
  })
  .catch((err) => {
    console.log("unable to connect with MongoDB dataBase");
  });

// define Skill Swap routes
app.use("/api/users", userRoutes);
app.use("/api/swaps", swapRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: "Skill Swap Platform API is running" 
  });
});

// Example admin-ready middleware (to be used in routes as needed)
// function requireAdmin(req, res, next) {
//   if (req.user && req.user.role === "admin") return next();
//   return res.status(403).json({ error: "Admin access required" });
// }

// server run
server.listen(PORT, () => {
  console.log("Skill Swap Platform server is running on", PORT);
});
