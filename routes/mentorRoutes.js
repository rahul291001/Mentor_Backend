const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Mentor = require("../models/Mentor");

router.post("/:userId/mentor", async (req, res) => {
  try {
    const userId = req.params.userId;
    const mentorDetails = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { mentor: mentorDetails } },
      { new: true }
    );

    res.json({ mentor: updatedUser.mentor });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:userId/mentor/:mentorId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const mentorId = req.params.mentorId;

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { mentor: { _id: mentorId } } },
      { new: true }
    );

    res.json({ mentor: updatedUser.mentor });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/:userId/mentor/:mentorId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const mentorId = req.params.mentorId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const mentor = user.mentor.find((t) => t._id.toString() === mentorId);

    if (!mentor) {
      return res.status(404).json({ error: "mentor not found" });
    }

    res.json({ mentor });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:userId/mentor/:mentorId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const mentorId = req.params.mentorId;
    const { completionStatus } = req.body; 

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, "mentor._id": mentorId },
      { $set: { "mentor.$.completionStatus": completionStatus } },
      { new: true }
    );

    res.json({ mentor: updatedUser.mentor });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
