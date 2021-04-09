const { Schema, model } = require("mongoose");

const fileSchema = Schema({
    admin: { type: String, required: true, trim: true },
    path: { type: String, trim: true },
    name: { type: String, trim: true },
    xlink: { type: String, trim: true },
    type: { type: String, trim: true, default: '' }
});
const m = model("audios", fileSchema);
module.exports.song = m;