var wordList = [
    "wubbalubbadubdub",
    "getschwifty",
    "picklerick",
    "tinyrick",
    "plumbus",
    "squanch"
];

const maxTries = 10;
var guessedLetters = [];
var currentWordIndex;
var guessingWord = [];
var remainingGuesses = 0;
var gameStarted = false;
var hasFinished = false;
var wins = -1;


function resetGame() {

    remainingGuesses = maxTries;
    gameStarted = false;

    currentWordIndex = Math.floor(Math.random() * (wordList.length));

    guessedLetters = [];
    guessingWord = [];

    for (var i = 0; i < wordList[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }
    mortOpacity = 1.0;
    document.getElementById("morty").style.opacity = mortOpacity;
    updateDisplay();
    
};

function updateDisplay() {
    document.getElementById("totalWins").innerText = "Wins: " + wins;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("remainingGuesses").innerText = "Guesses Left: " + remainingGuesses;
    document.getElementById("guessedLetters").innerText = "Letters Guessed: " + guessedLetters;
    if (remainingGuesses <= 0) {
        hasFinished = true;
        
    }
};

function updateHangmanImage() {
    document.getElementById("morty").innerHTML = "Morty!?!?!";
    
};

document.onkeydown = function(event) {
    
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};

function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }

        
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
    updateDisplay();
    checkWin();
};

function evaluateGuess(letter) {
    
    var positions = [];

    
    for (var i = 0; i < wordList[currentWordIndex].length; i++) {
        if(wordList[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    
    if (positions.length <= 0) {
        remainingGuesses--;
        vanish();
    } else {
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};

function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        wins++;
        hasFinished = true;
        resetGame();
    }
};

function vanish() {
    console.log("fade away is working");
    //change opacity of morty id by -1

    var mort = document.getElementById("morty")

    var mortStyle = getComputedStyle(mort);


    mortOpacity = mortStyle.opacity

    console.log('mortStyle', mortOpacity);
    
    
    mortOpacity = mortOpacity - 0.1;
    
    console.log('mortStyle NEW: ', mortOpacity);

    


    document.getElementById("morty").style.opacity = mortOpacity;

    

}

document.getElementById("restart").onclick = function() {
    location.resetGame(true)
};




