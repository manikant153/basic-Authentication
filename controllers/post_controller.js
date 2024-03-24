const Post = require('../models/post');
console.log("Post controller loaded");



// module.exports.create = function(req,res){
//     Post.create({
//         content : req.body.content,
//         user : req.user._id
//     }, function(err,post){
//         if(err){console.log("error in creating a post"); return;}

//         return res.redirect('back');
//     });
// }


module.exports.create = function(req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    })
    .then(post => {
        return res.redirect('back'); 
    })
    .catch(err => {
        console.log('error in creating a post', err);
        return res.status(500).send('Error in creating a post');
    });
}
