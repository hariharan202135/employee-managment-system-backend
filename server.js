const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

/* ✅ FULL CORS CONFIG (LOCAL + NETLIFY + VERCEL) */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://employeemanagmentfrontend21.netlify.app",
      "https://employee-managment-frontendproject1.vercel.app",
      "https://employee-managment-frontend2.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ VERY IMPORTANT: handle preflight
app.options("*", cors());

app.use(express.json());

/* ROUTES */
app.use("/api/auth", require("./routes/auth"));
app.use("/api/employees", require("./routes/employee"));

/* DATABASE */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Error:", err));

/* SERVER */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
