const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    content: String,
    comments: [{ 
        // 儲存的類型為 id
        type: Schema.Types.ObjectId,
        // 指向 comment model
        ref: 'comment'
    }]
});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;
