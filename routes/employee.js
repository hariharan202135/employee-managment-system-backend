const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const authMiddleware = require("../middleware/authMiddleware"); // ✅ FIXED

// CREATE EMPLOYEE
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, email, department, salary } = req.body;

    if (!name || !email || !department || !salary) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const employee = new Employee({ name, email, department, salary });
    await employee.save();

    res.status(201).json({ message: "Employee created", employee });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET ALL EMPLOYEES
router.get("/", authMiddleware, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE EMPLOYEE
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee updated", employee });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE EMPLOYEE
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
