const express = require('express');
const router = express.Router();
const stocks = require('../scripts/stocks');
const users = require('../scripts/users');


router.get('/home', (req, res) => {
    if (req.session.isAuthenticated) {
        const userStocks = req.session.user.stocks || [];
        const subscribedStocks = [];
        userStocks.forEach(stock => {
            const stockDetail = stocks.find(stockie => stockie.code === stock);
            if (stockDetail) subscribedStocks.push(stockDetail);
        });
        res.render('dashboard', {user: req.session.user, stocks: stocks, subscribedStocks: subscribedStocks});
    } else {
        res.redirect('/');
    }
});

router.post('/subscribe', (req, res) => {
    if (req.session.isAuthenticated) {
        const stock = req.body.stock;
        if (stock) {
            const user = users.find(user => user.email === req.session.user.email);
            user.stocks.push(stock);
            req.session.user = user;
        }
        res.redirect('/home');
    } else {
        res.redirect('/');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    });
});

module.exports = router;