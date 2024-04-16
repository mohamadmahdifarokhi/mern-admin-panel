const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    expired_at: {
        type: Date,
        required: true
    }
});

module.exports = Token = mongoose.model("tokens", TokenSchema);
