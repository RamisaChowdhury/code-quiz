//querySelector variables
var highScoresEl = document.querySelector("#highscores");
var clearButton = document.querySelector("#clear")

//getHighScores from local storage
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

//clearScores function - remove from local storage and clear highscore list
function clearScores () {
    localStorage.clear();
    highScoresEl.classList.add("hide");
}

//clearScores event listener
clearButton.addEventListener("click", clearScores);

//show highscores
getHighScores();