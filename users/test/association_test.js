const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('Association', () => {
    let steven, blogPost, comment;

    beforeEach((done) => {
        steven = new User({ name: 'Steven' });
        blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });
        comment = new Comment({ content: 'Congrats on great post' });

        // mongoose 自動提取物件的 id，存入 array 中(建立關聯)
        steven.blogPosts.push(blogPost);
        // mongoose 自動提取物件的 id，存入 array 中(建立關聯)
        blogPost.comments.push(comment);
        // mongoose 自動提取物件的 id，存入 property 中(建立關聯)
        comment.user = steven;

        // (平行運算)當三個 save 都完成時，才會 call then
        Promise.all([steven.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });

    // mocha 只執行這一個測試程式
    it.only('saves a relation between a user and a blogpost', (done) => {
        User.findOne({ name: 'Steven' })
            .populate('blogPosts')
            .then((user) => {
                // console.log('user obj:', user);
                // console.log('user -> blogPosts[0]:', user.blogPosts[0]);
                assert(user.blogPosts[0].title === 'JS is Great');
                done();
            });
    });
});
