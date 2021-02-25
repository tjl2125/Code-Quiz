var startButton = document.getElementById("start-btn"); 
var homePage = document.getElementById("home-page-container");
var quiz = document.getElementById("quiz"); 
var hideaway = document.getElementsByClassName("hide"); 
var questionEl = document.getElementById("question"); 
var answerBtnEl= document.getElementById("answer-btns")

var choiceA= document.getElementById("A"); 
var choiceB= document.getElementById("B"); 
var choiceC= document.getElementById("C"); 
var choiceD= document.getElementById("D"); 

/*var currentQ = {}
var score = 0
var questionCount= 0
var availableQ = []

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

startButton.addEventListener("click", startQuiz);

function startQuiz () {
    startButton.style.display = "none"; 
    counterRender(); 
    Timer = setInterval(counterRender,1000); 
}

var questions = [
    {
        question: "What is the first letter of the alphabet?",
        choiceA: "A",
        choiceB: "B",
        choiceC: "C",
        choiceD: "D",
        answer: 1,
    },
    {
        question: "What is the second letter of the alphabet?",
        choiceA: "A",
        choiceB: "B",
        choiceC: "C",
        choiceD: "D",
        answer: 2,
    },
    {
        question: "What is the third letter of the alphabet?",
        choiceA: "A",
        choiceB: "B",
        choiceC: "C",
        choiceD: "D",
        answer: 3,
    },
    {
        question: "What is the fourth letter of the alphabet?",
        choiceA: "A",
        choiceB: "B",
        choiceC: "C",
        choiceD: "D",
        answer: 4,
    },
]

var questionIndex = question.length-1; 
var currentQuestion= 0; 

function renderQuestion() {
    var q = questions[currentQuestion];
    questionEl.innerHTML = q.questionEl; 
    choiceA.innterHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD; 
}

var questionTime = 20; 
var count = 0; 

function counterRender () {
    if (count <= questionTime) {
        counter.innerHtml = count;
        count++;
    }
    else {
        count = 0;
        answerWrong();
        if (currentQuestion <= questionIndex) {
            currentQuestion ++; 
            questionRender();
        } else {
            clearInterval(Timer);
            scoreRender(); 
        }
    }
}
var Timer = setInterval(counterRender,1000);

function checkAnswer(answer) {
    if questions[currentQuestion].correct == answer) {
        score++; 
        answerCorrect();
    } else {
        answerWrong();
    }
    if(currentQuestion < questionIndex) {
        count = 0;
        currentQuestion++; 
        questionRender();
    } else {
        clearInterval(Timer);
        scoreRender(); 
    }
}
