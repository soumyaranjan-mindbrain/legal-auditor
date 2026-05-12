const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
console.log(">>> SERVER INITIALIZING ON NEW PORT 5005 WITH HARDCODED CORS <<<");

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

// ================= DB CONNECT =================
connectDB();

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  
app.use(cookieParser());

// ================= AGGRESSIVE CORS =================
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.FRONTEND_URL,
  process.env.LANDING_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
}));

// ================= ROUTES =================
app.use("/api/auth", require("./routes/Auth/auth.routes"));
app.use("/api/dashboard", require("./routes/Dashboard/dashboard.routes"));
app.use("/api/documents", require("./routes/Documents/document.routes"));
app.use("/api/playbooks", require("./routes/PlayBook/playbook.routes"));
app.use("/api/audit", require("./routes/Audit/audit.routes"));
app.use("/api/settings", require("./routes/Settings/settings.routes"));

// ================= HEALTH CHECK =================
app.get("/api/health", (req, res) => {
  res.status(200).json({ 
    success: true,
    message: "Server is healthy and active",
    port: process.env.PORT || 5005 
  });
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5005; 
app.listen(PORT, () => {
  console.log(`>>> ENTERPRISE SERVER ACTIVE ON PORT ${PORT} <<<`);
});