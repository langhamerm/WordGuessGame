$(document).ready(function(){

    function Hangman() {
        this.wordList = [
            "WUBBA LUBBA DUB DUB",
            "GET SCHWIFTY",
            "PICKLE RICK",
            "TINY RICK",
            "PLUMBUS",
            "SQUANCH"
        ]
        this.word = this.wordList[Math.floor(Math.random() * this.wordList.length)];
        this.letterguesses = [];
        this.wrongGuesses = 0;
        this.visibleLetters = [];
        this.gameOver = false;
        this.alertLines = emptyAlert;
        for (var i = 0; i < this.word.length; i++) {
            this.visibleLetters[i] = (false);
        }

    }

    Hangman.prototype.checkGuess = function(char) {
        this.letterguesses.push(char);

        var isInWord = false;
        for (var i = 0; i < this.word.length; i++) {
            if (this.word.charAt(i) === char) {
                isInWord = true;
                this.visibleLetters[i] = true;

            }
        }
        if (!isInWord) {
            this.wrongGuesses++;
        }
        if (this.wrongGuesses >= lives) {
            losses++;
            this.alertLines = youLose;
            this.gameOver = true;

        }
        if (!this.visibleLetters.includes(false)) {
            wins++;
            this.alertLines = youWin;
            this.gameOver = true;

        }

        game.updatePageData();
    };

    Hangman.prototype.updatePageData = function() {
        var tempString = "";
        for (var i = 0; i < this.visibleLetters.length; i++) {
            tempString += ((this.visibleLetters[i] || this.gameOver) ? this.word.charAt(i).toUpperCase() : "_");
            if (i < (this.visibleLetters.length - 1)) tempString += " ";
        }
        letterBlanksElement.textContent = tempString;
    
        tempString = "";
        for (var i = 0; i < this.letterguesses.length; i++) {
            tempString += (this.letterguesses[i].toUpperCase());
            if (i < (this.letterguesses.length - 1)) tempString += " ";
        }
        for (var i = tempString.length; i < 51; i++) {
            tempString += " ";
        }
        letterguessesElement.textContent = tempString;
    
        tempString = this.errors + " / " + lives;
        for (var i = tempString.length; i < 32; i++) {
            tempString += " ";
        }
        wrongGuessesElement.textContent = tempString;
    
        tempString = wins + "";
        for (var i = tempString.length; i < 45; i++) {
            tempString += " ";
        }
        winCountElement.textContent = tempString;
    
        tempString = losses + "";
        for (var i = tempString.length; i < 43; i++) {
            tempString += " ";
        }
        lossCountElement.textContent = tempString;
    
        for (var i = 0; i < blinkElements.length; i++) {
            blinkElements[i].textContent = (this.gameOver ? pressAnyKeyToReset[i] : pressAnyKeyToStart[i]);
        }
    
        for (var i = 0; i < alertLineElements.length; i++) {
            alertLineElements[i].textContent = (this.alertLines[i]);
        }
    }
    
    game.updatePageData();

    var alphabet = [
        "a", "b", "c", "d", "e", "f", "g",
        "h", "i", "j", "k", "l", "m", "n",
        "o", "p", "q", "r", "s", "t", "u",
        "v", "w", "x", "y", "z"
    ];

    var wins = 0;
    var losses = 0;


    var lives = 10;

    var letterBlanksElement = document.getElementById("letterblanks");
    var letterguessesElement = document.getElementById("letterguesses");
    var wrongGuessesElement = document.getElementById("wrongGuesses");

    var game = new Hangman();

    document.onkeyup = function(event) {
        var userGuess = event.key;
        if (!game.gameOver) {
            if (alphabet.includes(userGuess) && !game.letterguesses.includes(userGuess)) {
                game.checkGuess(userGuess);
            }
        }
        else {
            game = new Hangman();
            game.updatePageData();

        }

    }


    



// Attempt 1
    // var word = wordList[Math.floor(Math.random() * wordList.length)];

    // var answer = [];
    // for (var i = 0; i < word.length; i++) {
    //     answer[i] = "_";
    // }

    // var lettersleft = 13;

    // while (lettersleft > 0) {
    //     alert(answer.join(" "));

    //     var guess = alert("Press a letter!");
    //     if (guess === null) {
    //         break;
    //     }
    //     else if (guess.length !== 1) {
    //         alert("Only enter one letter Einstein");
    //     }
    //     else {
    //         for (var j = 0; j < word.length; j++) {
    //             if (word[j] === guess) {
    //                 answer[j] = guess;
    //                 lettersleft--;
    //             }
    //         }
    //     }

    // }

    // alert(answer.join(" "));
    // alert("Oh wow you actually did it? The answer was " + word);

});