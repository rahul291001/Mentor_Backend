const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-password",
  },
});

router.post("/send-email", async (req, res) => {
  try {
    const { userId, taskId, recipientEmail } = req.body;

    const mailOptions = {
      from: "your-email@gmail.com",
      to: recipientEmail,
      subject: "Task Details",
      html: `
        <h1>Task Details</h1>
        <p>Task ID: ${taskId}</p>
        <!-- Add more task details here -->
        <button onclick="completeTask()">Complete Task</button>
        <script>
          function completeTask() {
            // Send a request to your backend to update task status
            fetch(\`http://localhost:3000/api/users/\${userId}/tasks/\${taskId}\`, {
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

    res.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
