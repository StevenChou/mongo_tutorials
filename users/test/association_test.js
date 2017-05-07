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

    
    it('saves a relation between a user and a blogpost', (done) => {
        User.findOne({ name: 'Steven' })
            .populate('blogPosts')
            .then((user) => {
                // 只載入一層相依關聯
                // console.log('user obj:', user);
                // console.log('user -> blogPosts[0]:', user.blogPosts[0]);
                assert(user.blogPosts[0].title === 'JS is Great');
                done();
            });
    });

    it('saves a full relation graph', (done) => {
        User.findOne({ name: 'Steven' })
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    // 指定載入的 model
                    model: 'comment',
                    populate: {
                        path: 'user',
                        // 指定載入的 model
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                // console.log('user obj:', user);
                // console.log('user -> blogPosts[0]:', user.blogPosts[0]);
                // console.log('user -> blogPosts[0] -> comments[0]:',
                //         user.blogPosts[0].comments[0]);

                assert(user.name === 'Steven');
                assert(user.blogPosts[0].title === 'JS is Great');
                assert(user.blogPosts[0].comments[0].content === 'Congrats on great post');
                assert(user.blogPosts[0].comments[0].user.name === 'Steven');

                done();
            });
    });
});
