const express = require("express");
const mongoose = require("mongoose");
const serverless = require("serverless-http")
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://Rahul:Rahul*4321@cluster0.u7hxtcm.mongodb.net",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);


if(process.env.ENVIORNMENT === 'lambda'){
  module.exports.handler = serverless(app)
}else{
  const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
}

app.use("/api/users", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/taskRoutes"));
app.use("/api", require("./routes/emailRoutes"));
app.use('/api/data', require("./routes/dataRoutes"));


