const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [
    {
      taskId: String,
      taskName: String,
      assignedTo: String,
      priority: String,
      dueDate: Date,
      completionStatus: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// // backend/models/User.js

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;
