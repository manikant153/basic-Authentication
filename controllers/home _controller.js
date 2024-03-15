// module.exports.home = function(req,res){
//     return res.end('<h1> Express is up for codeial</h1>');
// }
// home_controller.js

// Define the home function
function home(req, res) {
    console.log(req.cookies);
    res.cookie('user_id','xxx0');
    // Your logic for handling the home route
    return res.render('home',{
        title:'Home' 
    })
}

// Export the home function
module.exports = {
    home
};
