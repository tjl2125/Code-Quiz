var startButton = document.getElementById("start-btn"); 
var hideaway = document.getElementsByClassName("hide"); 



startButton.addEventListener('click', startGame);
//startButton.addEventListener('click',hide); 


function startGame() {
console.log("start"); 
document.getElementById("home-page-container").style.visibility = "hidden";
nextQuestion(); 
}

function nextQuestion() {

}

function pickAnswer() {

}

var questions = [
    {
        question: "What is the first letter of the alphabet?",
        choice1: "A",
        choice2: "B",
        choice3: "C",
        choice4: "D",
        answer: 1,
    },
    {
        question: "What is the second letter of the alphabet?",
        choice1: "A",
        choice2: "B",
        choice3: "C",
        choice4: "D",
        answer: 2,
    },
    {
        question: "What is the third letter of the alphabet?",
        choice1: "A",
        choice2: "B",
        choice3: "C",
        choice4: "D",
        answer: 3,
    },
    {
        question: "What is the fourth letter of the alphabet?",
        choice1: "A",
        choice2: "B",
        choice3: "C",
        choice4: "D",
        answer: 4,
    },
]
