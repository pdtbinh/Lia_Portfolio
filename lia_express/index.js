/*
###################
# ENV variables #
###################
*/
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

/*
###################
# Requirements #
###################
*/
// Express tools
const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');


// Authentication & Authorization
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local');

const MongoStore = require('connect-mongo');

// Express routers
const loginRoute = require('./routes/login');
const userRoute = require('./routes/user');
const projectRoute = require('./routes/project');

// Database
const { User, joiUser } = require('./models/user');
const { Project, joiProject } = require('./models/project');
const { Like, joiLike } = require('./models/like');

/*
###################
# Connect to DB #
###################
*/
const mongoose = require('mongoose');

const secret = process.env.SECRET || 'secret';

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/lia';
mongooseConnect().catch(err => console.log(err));
// 'mongodb://localhost:27017/lia'
async function mongooseConnect() {
    await mongoose.connect(dbUrl);
    console.log('Database connected...');
}

/*
###################
# Express Setting #
###################
*/
// -> For production
app.set('trust proxy', 1);
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
//app.use(bodyParser.json());
app.use(cookieParser(secret));

app.use(expressSession(
    {
        store: MongoStore.create({
            mongoUrl: dbUrl,
        }),
        resave: true, 
        saveUninitialized: true, 
        secret: secret,
        cookie: {
            httpOnly: true,
            expires: Date.now() + 1000 * 3600 * 24 * 7,
            maxAge: 1000 * 3600 * 24 * 7,
            sameSite: 'none',
            secure: true,
        }
    })
)
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    // origin : 'http://localhost:3000',
    origin : 'https://optimistic-swartz-769ccf.netlify.app', //(Whatever your frontend url is)
    credentials: true, // allow session cookie from browser to pass through
}))
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// -> For development
app.use(morgan('tiny'))

/*
###################
# Express Routes  #
###################
*/

// -> Users
app.use('/api', userRoute);

// -> Login
app.use('/api/auth', loginRoute);

// -> Projects
app.use('/api/project', projectRoute);

// // To make sure frontend is served
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }

// -> Listening to port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Running backend...');
})