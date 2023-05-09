const mongoose = require('mongoose')

const muv = require('mongoose-unique-validator')

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    sizes: { type: Array, required: false }
})

mongoose.plugin(muv)

module.exports = mongoose.model('product', productSchema)