const express = require('express');
const path = require('path');
const session = require('express-session');
const http = require('http');
const socketIO = require('socket.io');

const authRoutes = require('./routes/authentication');
const homeRoutes = require('./routes/dashboard');
const stocks = require('./scripts/stocks');

const app = express();
const PORT = 8880;
const server = http.createServer(app);
const io = socketIO(server);

// set some defaults
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: '123456789',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 300000}
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(authRoutes); 
app.use(homeRoutes);


// real-time updation of stock rates
function updateStockValues() {
    stocks.forEach(stock => {
        const randomChange = (Math.random() * 20 - 10).toFixed(2);
        stock.rate = (parseFloat(stock.rate) + parseFloat(randomChange)).toFixed(2);
    });
    return stocks;
}

const initialRates = [];
stocks.forEach(stock => {
    initialRates[stock.code] = parseFloat(stock.rate);
});

setInterval(() => {
    const updatedStocks = updateStockValues();
    io.emit('stockUpdate', updatedStocks.map(stock => ({
        code: stock.code,
        currentRate: stock.rate,
        initialRate: initialRates[stock.code]
    })));
}, 2000);


// default methods and server port listening
app.get('/', (req, res) => {
    const error = req.session.error || null;
    req.session.error = null;
    res.render('authentication', {error});
});

server.listen(PORT, () => {
    console.log(`open http://127.0.0.1:${PORT}`);
});
