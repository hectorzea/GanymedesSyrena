const moongose = require('mongoose');

let Schema = moongose.Schema;
const ProductSchema = new Schema({
    productTitle: {
        type: String,
    },
    price: {
        type: String,
    },
    searchOrder: { type: Schema.Types.ObjectId, ref: "SearchOrder" }
});
module.exports = moongose.model('Product', ProductSchema);