// user model

const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters'
        },
        required: [true, 'Name is required.']
    },
    postCount: Number,
    posts: [PostSchema]
});

// create user model
// 如果 database 沒有 user collection，會自行建立
const  User = mongoose.model('user', UserSchema);

module.exports = User;
