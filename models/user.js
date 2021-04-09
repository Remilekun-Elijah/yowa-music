// jshint esversion: 6
const mongoose = require("mongoose");

const user = mongoose.Schema({
    name: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: false }
});
const userModel = mongoose.model("user", user);

module.exports.admin = userModel;