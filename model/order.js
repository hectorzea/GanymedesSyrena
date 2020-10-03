const moongose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = moongose.Schema;
const SearchOrderSchema = new Schema({
    query: {
        type: String,
        required: [true, "Search query is required"]
    },
    provider: {
        type: String,
        required: [true, "Provider is required"]
    },
    options: {
        username: {
            type: String
        },
        password: {
            type: String
        }
    },
    //received, processing, fullfilled
    orderStatus: {
        type: String,
    },
    callbackUrl: {
        type: String
    },
    date: {
        type: Date
    },
    user: { type: Schema.Types.ObjectId, ref: "User" }
});
module.exports = moongose.model('SearchOrder', SearchOrderSchema);