// ` when comment is loaded in html file it will have the user._id which can be changed using inspect(go to developer mode anyone can change the id in it
//     <input type="hidden" name="post" value="<% post._id %>">
//       The value="<% post._id %>" Can be changed . for this we need to store in posts model too
//       why we needed this
//       this will keep track that user: A has commented ,Although anyone can changed but posts.js will store the original
//        user._id
//       )`const Comment = require('../models/comment');
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res) {
    try {
        const post = await Post.findById(req.body.post);
        if (!post) {
            return res.status(404).send("Post not found");
        }

        // Store the original user ID in the post
        const originalUserId = req.user._id;

        const comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: originalUserId // Use the original user ID
        });

        // Push the comment to the post's comments array
        post.comments.push(comment);
        await post.save();

        res.redirect('/');
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
};
