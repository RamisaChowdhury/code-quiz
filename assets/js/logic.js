//querySelector variables
var startQuizButton = document.querySelector("#start")
var timeEl = document.querySelector("#time")
var startScreenEl = document.querySelector("#start-screen")
var questionsEl = document.querySelector("#questions")
var questionTitleEl = document.querySelector("#question-title")
var choicesEl = document.querySelector("#choices")
var choicesButton = document.querySelectorAll("button")
var feedbackEl = document.querySelector("#feedback")
var endScreenEl = document.querySelector("#end-screen")
var finalScoreEl = document.querySelector("#final-score")
var initialsEl = document.querySelector("#initials")
var submitButton = document.querySelector("#submit")


//global variables
var time = 100;
timeEl.textContent = time;
var timer;
var currentQuestionNumber = 0;
var rightSound = new Audio ("./assets/sfx/correct.wav")
var wrongSound = new Audio ("./assets/sfx/incorrect.wav")


//startQuiz function
function startQuiz() { 
        // start timer
        timer = setInterval(startTimer, 1000);
        // hide start-screen
        startScreenEl.classList.add("hide")
        // unhide questions
        questionsEl.classList.remove("hide")
        // start questions
        getQuestions();
    }

//getQuestions function
function getQuestions() {
    //get and display current question title
    var currentQuestion = questions[currentQuestionNumber];
    questionTitleEl.innerHTML = currentQuestion.title;
    //clear previous choices
    choicesEl.innerHTML = "";
    //loop through choices and create button for each option
    var currentChoices = currentQuestion.choices;
        for (i = 0; i < currentChoices.length; i++) {
            var choiceButton = document.createElement("button");
            choiceButton.textContent = (i + 1) + ". " + currentChoices[i];
            choicesEl.appendChild(choiceButton);
        }
}

//show feedback for answered question and deduct 15s for incorrect answer
function showFeedback(event) {
    feedbackEl.classList.remove("hide");
    var element = event.target;
    if (element.textContent !== questions[currentQuestionNumber].answer) {
        feedbackEl.textContent = "Wrong!";
        wrongSound.play();
        time -= 15;
        if (time < 0) {
            time = 0;
        }
    } else {
        feedbackEl.textContent = "Correct!";
        rightSound.play();
    }

    // next question
    currentQuestionNumber++;
    
    // end game if all questions are complete otherwise contine to next question
    if (currentQuestionNumber !== questions.length) {
        getQuestions();
    } else {
        endQuiz();
    }
}

// end quiz
function endQuiz() {
    // stop the timer
    clearInterval(timer);
    // hide questionEl and feedbackEl
    questionsEl.classList.add("hide");
    feedbackEl.classList.add("hide");
    // unihide endScreenEl
    endScreenEl.classList.remove("hide");
    // show final-score
    timeEl.textContent = time;
    finalScoreEl.textContent = time;
}

//startTimer function
function startTimer() {
    // countdown
        time--;
        timeEl.textContent = time;
    // endQuiz if time runs out
    if (time <= 0) {
        endQuiz();
    }
};

//saveScore to local storage as string on click or enter
function saveScore(event) {
    // userDetails from input
    var userInitials = initialsEl.value.trim();
    var userScore = {
        score: time,
        initials: userInitials,
    }
    // get saved scores from local storage
    var highscores = JSON.parse(localStorage.getItem("highscores"));
    if (highscores === null) {
        highscores = [];
    } 
    // save new score to local storage
    highscores.push(userScore);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    // show highscores page
    window.location.href = "highscores.html";
}

//saveScore to local storage as string on enter
function enterScore(event) {
    if (event.key === "Enter") {
        saveScore();
    }
}

//eventListeners
startQuizButton.addEventListener("click", startQuiz);
choicesEl.addEventListener("click", showFeedback);
submitButton.addEventListener("click", saveScore);
initialsEl.addEventListener("keydown", enterScore);