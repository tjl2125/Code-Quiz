var startButton = document.getElementById("start-btn"); 
var hideaway = document.getElementsByClassName("hide"); 
var questionEl = document.getElementById("question"); 
var answerBtnEl= document.getElementById("answer-btns")

var currentQ = {}
var score = 0
var questionCount= 0
var availableQ = []

var ScorePoints = 100
var MaxQ= 4

startButton.addEventListener('click', startGame);



function startGame() {
console.log("start"); 
document.getElementById("home-page-container").style.visibility = "hidden";
nextQuestion(); 


}

function nextQuestion(question) {
    if (availableQ.length === 0 || questionCounter > MaxQ){
        localStorage.setItem("mostRecentScore", score)
        return window.location
    }
    questionCount++
    //progressText.innerText = "Question {questionCount} of {Max_Questions}"

    let questionIndex = Math.floor(Math.random() * availableQ.length)
    currentQ = availableQ[questionsIndex]
    question.innerText = currentQ.question
    
    choices.forEach(choices => {
        var number = choice.dataset["number"]
        choice.innerText = currentQ["choice" + number]
    })
    availableQ.splice(questionsIndex,1)

    acceptingAnswer=true 
}

/*choices.forEach (choices => {
    choice.addEventListener("click", e =>{
        if (!acceptingAnswer) return
        acceptingAnswer = false 
        var selectedChoice = e.target
        var selectedAnswer = selectedChoice.dataset["number"]

        let apply = selectedAnswer == currentQ.answer
    })
})*/

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


