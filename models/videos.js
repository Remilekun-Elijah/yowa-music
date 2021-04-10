const { Schema, model } = require("mongoose");

const fileSchema = Schema({
    admin: { type: String, required: true, trim: true },
    path: { type: String, trim: true },
    name: { type: String, trim: true },
    type: { type: String, trim: true }
});
const m = model("videos", fileSchema);
module.exports.video = m;