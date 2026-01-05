const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

/* =========================
   ✅ FINAL CORS CONFIG
   =========================
   - Works for Netlify (any domain)
   - Works for Vercel
   - Works for localhost
   - Prevents browser blocking
*/
app.use(
  cors({
    origin: "*", // ✅ allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle preflight requests
app.options("*", cors());

/* =========================
   MIDDLEWARE
   ========================= */
app.use(express.json());

/* =========================
   ROUTES
   ========================= */
app.use("/api/auth", require("./routes/auth"));
app.use("/api/employees", require("./routes/employee"));

/* =========================
   DATABASE CONNECTION
   ========================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Error:", err));

/* =========================
   SERVER START
   ========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
