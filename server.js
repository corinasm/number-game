var express = require('express');
var path =require('path');
var bodyParser = require('body-parser');
var session = require('express-session'); 

var app = express(); 
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({secret: 'alphacount'})); 

app.get('', function(request, response) {
    console.log('/');
    response.redirect('/new-game');
});

app.get('/new-game', function(request, response) {
    console.log('/new-game');
    request.session.ran_num = Math.floor((Math.random()*100)+1);
    console.log("Random Number: ", request.session.ran_num);
    response.render('main', {message: '', showRes: "newGame" });
});

app.get('/play', function(request, response) {
    console.log('/play');
    console.log("Player's Number: ", request.session.player_num);
    const ranNum = request.session.ran_num;
    const playerNum = request.session.player_num;
    if (playerNum > ranNum) {
        response.render('main', {message: "Too High!", showRes: "high"}) 
    } else if (playerNum < ranNum) {
        response.render('main', {message: "Too Low!", showRes: "low"}) 
    } else {
        response.render('main', {message: "Good guess!", rightGuess: ranNum, messageGuess: "was the number.", showRes: "success"}) 
    }   
});

app.post('/process', function(request, response) {
    request.session.player_num = request.body.number;
    console.log("Player's Number: ", request.session.player_num);
    response.redirect('/play');
});

app.listen(8200, function() {
 console.log("listening on port 8200");
});