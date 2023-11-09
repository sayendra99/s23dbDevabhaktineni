const mongoose = require("mongoose")
const GuitarSchema = mongoose.Schema({
type: String,
cost: Number,
material: string
})
module.exports = mongoose.model("Guitar",
GuitarSchema)