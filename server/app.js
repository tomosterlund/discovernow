const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const shortid = require('shortid');
const path = require('path');
app.use(cors())
app.use(bodyParser.json());

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

// DB-setup
const dbUri = 'mongodb+srv://tommy:tommy123@cluster0.6ne0u.mongodb.net/discover-local?retryWrites=true&w=majority';
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
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/../index.html'));
}