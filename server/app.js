const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const shortid = require('shortid');
const path = require('path');
app.use(cors())
app.use(bodyParser.json());

//initializing multer
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'client/dist/images');
    },
    filename: (req, file, cb) => {
        cb(null, shortid.generate() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'video/mp4' ||
        file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

//session
app.use(session({
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: 'sessions'
    }),
    secret: 'shhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));

// DB-setup
const dbUri = '';
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    let port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
        console.log('Connected to MongoDB Atlas');
    });
})
.catch(err => console.log(err));

const baseRoutes = require('./routes/api/base-routes');
const contentCreationRoutes = require('./routes/api/content-creation');
const contentRoutes = require('./routes/api/content');
app.use('/api/base', baseRoutes);
app.use('/api/content', contentCreationRoutes);
app.use('/api/content', contentRoutes);

//HANDLE PROD
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/../client/'));
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/../client/index.html'));
}