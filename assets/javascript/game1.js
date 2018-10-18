window.onload = function(){
    // Establish Variables

    var wins = 0;
    var losses = 0;

    var gameRunning = false;

    var game;


    var lives = 10;
    var counter;

    var space;

    var word;
    var guess;
    var guesses = [ ];

    var string;
    var letter;

    var validGuesses = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];

    var wordList = [
        "wubba lubba dub dub",
        "get schwifty",
        "pickle rick",
        "tiny rick",
        "plumbus",
        "squanch"
    ];

    // Get Elements

    var letterBlanks = document.getElementById("letterblanks");
    var letterguesses = document.getElementById("letterguesses");
    var livesLeft = document.getElementById("livesLeft");

    // Guess List

    result = function () {
        wordHolder = document.getElementById("letterguesses");
        correct = document.createElement("ul");
    
        for (var i = 0; i < word.length; i++) {
          correct.setAttribute("id", "my-word");
          guess = document.createElement("li");
          guess.setAttribute("class", "guess");
          if (word[i] === "-") {
            guess.innerHTML = "-";
            space = 1;
          } else {
            guess.innerHTML = "_";
          }
    
          guesses.push(guess);
          wordHolder.appendChild(correct);
          correct.appendChild(guess);
        }
    };

    // Lives Display
    
    comments = function () {
        livesLeft.innerHTML = "You have " + lives + " lives";
        if (lives < 1) {
            livesLeft.innerHTML = alert("Game Over");
        }
        for (var i = 0; i < guesses.length; i++) {
          if (counter + space === guesses.length) {
            livesLeft.innerHTML = alert("You Win!");
          }
        }
    };

    // Keypress Function

    compareLetters = function(string, letter) {
        var hasLetter = string.includes(letter);
        var livesLeft = document.getElementById("livesLeft");
        if(hasLetter){
            // Replace Dash
            string = string.replace(/\s+/g, letter);
            
        }
        else{
            livesLeft.innerHTML = lives--;
        }
        
    }

    document.onkeypress = function(event) {
        // console.log(event);
        var keyPress = event.key;
        if (gameRunning === false) {
            gameRunning = true;
            reset();
        }
            console.log(keyPress);
            play(keyPress);
        if (!game.gameOver) {
            if (validGuesses.includes(keyPress) && !game.letterguesses.includes(keyPress)) {
                game.checkGuess(keyPress);
            }
        }
        else {
            game.updatePageData();
        }
        
    }


    // Play
    reset = function() {
        wordList = [
            "WUBBA LUBBA DUB DUB",
            "GET SCHWIFTY",
            "PICKLE RICK",
            "TINY RICK",
            "PLUMBUS",
            "SQUANCH"
        ];
        guesses = [ ];
        lives = 10;
        counter = 0;
        space = 0;
        word = wordList[Math.floor(Math.random() * wordList.length)];
        word = word.replace(/\s/g, "-");
        console.log(word);
        result();
        comments();
    }
    play = function (keyPress) {
    
        compareLetters(word, keyPress);
        comments();


    }
    
    
    // Restart

    document.getElementById("restart").onclick = function() {
        correct.parentNode.removeChild(correct);
        letterguessesElement.parentNode.removeChild(letters);
        showClue.innerHTML = "";
        context.clearRect(0, 0, 400, 400);
        reset();

    }

}