// Create the Game class
var Game = function (name) {
	// Your code starts here
    this.running = false;
    this.name = name;
    this.players = [];
    this.winner = false;
    this.choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    this.matrix = {
        'rock': ['scissors', 'lizard'],
        'paper': ['rock', 'spock'],
        'scissors': ['lizard', 'paper'],
        'lizard': ['spock', 'paper'],
        'spock': ['rock', 'scissors']
    };
    
    this.addPlayer = function (name) {
        var newPlayer = new Player(name);
        this.players.push(newPlayer);
    };
    
    this.getPlayer = function (playerNumber) {
        var lookupPlayer = playerNumber - 1;
        return this.players[lookupPlayer];
    };
    
    this.setHand = function (playerNumber, hand) {
        this.players[playerNumber - 1].hand = hand;
    };
    
    this.getWinner = function () {
        
        p1Hand = this.players[0].hand;
        p2Hand = this.players[1].hand;
        
        if (p1Hand === p2Hand) {
            this.winner = 'No one';
            return false;
        }
        
        for (var x in this.matrix[p2Hand]) {
            if (this.matrix[p2Hand][x] === p1Hand) {
                this.winner = 'Player 2';
                this.players[1].win();
                this.players[0].lose();
                return 2;
            }
        }
        
        this.winner = 'Player 1';
        this.players[0].win();
        this.players[1].lose();
        return 1;
    };
	// Your code ends here
};