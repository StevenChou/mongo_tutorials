// user model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String
});

// create user model
// 如果 database 沒有 user collection，會自行建立
// 回傳 user collection
const  User = mongoose.model('user', UserSchema);

module.exports = User;
