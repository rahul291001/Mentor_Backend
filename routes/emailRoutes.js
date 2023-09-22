const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Task = require("../models/Task");

const CLIENT_ID =
  "817374973958-e2dar19f83ik523jb1b1ugc58clckutk.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const ACCESS_TOKEN =
  "ya29.a0AfB_byA0lszQfOgncCNV4i99Xp3Xq7FXwlIDvhum5ytdhRlARrRm43AC0Hqd4jmbQCpLo1bxrKk0FFQcO7JBV3Tcjatfd6veZgttagPXDPToDCT6teeH7M96bCs0J45xYs9zhVPhw_s0cy3Y7QxgzqLw36K_YT7uHg90aCgYKAfkSARISFQGOcNnC__caOYG7TxllowcWXaLmhw0171";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "vishwa29naik@gmail.com",
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    accessToken: ACCESS_TOKEN,
  },
});

router.post("/send-email", async (req, res) => {
  try {
    const { userId, taskId, recipientEmail, taskName, taskDetails } = req.body;

    const mailOptions = {
      from: "vishwa29naik@gmail.com",
      to: recipientEmail,
      subject: `Task Details for Task ID ${taskId}`,
      html: `
        <h1>Task Details</h1>
        <p>Task ID: ${taskDetails.taskId}</p>
        <p>Task Name: ${taskDetails.taskName}</p>
        <p>Assigned To: ${taskDetails.assignedTo}</p>
        <p>Priority: ${taskDetails.priority}</p>
        <p>Due Date: ${taskDetails.dueDate}</p>
        <p>Completion Status: ${taskDetails.completionStatus}</p>
        <!-- Add more task details here -->
       <button onclick="completeTask('${taskId}', '${userId}')">Complete Task</button>
        <script>
          function completeTask(taskId, userId) {
            alert("hello");
            fetch(\`http://localhost:3000/api/users/${userId}/tasks/${taskId}\`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ completionStatus: "completed" }),
            })
              .then(response => {
                if (response.ok) {
                  alert("Task marked as completed");
                } else {
                  alert("Error marking task as completed");
                }
              })
              .catch(error => {
                console.error("Error marking task as completed:", error);
                alert("Error marking task as completed");
              });
          }
        </script>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.json({ message: `Email sent successfully for Task ID ${taskId}!` });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
