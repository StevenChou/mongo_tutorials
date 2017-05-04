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
    // postCount: Number,
    posts: [PostSchema],
    likes: Number
});

// 建立虛擬型別 *當使用 steven.postCount 就好 call 這個 function
// 如果使用 arrow function ===> this 參考到 這個 file
UserSchema.virtual('postCount').get(function() {
    // this 參考到 current instance model
    return this.posts.length;
});

// create user model
// 如果 database 沒有 user collection，會自行建立
const  User = mongoose.model('user', UserSchema);

module.exports = User;
