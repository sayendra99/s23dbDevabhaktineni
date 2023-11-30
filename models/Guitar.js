const mongoose = require("mongoose")
const GuitarSchema = mongoose.Schema({
type: String,
cost: Number,
min:0,
max:9999999,
material: String
});
module.exports = mongoose.model("Guitar",GuitarSchema)