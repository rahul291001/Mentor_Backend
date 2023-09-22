const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Task = require("../models/Task");

// Create a new task for a user
router.post("/:userId/tasks", async (req, res) => {
  try {
    const userId = req.params.userId;
    const taskDetails = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { tasks: taskDetails } },
      { new: true }
    );

    res.json({ tasks: updatedUser.tasks });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:userId/tasks/:taskId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const taskId = req.params.taskId;

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { tasks: { _id: taskId } } },
      { new: true }
    );

    res.json({ tasks: updatedUser.tasks });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a single task by ID
router.get("/:userId/tasks/:taskId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const taskId = req.params.taskId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const task = user.tasks.find((t) => t._id.toString() === taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ task });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:userId/tasks/:taskId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const taskId = req.params.taskId;
    const { completionStatus } = req.body; // Only the completionStatus is needed

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, "tasks._id": taskId },
      { $set: { "tasks.$.completionStatus": completionStatus } },
      { new: true }
    );

    res.json({ tasks: updatedUser.tasks });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
