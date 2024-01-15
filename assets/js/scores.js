var highScoresEl = document.querySelector("#highscores");
var clearButton = document.querySelector("#clear")

//get information from local storage
function getHighScores () {
    var highscores = JSON.parse(localStorage.getItem("highscores"));
    //sort by high score
    if (highscores !== null){
        highscores.sort(function(a, b) {
            return b.score - a.score;
        });
        //list each score
        for (i = 0; i < highscores.length; i++) {
            var userList = document.createElement("li");
            userList.textContent = highscores[i].initials + " - " + highscores[i].score;
            highScoresEl.appendChild(userList);
        }
    } else {
        highscores = [];
    }
    
}

//clear local storage and highscore list
function clearScores () {
    localStorage.clear();
    highScoresEl.classList.add("hide");
}

//clear board event listener
clearButton.addEventListener("click", clearScores);

//show highscores
getHighScores();