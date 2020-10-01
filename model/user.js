const moongose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let Schema = moongose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        unique: true,
        type: String,
        required: [true, "Mail is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
});
UserSchema.plugin(uniqueValidator, {message: "This mail is already registered xD"});
UserSchema.methods.toJSON = function() {
    let oUserData = this.toObject();
    delete oUserData.password;
    return oUserData;
};

module.exports = moongose.model('User', UserSchema);