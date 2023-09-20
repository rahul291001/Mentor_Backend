const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  taskName: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["low", "normal", "high"],
    default: "normal",
  },
  dueDate: {
    type: Date,
    required: true,
  },
  completionStatus: {
    type: String,
    enum: ["progress", "completed", "issue"],
    default: "progress",
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
