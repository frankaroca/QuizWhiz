let timer = document.querySelector("p.time");
let remainingSeconds = 75;
const infoScreen = document.querySelector("#info");
const problemScreen = document.querySelector("#problems");
let showProblem = document.querySelector("#problem");
let i = 0;

const beginQuiz = document.querySelector("#begin");
const optionSelected = document.querySelectorAll("button.selected")
const firstChoice = document.querySelector("#choice1");
const secondChoice = document.querySelector("#choice2");
const thirdChoice = document.querySelector("#choice3");
const fourthChoice = document.querySelector("#choice4");

const correct = document.querySelector("#right-wrong");

let scoreResults = [];
const showResults = document.querySelector("#results");
let totalScore = document.querySelector("#total");

const viewHighScores = document.querySelector("#highscores");
let allScores = document.querySelector("#savedscores");
let enterInitials = document.querySelector("#savedinitials");
const placeScore = document.querySelector("#enterScore");
const returnHome = document.querySelector("#return");
const observeScores = document.querySelector("#seeScores");


//Initialize Problems
const problems = [
    {
        problem: "What is the pillar in OOP programming that involves parent and child classes?",
        choices: [
        "1. Inheritance", 
        "2. Abstraction", 
        "3. Polymorphism", 
        "4. Encapsulation"],
        solution: "0"
    },
    {
        problem: "Which of following belongs to the four pillars of computional thinking?",
        choices: [
        "1. Inheritance",
        "2. Abstraction",
        "3. Polymorphism",
        "4. Encapsulation"],
        solution: "1"
    },
    {
        problem: "In web development, which of the following is used to call HTML ID elements from a JavaScript class?",
        choices: [
        "1. .", 
        "2. --", 
        "3. $", 
        "4. #"],
        solution: "3"
    },
    {
        problem: "Why is it an important practice to use 'let' or 'const' locally in web development?",
        choices: [
        "1. It allows for developers to identify bugs easier and more quickly in the code", 
        "2. It can help maintain storage capacity, preventing from too much space being consumed", 
        "3. It prevents the risk of other developers accidently modifying crucial code using the same variable once it's declared", 
        "4. It is not. 'Var' can also be another excellent practice when declaring variables. They are all the same"],
        solution: "2"
    },
    {
        // question 4
        problem: "In CSS, which is the correct way to move an item to the right of the screen using flexbox?",
        choices: [
        "1. align-items: flex-start",
        "2. justify-content: flex-start", 
        "3. align-items: flex-end", 
        "4. justify-content: flex-end"],
        solution: "3"
    }
];

// Functions

//Initialize Timer
function initializeTimer() {
    let timerInterval = setInterval(function () {
        remainingSeconds--;
        timer.textContent = "Seconds Left: " + remainingSeconds;

        if (remainingSeconds === 0 || i === problems.length) {
            clearInterval(timerInterval);
            problemScreen.style.display = "none";
            showResults.style.display = "block";
            totalScore.textContent = remainingSeconds;
        }
    }, 1000);
}

//Setup navigation for user to course through problems upon selecting option
function initializeProblem(pos) {
    if (pos < problems.length) {
        showProblem.textContent = problems[pos].problem;
        firstChoice.textContent = problems[pos].choices[0];
        secondChoice.textContent = problems[pos].choices[1];
        thirdChoice.textContent = problems[pos].choices[2];
        fourthChoice.textContent = problems[pos].choices[3];
    }
  }

//Setup functionality to begin quiz w/ timer upon click
function runQuiz() {
    infoScreen.style.display = "none";
    problemScreen.style.display = "block";
    i = 0;

    initializeTimer();
    initializeProblem(i);
}

//Initiate timer when user clicks 'begin'
beginQuiz.addEventListener("click", runQuiz);



// Setup ability for checking to see if the user has selected a right or wrong answer
function checkAnswer(event) {
    event.preventDefault();

    // Setup message notification for right/wrong answer to be displayed as h1 element
    correct.style.display = "block";
    let message = document.createElement("h1");
    correct.appendChild(message);

    // Check index in 'problems' array, and determine if it is correct from what user has selected using appended h1 element
    if (problems[i].solution === event.target.value) {
        message.textContent = "Correct!";
    } else if (problems[i].solution !== event.target.value) {
    // Deduct 20 seconds if user selects an incorrect answer
        remainingSeconds = remainingSeconds - 20;
        message.textContent = "Wrong!";
    }

    // Keep 'Right' or 'Wrong' message notification showing until reverted to 'none' in 2 seconds
    setTimeout(function () {
        message.style.display = 'none';
    }, 2000);

    // Be able to loop through all indexes, and call the function as long as the final question has not yet been completed
    if (i < problems.length) {
        i++;
        initializeProblem(i);
    }
}

// Enable so that once user clicks on an answer, it will respond, and go to the next question.
// Learned how to perform function for all elements in an array from W3 Schools source:
// https://www.w3schools.com/jsref/jsref_foreach.asp
optionSelected.forEach(function(clickedAnswer) {
    clickedAnswer.addEventListener('click', checkAnswer);
});

function enterScores() {
    localStorage.setItem("scoreResults", JSON.stringify(scoreResults));
}

function showScores() {
    // Retrieve all of the entered scores from local storage
    let enteredScoreResults = JSON.parse(localStorage.getItem("scoreResults"));

    // Have scoreResults array updated once scores are retrieved from local storage
    if (enteredScoreResults !== null) {
        scoreResults = enteredScoreResults;
    }
}


function enableScore(event) {
    event.preventDefault();

    showResults.style.display = "none";
    viewHighScores.style.display = "block";

    let userInitials = enterInitials.value.toUpperCase();
    scoreResults.push({ inputInitials: userInitials, useScore: remainingSeconds });

    scoreResults = scoreResults.sort((a, b) => {
        if (a.useScore < b.useScore) {
          return 1;
        } else {
          return -1;
        }
      });
    
    allScores.innerHTML="";
    for (let i = 0; i < scoreResults.length; i++) {
        let newList = document.createElement("li");
        newList.textContent = `${scoreResults[i].inputInitials}: ${scoreResults[i].useScore}`;
        allScores.append(newList);
    }

    // Add to local storage
    enterScores();
    showScores();
}

// Place new score
placeScore.addEventListener("click", enableScore);

// Return button to go back to the main screen
returnHome.addEventListener("click", function () {
    viewHighScores.style.display = "none";
    infoScreen.style.display = "block";
    remainingSeconds = 75;
    timer.textContent = `Time:${remainingSeconds}s`;
});

// See or hide the high scores Button
observeScores.addEventListener("click", function () {
    if (viewHighScores.style.display === "none") {
        viewHighScores.style.display = "block";
    } else if (viewHighScores.style.display === "block") {
        viewHighScores.style.display = "none";
    } else {
        return alert("Sorry, there are currently not any scores to display.");
    }
});