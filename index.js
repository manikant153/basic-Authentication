// const express = require('express');
// const cookiesParser = require('cookie-parser');
// const expressLayouts = require('express-ejs-layouts');
// const db = require('./conifg/mongoose');
// const session = require('express-session');
// const passport = require('passport');
// const passportLocal = require('./conifg/passport-local-strategy');
// const MongoStore = require('connect-mongo')(session); // Note the use of (session) here

// const app = express();
// const port = 2000;

// app.use(express.urlencoded());
// app.use(cookiesParser());
// app.use(express.static('./assets'));
// app.use(expressLayouts);
// app.set('layout extractStyles', true);
// app.set('layout extractScripts', true);
// app.set('view engine', 'ejs');
// app.set('views', './views');

// app.use(session({
//    name: 'PRACTICE',
//    secret: "blahsomething",
//    saveUninitialized: false,
//    resave: false,
//    cookie: {
//       maxAge: (1000 * 60 * 100)
//    },
//    store: new MongoStore({
//       mongooseConnection: db,
//       autoRemove: 'disabled'
//    }),
//    // This function will be called when the session is saved
//    // This enables the save of sessions even when connection to MongoDB goes down temporarily
//    // Since MongoDB is non-blocking, this function will be called when the connection is re-established
//    function (err) {
//       console.log(err || 'connect-mongodb setup ok');
//    }
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(passport.setAuthenticatedUser);
// app.use('/', require('./routes'));

// app.listen(port, function (err) {
//    if (err) {
//       console.log(`Error on running the server: ${err}`);
//    }
//    console.log(`Yup! Server is running on port: ${port}`);
// });


const express = require('express');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./conifg/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./conifg/passport-local-strategy');
const MongoStore = require('connect-mongo');

const app = express();
const port = 2000;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');
app.set('views', './views');

const store = MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/practice', // Replace with your MongoDB connection string
    mongooseConnection: db,
    autoRemove: 'disabled'
});

app.use(session({
    name: 'PRACTICE',
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: store,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error on running the server: ${err}`);
    }
    console.log(`Yup! Server is running on port: ${port}`);
});
