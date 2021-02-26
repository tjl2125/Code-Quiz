var startButton = document.getElementById("start-btn"); 
var homePage = document.getElementById("home-page-container");
var quiz = document.getElementById("quiz"); 
var hideaway = document.getElementsByClassName("hide"); 
var questionEl = document.getElementById("question"); 
var answerBtnEl= document.getElementById("answer-btns");
var questionCorrect = document.getElementById("correct");
var counter = document.getElementById("counter");
var scoreDiv = document.getElementById("score"); 

var choiceA= document.getElementById("A"); 
var choiceB= document.getElementById("B"); 
var choiceC= document.getElementById("C"); 
var choiceD= document.getElementById("D"); 


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
    }
]; 

var questionIndex = question.length-1; //lastQuestion
var currentQuestion= 0; //runningQuestion

function renderQuestion() {
    let q = questions[currentQuestion];

    questionEl.innerHTML = "<p>" + q.questionEl + "<p>"; 
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD; 
}

startButton.addEventListener("click", startQuiz);

function startQuiz () {
    startButton.style.display = "none"; 
    renderQuestion(); 
    quiz.style.display  = "block"; 
    counterRender(); 
    Timer = setInterval(counterRender,1000); 
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
            renderQuestion();
        } else {
            clearInterval(Timer);
            scoreRender(); 
        }
    }
}
var Timer = setInterval(counterRender,1000);
var score = 0; 

function checkAnswer(answer) {
    if (answer == questions[currentQuestion].correct) {
        score++; 
        answerCorrect();
    } else {
        answerWrong();
    }
    count = 0;
    if(currentQuestion < questionIndex) {
        currentQuestion++; 
        renderQuestion();
    } else {
        clearInterval(Timer);
        scoreRender(); 
    }
}

function answerCorrect() {
    document.getElementById("correct").style.backgroundColor = "#0f0"; 
}
function answerWrong() {
    document.getElementById("wrong").style.backgroundColor= "#f00"; 
}
function scoreRender() {
    scoreDiv.style.display = "block"; 
    
}

