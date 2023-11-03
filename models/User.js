const mongoose = require('mongoose');

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
    medicines: [
      {
          medicineId: {
              type: String,
              required: true,
          },
          name: {
              type: String,
              required: true,
          },
          dates: [
              {
                  type: String,
                  required: true,
              },
          ],
          additionalData: [
              {
                  type: String,
              },
          ],
      },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
