const express = require('express');
const router = express.Router();
const users = require('../scripts/users');


// SIGN IN
router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    req.session.error = null;

    if (user) {
        req.session.isAuthenticated = true;
        req.session.user = user;
        res.redirect('/home');
    } else {
        req.session.error = "Invalid email or password, please try again!";
        res.redirect('/');
    }
});

// SIGN UP
router.post('/signup', (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    req.session.error = null;

    const user = users.find(user => user.email == email);
    if (user) {
        req.session.error = 'Email already exists, use another please!';
        res.redirect('/');
    } else {
        if (password === confirmPassword) {
            var newUser = { name, email, password, 'stocks':[] };
            users.push(newUser);
            
            req.session.isAuthenticated = true;
            req.session.user = newUser;
            res.redirect('/home');            
        } else {
            req.session.error = 'Passwords dont match, please try again!2>';
            res.redirect('/');
        }
    }
});


module.exports = router;
