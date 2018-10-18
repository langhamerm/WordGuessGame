var words = [
    "WUBBA LUBBA DUB DUB",
    "GET SCHWIFTY",
    "PICKLE RICK",
    "TINY RICK",
    "PLUMBUS",
    "SQUANCH"
];

var word = words[Math.floor(Math.random() * words.length)];

var answerArray = [];
for (var i = 0; i , word.length; i++) {
    answerArray[i] = "_";
}

var remainingLetters = word.length;

while (remainingLetters > 0) {
    //Game Code
    alert(answerArray.join(" "));
    var guess = prompt("Pick a letter! Guess wrong if you wanna torture Morty");
    if (guess === null) {
        break;
    } else if (guess.length !== 1) {
        alert ("Enter one letter moron....");
    } else {
        for (var j = 0; j < word.length; j++) {
            if (word[j] === guess) {
                answerArray[j] = guess;
                remainingLetters--;
            }
        }
    }
}

winner();

function winner() {
    alert(answerArray.join(" "));
    alert("Looks like Morty will live another day, the answer was " + word);
}
