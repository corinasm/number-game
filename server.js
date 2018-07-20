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

app.get('/', function(request, response) {
    console.log("request.session.ran_num = ", request.session.ran_num);
    if ((typeof(request.session.ran_num) == "undefined")) {
        request.session.ran_num = Math.floor((Math.random()*100)+1); 
        console.log("Random Number: ", request.session.ran_num);
        response.render('main', {message: '', showRes: "newGame" })
    } else { 
        var playerNum = request.session.player_num;
        var ranNum = request.session.ran_num; 
        if (playerNum > ranNum) {
            response.render('main', {message: "Too High!", showRes: "high"}) 
        } else if (playerNum < ranNum) {
            response.render('main', {message: "Too Low!", showRes: "low"}) 
        } else {
            response.render('main', {message: "Good guess!", rightGuess: ranNum, messageGuess: "was the number.", showRes: "success"}) 
        }   
    }     
})
app.post('/process', function(request, response) {
    request.session.player_num = request.body.number;
    console.log("Player's Number: ", request.session.player_num);
    response.redirect('/');
})

app.get('/new-game', function(request, response) {
    request.session.destroy();
    response.redirect('/');
})

app.listen(8200, function() {
 console.log("listening on port 8200");
})