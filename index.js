const express = require('express');
// requiring the cookies
const cookiesParser = require('cookie-parser');
const app = express();
const port = 4040;
// import the layout package
const expressLayouts = require('express-ejs-layouts');
const db = require('./conifg/mongoose');

app.use(express.urlencoded());
app.use(cookiesParser());


app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(express.static('./assets'));
app.use(expressLayouts);

// use express route 
// app.use('/',require('./routes/index'))    or both will go to index.js of routes folder
app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err) {
   if(err) {
      console.log(`Error on running the server: ${err}`);
   }
   console.log(`Yup! Server is running on port: ${port}`);
});
