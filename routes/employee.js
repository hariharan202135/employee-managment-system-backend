const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ CREATE EMPLOYEE
router.post("/", authMiddleware, async (req, res) => {
  const { name, email, department, salary } = req.body;

  if (!name || !email || !department || !salary) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const employee = new Employee({ name, email, department, salary });
  await employee.save();

  res.status(201).json({ message: "Employee created", employee });
});

// ✅ GET ALL EMPLOYEES
router.get("/", authMiddleware, async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// ✅ UPDATE EMPLOYEE  (🔥 THIS WAS MISSING / WRONG)
router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  const employee = await Employee.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.json({ message: "Employee updated", employee });
});

// ✅ DELETE EMPLOYEE
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  const employee = await Employee.findByIdAndDelete(id);

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.json({ message: "Employee deleted" });
});

module.exports = router;
