const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    mentorId: String,
    profile: {
        profile_image: String,
        name: String,
        skills: [String], 
        bio: String,
    },
    education: {
        college_name: String,
        degree: String, 
        year_of_studying: String,
    },
    professional_info: {
        company_name: String,
        role: String,
        year: String,
    },
});

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
    phonenumber: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mentor: [mentorSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
