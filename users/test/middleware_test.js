const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
    let steven, blogPost;

    beforeEach((done) => {
        steven = new User({ name: 'Steven' });
        blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });
       

        // mongoose 自動提取物件的 id，存入 array 中(建立關聯)
        steven.blogPosts.push(blogPost);
        // (平行運算)當三個 save 都完成時，才會 call then
        Promise.all([steven.save(), blogPost.save()])
            .then(() => done());
    });

    it('users clean up dangling blogposts on remove', (done) => {
        steven.remove()
            .then(() => BlogPost.count())
            .then((count) => {
                assert(count === 0);
                done();
            });
    });
});
