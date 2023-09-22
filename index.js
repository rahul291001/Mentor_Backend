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
app.use("/api", require("./routes/emailRoutes"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
