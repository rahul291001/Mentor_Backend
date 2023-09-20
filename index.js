//=========================================================================>>>>>>Original
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/zboxdata", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/users", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/taskRoutes"));
app.use("/api", require("./routes/emailRoutes")); // Add this line

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

/////////////////////////////////////////////////////////////////////////////////////>>>>>>
//all roures
/* post : http://localhost:3000/api/users/register    add user
  post : http://localhost:3000/api/users/login   login
  post : http://localhost:3000/api/users/65017b2ac61448da26cff99d/tasks     add task
  get : http://localhost:3000/api/users/650173d3e3ca678812a9c823   get all task
  get : http://localhost:3000/api/users/650173d3e3ca678812a9c823/tasks/65017ae1c61448da26cff99a   get single task

  View a single task by ID (GET): http://localhost:5000/api/users/:userId/tasks/:taskId
Find user by ID (GET): http://localhost:5000/api/users/:userId

Register User (POST): http://localhost:5000/api/users/register
Login (POST): http://localhost:5000/api/users/login
Add Task (POST): http://localhost:5000/api/users/:userId/tasks
Replace :userId with the actual user ID you get after registering. */

//delete
// to DELETE Single task : http://localhost:3000/api/users/:userId/tasks/:taskId
//  detete with ids:  http://localhost:3000/api/users/65017b2ac61448da26cff99d/tasks/6501800ddf02b95f37d4f58b

//get single task : http://localhost:3000/api/users/650173d3e3ca678812a9c823/tasks/65017ae1c61448da26cff99a

// {
//   "_id": {
//     "$oid": "650173d3e3ca678812a9c823"
//   },
//   "username": "john_doe",
//   "email": "john@example.com",
//   "password": "password123",
//   "tasks": [
//     {
//       "_id": "60f9564f45fb7f5d51234569",
//       "userId": "650173d3e3ca678812a9c823",
//       "taskId": "T001",
//       "taskName": "Finish Project",
//       "priority": "high",
//       "dueDate": "2023-09-30T00:00:00.000Z",
//       "completionStatus": "progress",
//       "__v": 0
//     },
//     {
//       "_id": "60f9564f45fb7f5d5123456a",
//       "userId": "650173d3e3ca678812a9c823",
//       "taskId": "T002",
//       "taskName": "Review Code",
//       "priority": "normal",
//       "dueDate": "2023-09-25T00:00:00.000Z",
//       "completionStatus": "completed",
//       "__v": 0
//     },
//     {
//       "_id": "60f9564f45fb7f5d5123456b",
//       "userId": "650173d3e3ca678812a9c823",
//       "taskId": "T003",
//       "taskName": "Test Application",
//       "priority": "low",
//       "dueDate": "2023-10-05T00:00:00.000Z",
//       "completionStatus": "progress",
//       "__v": 0
//     }
//   ],
//   "__v": 0
// }

// {
//   "_id": {
//     "$oid": "650173d3e3ca678812a9c823"
//   },
//   "username": "john_doe",
//   "email": "john@example.com",
//   "password": "password123",
//   "tasks": [
//     {
//       "_id": "60f9564f45fb7f5d51234569",
//       "userId": "60f9564f45fb7f5d51234567",
//       "taskId": "T001",
//       "taskName": "Finish Project",
//       "priority": "high",
//       "dueDate": "2023-09-30T00:00:00.000Z",
//       "completionStatus": "progress",
//       "__v": 0
//     },
//     {
//       "_id": "60f9564f45fb7f5d5123456a",
//       "userId": "60f9564f45fb7f5d51234567",
//       "taskId": "T002",
//       "taskName": "Review Code",
//       "priority": "normal",
//       "dueDate": "2023-09-25T00:00:00.000Z",
//       "completionStatus": "completed",
//       "__v": 0
//     },
//     {
//       "_id": "60f9564f45fb7f5d5123456b",
//       "userId": "60f9564f45fb7f5d51234567",
//       "taskId": "T003",
//       "taskName": "Test Application",
//       "priority": "low",
//       "dueDate": "2023-10-05T00:00:00.000Z",
//       "completionStatus": "progress",
//       "__v": 0
//     }
//   ]
//   "__v": 0
// }
