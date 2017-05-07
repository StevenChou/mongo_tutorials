const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: String,
    user: {
        // 儲存的類型為 id
        type: Schema.Types.ObjectId,
        // 指向 users Collection
        // 指向 user model
        ref: 'user'
    }
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
