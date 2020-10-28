// load libraries
const express = require('express');
const handlebars = require('express-handlebars')

const roll_dice = () => Math.ceil(Math.random() * 5);

// configure environment
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000;

// create an instance of express
const app = express();

// configure HBS
app.engine('hbs', handlebars({defaultLayout : 'default.hbs'}));
app.set('view engine', 'hbs');

// configure express
app.get(['/', '/index.html'], function (req, res) {
    res.status(200);
    res.type('text/html');
    res.render('home');
});

app.get('/roll', function (req, res) {
    let diceVal1 = roll_dice();
    let diceVal2 = roll_dice();
    res.render('roll', {
        dice1 : diceVal1,
        dice2 : diceVal2,
        diceImg1 : 'images/roll' + diceVal1 + '.png',
        diceImg2 : 'images/roll' + diceVal2 + '.png'
    });
});

// load or mount the static resources directory
app.use(express.static(__dirname + '/public'));

app.use((req,res) => {
    res.redirect('/');
});

// start express
app.listen(PORT, () => {
    console.info(`Application started at PORT: ${PORT} on ${new Date()}`);
})