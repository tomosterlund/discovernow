const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const User = require('./../../models/User');

router.post('/registration', async (req, res) => {
    const userData = JSON.parse(req.body.user);
    const name = userData.name;
    const email = userData.email;
    const password = userData.password;
    let image = '';

    if (req.file) {
        image = req.file.filename;
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
    const parsedBody = JSON.parse(req.body.user);
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
})

router.get('/verified', (req, res) => {
    res.json({user: req.session.user || null});
})

router.get('/signout', (req, res) => {
    req.session.destroy();
    return res.json({ signoutSuccess: true });
})

module.exports = router;