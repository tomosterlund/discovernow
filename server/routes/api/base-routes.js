const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
AWS.config.getCredentials(err => {
    if (err) {
        console.log('Error', err);
    } else {
        console.log('Access key loaded');
    }
});
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
const multer = require('multer');
const multerS3 = require('multer-s3');
const User = require('./../../models/User');

const getDate = () => {
    let d = new Date();
    let hour = d.getHours();
    let date = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    return fullDate = `${hour}${date}${month}${year}`;
}

let uploadPic = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'discover-test-files',
        acl: 'public-read',
        key: function (req, file, cb) {
        cb(null, getDate() + file.originalname)
        }
    })
});

router.post('/registration', uploadPic.single('image'), async (req, res) => {
    const userData = JSON.parse(req.body.user);
    const name = userData.name;
    const email = userData.email;
    const password = userData.password;
    let image = '';

    if (req.file) {
        image = getDate() + req.file.originalname;
    } else if (!req.file) {
        image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/768px-User_font_awesome.svg.png';
    }

    // checking if user exists & res if yes
    try {
    const userDoc = await User.findOne({ email: email })
    if (userDoc) {
        return res.json({ success: false })
    }

    // hasing pw and creating user
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
        imageUrl: image
    })
    await user.save()
            console.log('Saved user');
            return res.json({ success: true, user: user });
    } catch (error) {
        console.log(error);
    }
    
});

router.post('/login', async (req, res, next) => {
    try {
        const parsedBody = req.body;
        const email = parsedBody.email;
        const password = parsedBody.password;
        console.log('Name: "' + email + '" Password: "' + password + "\"");
        const userInDb = await User.findOne({ email: email }).lean();
        const doMatch = await bcrypt.compare(password, userInDb.password);
        if (doMatch) {
            req.session.user = userInDb;
            res.json({loginSuccess: true, loggedInUser: req.session.user || false});
        } else if (!doMatch) {
            res.json({loginSuccess: false, loggedInUser: false});
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/verified', (req, res) => {
    res.json({user: req.session.user || null});
})

router.get('/signout', (req, res) => {
    req.session.destroy();
    return res.json({ signoutSuccess: true });
})

module.exports = router;