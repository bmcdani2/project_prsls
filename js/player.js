// Create the Player class
var Player = function (name) {
	// All your code starts here
    this.name = name;
    this.hand = false;
    this.wins = 0;
    this.losses = 0;
    this.played = 0;
    this.rate = 0;
    
    this.lose = function() {
        this.played++;
        this.losses++;
        this.rate = (this.wins / this.played).toFixed(2);
    };
    
    this.win = function() {
        this.played++;
        this.wins++;
        this.rate = (this.wins / this.played).toFixed(2);
    };
    
    // All your code ends here
}