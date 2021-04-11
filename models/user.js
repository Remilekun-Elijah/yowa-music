// jshint esversion: 6
const { model, Schema } = require("mongoose");

const schema = Schema({
    name: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: false }
});
const newModel = model("user", schema);

module.exports.admin = newModel;