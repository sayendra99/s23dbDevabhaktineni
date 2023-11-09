const mongoose = require("mongoose")
const GuitarSchema = mongoose.Schema({
type: String,
cost: Number,
material: String
})
module.exports = mongoose.model("Guitar",GuitarSchema)