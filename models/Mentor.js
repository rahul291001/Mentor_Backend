const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  profile_image: {
    type: String
  },
  name: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
  },
  bio: {
    type: String,
 },
  college_name: {
    type: String,
  },
  Degree: {
    type: String,
  },
  year_of_studying:{
    type: String,
  },
  
  company_name: {
    type: String,
  },
  role: {
    type: String,
  },
  
  year: {
    type: String
  }

});

const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = Mentor;
