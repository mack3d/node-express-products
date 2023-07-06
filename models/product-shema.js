const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        require: true,
    },
    name: String,
    stock: Number,
    price_gross: Number,
    price_net: Number,
    suppliers: [ String ],
    suppliers_code: [ String ],
    allegro_active: [ Number ],
    allegro_ended: [ Number ],
    numberOfCode: String,
},{
    versionKey: false
});

ProductSchema.pre('validate', function(next) {
    this.numberOfCode = this.code.split('-')[0]
    next();
});

const Products = mongoose.model('products', ProductSchema);

module.exports = Products