var wordList = [
    "wubbalubbadubdub",
    "getschwifty",
    "picklerick",
    "tinyrick",
    "plumbus",
    "squanch"
];

const maxTries = 11;
var guessedLetters = [];
var currentWordIndex;
var guessingWord = [];
var remainingGuesses = 0;
var gameStarted = false;
var hasFinished = false;
var wins = 0;


function resetGame() {

    remainingGuesses = maxTries;
    gameStarted = false;

    currentWordIndex = Math.floor(Math.random() * (wordList.length));

    guessedLetters = [];
    guessingWord = [];

    // document.getElementById("hangmanImage").src = "";

    for (var i = 0; i < wordList[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }
    

    // document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    // document.getElementById("gameover-image").style.cssText = "display: none";
    // document.getElementById("youwin-image").style.cssText = "display: none";


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
        // alert("GAME OVER");
        // document.getElementById("gameover-image").style.cssText = "display: block";
        // document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        hasFinished = true;
        
    }
};

// function updateHangmanImage() {
//     document.getElementById("hangmanImage").src = "assets/images/" + (maxTries - remainingGuesses) + ".png";
// };

document.onkeydown = function(event) {
    // If we finished a game, dump one keystroke and reset.
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        // Check to make sure a-z was pressed.
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

        // Make sure we didn't use this letter yet
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
    updateDisplay();
    checkWin();
};

function evaluateGuess(letter) {
    // Array to store positions of letters in string
    var positions = [];

    // Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (var i = 0; i < wordList[currentWordIndex].length; i++) {
        if(wordList[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    // if there are no indicies, remove a guess and update the hangman image
    if (positions.length <= 0) {
        remainingGuesses--;
        // updateHangmanImage();
    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};

function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        // document.getElementById("youwin-image").style.cssText = "display: block";
        // document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        hasFinished = true;

    }
};





