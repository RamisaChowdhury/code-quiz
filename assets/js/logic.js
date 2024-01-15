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
var initialsEl = document.

//global variables
var time = 100;
timeEl.textContent = time;
var timer;
var currentQuestionNumber = 0;


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

    //clear old choices
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
        time -= 15;
        if (time < 0) {
            time = 0;
        }
    } else {
        feedbackEl.textContent = "Correct!";
    }

    // next question
    currentQuestionNumber++;
    
    // end game if all questions are complete or contine to next question
    if (currentQuestionNumber === questions.length) {
        endQuiz();
    } else {
        getQuestions();
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

//function to save highscore to local storage

//listen for submit
//prevent default for input
//var userDetails = 
//localSotra.setItem("userDetails", JSON stringify(userDetails));


function saveScore() {

}

//function to store data when user hits enter

//eventListeners
startQuizButton.addEventListener("click", startQuiz);
choicesEl.addEventListener("click", showFeedback);