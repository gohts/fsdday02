// load libraries
const express = require('express');
const hbs = require('express-handlebars')

// configure environment
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000;
const app = express();

app.engine('hbs', hbs({defaultLayout : 'default.hbs'}));
app.set('view engine', 'hbs');

// routings
app.get('/', function (req, res) {
    res.render('home');
});

app.get('/roll', function (req, res) {
    let diceVal1 = Math.ceil(Math.random() * 5);
    let diceVal2 = Math.ceil(Math.random() * 5);
    res.render('roll', {
        dice1 : diceVal1,
        dice2 : diceVal2,
        diceImg1 : 'images/roll' + diceVal1 + '.png',
        diceImg2 : 'images/roll' + diceVal2 + '.png'
    });
});

// static file
app.use(express.static(__dirname + '/public'));

app.get('*', (req,res) => {
    // res.type = 'text/html';
    res.redirect('/');
});

// initialize app
app.listen(PORT, () => {
    console.info(`Application started at PORT: ${PORT} on ${new Date()}`);
})