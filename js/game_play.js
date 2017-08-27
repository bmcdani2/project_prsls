// Initialize the game
var game = new Game('McDaniel, Bradley');

// Create function that will "roll" user choices; that is, a function that will randomly choose a hand for each player

window.roll = function () {
    for (i = 1; i < 3; i++) {
        var pChoice = Math.floor(Math.random() * game['choices'].length);
        $('#player' + i + 'Choice').removeClass();
        $('#player' + i + 'Choice').addClass(game['choices'][pChoice]);
    };
};

// Fade in the body of the document using jQuery effects
$(document).ready(function(){ $('#mainBody').slideDown(1500); });

// Set the name of the game using jQuery DOM maniplulation
$('#gameName').text(game['name']);

// Bind to the button in the middle of the screen so that it plays the game when clicked. Use jQuery events.
$('#gameController').bind('click', function () {
    if (game['running'] == false) {
        if ($('#gameController').text() == 'New Game') {
		// Add 2 new players if there are none already. You can use a loop to make it easy.
            
            if (game['players'].length < 2) {
                do {
                    var p1 = prompt('Player1, enter your name...');
                } while(!p1 || p1.length < 3);
                game['addPlayer'](p1);
                $('#player1Name').text(p1);
                do {
                    var p2 = prompt('Player2, enter your name...');
                } while(!p2 || p2.length < 3);
                game['addPlayer'](p2);
                $('#player2Name').text(p2);
            };
        };
        
		// Start rolling 4 times a second by using the "setInterval" function and the "roll" function you created above.
	    var rolling	= setInterval(roll, 250);
    
		// Set the "game status" and "game controller" text to "rolling" and 'vs"
        $('#gameStatus').text('Rolling');
        $('#gameController').text('vs');
    
		// Set a countdown timer for 3 seconds to run this code. Use the "setTimeout" function to do this.
        game['running'] = true;
        setTimeout(function() {
        
			// Stop the roll. Use "clearInterval" to do it.
			clearInterval(rolling);
            game['running'] = false;
                 
			// Set the hand of each player and find out who won. Look at the "class" attribute of each player's hand to get the needed value.
			var p1Choice = $('#player1Choice').attr('class'),
                p2Choice = $('#player2Choice').attr('class');
            game['setHand'](1, p1Choice);
            game['setHand'](2, p2Choice);
            var winner = game['getWinner']();
            
			// Set the "game status" and "game controller" to "Player X Won!" and "Play Again".
			$('#gameStatus').text(game['winner'] + ' won!');
            $('#gameController').text('Play Again');
            
			// Update the "wins, losses, and rate" numbers on the screen. The "player" objects will have this information. Do it in a loop.
            for (i = 1; i < 3; i++) {
                $('#player' + i + 'Wins').text(game['getPlayer'](i)['wins']);
                $('#player' + i + 'Losses').text(game['getPlayer'](i)['losses']);
                $('#player' + i + 'WinRate').text(game['getPlayer'](i)['rate']);
            };
            
        }, 3000);
    };
});