const Post = require('../models/post');
// Define the home function
// function home(req, res) {
//     // console.log(req.cookies);
//     // res.cookie('user_id','xxx0');
//     // Your logic for handling the home route
    // return res.render('home',{
    //     title:'Home' 
    // })
// }

async function home(req, res) {
    try {
        const posts = await Post.find({}).populate('user').populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        }).exec();
        return res.render('home', {
            title: 'Home',
            posts: posts
        });
    } catch (err) {
        // Handle error
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
}


// Export the home function
module.exports = {
    home
};
