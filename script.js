var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var counter = document.getElementById("counter");
var progress = document.getElementById("progress");
var scoreDiv = document.getElementById("scoreContainer");
var correct = document.getElementById("correct");
var wrong = document.getElementById("wrong"); 
var leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D"); 

// 5 quiz questions
var questions = [
    {
        question : "What does HTML stand for?",
        choiceA : "Correct",
        choiceB : "Wrong",
        choiceC : "Wrong",
        choiceD : "Wrong",
        correct : "A"
    },
    {
        question : "What does CSS stand for?",
        choiceA : "Wrong",
        choiceB : "Correct",
        choiceC : "Wrong",
        choiceD : "Wrong",
        correct : "B"
    },
    {
        question : "What does JS stand for?",
        choiceA : "Wrong",
        choiceB : "Wrong",
        choiceC : "Correct",
        choiceD : "Wrong", 
        correct : "C"
    },
    {
        question: "What is the third letter in the alphabet?",
        choiceA: "A",
        choiceB: "B",
        choiceC: "C",
        choiceD: "D",
        correct: "C"
    },
    {
        question: "What is the fourth letter in the alphabet?",
        choiceA: "A",
        choiceB: "B",
        choiceC: "C",
        choiceD: "Correct",
        correct: "D"  
    }

];

var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var count = 30; //countdown from 30s
var questionTime = 0; 
var timer;
var score = 0;

// render a question
function produceQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD; 
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    produceQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    timer = setInterval(renderCounter,1000); // 1000ms = 1s
    gameOver(); 
}

function highScore () {
    leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    leaderboard.sort((a, b) => b.score - a.score);
    for (var i = 0; (i < 1); i++) {
        var list = document.createElement('li');
        highScoreDisplay.textContent = leaderboard[i].name + " : " + leaderboard[i].score;
    }
};

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
       progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count >= questionTime){
        counter.innerHTML = count;
        count--;
    } 
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        answerIsCorrect(); 
    }else{
        // answer is wrong
        answerIsWrong(); 
    }
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        produceQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(timer);
        scoreRender();
        document.getElementById("yourName").style.display = "block"; 
    }
}; 

// answer is correct
function answerIsCorrect(){
    correct.innerHTML = "Correct!";
    window.setTimeout("disappearCorrect();", 500);
}

function disappearCorrect(){
    document.getElementById("correct").style.display = "none";
}

// answer is Wrong
function answerIsWrong(){
    wrong.innerHTML = "Wrong!"; 
    window.setTimeout("disappearWrong();", 500);
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        produceQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(timer);
        scoreRender();
    }
    //decrease time by 5s if wrong answer picked
    if (count >= 0) {
        count -=5; 
    }

}

function disappearWrong() {
    document.getElementById("wrong").style.display = "none"; 
}

// score render
function scoreRender(){ 
    quiz.style.display = "none";
    scoreDiv.style.display = "block";
    score;
    scoreDiv.innerHTML += "<p>"+ score +"</p>";
} ; 

function gameOver() {
    
    var target = document.querySelector('#yourName');
    var form = document.createElement('form');
    var div = document.createElement('div');
    // var scoreText = document.createElement('p');
    var label = document.createElement('label');
    var field = document.createElement('input');
    var submit = document.createElement('button');
    label.textContent = "Enter your name or initials: ";
    label.setAttribute("class", "mr-2")
    // div.setAttribute("class", "row d-flex flex-column justify-content-center")
    form.id = "#form";
    label.for = "player";
    label.type = "text"
    // scoreText.textContent = `Your final score is ${score}`;
    submit.id = "submitName";
    field.id = "player";
    field.type = "text";
    field.name = "player";
    submit.textContent = "Submit";
    submit.setAttribute("class", "btn-sm btn-success px-4 mt-2");
    field.setAttribute("class", "form-control");
    div.setAttribute("class", "form-inline");
    target.appendChild(form);
    form.appendChild(div);
    // div.appendChild(scoreText);
    div.appendChild(label);
    div.appendChild(field);
    target.appendChild(submit);
    submit.addEventListener("click", saveName);
};

// Save name if a new high score
function saveName(event) {
    event.preventDefault();
    var playerName = player.value.trim();
    // if score is higher than previous value of highscore, replace as new value and save new high score
    if (score > highscore) {
        highscore = score;
        highScoreDisplay.textContent = playerName + ", " + score;
    }
    var user = {
        name: playerName,
        score: score,
    }
    leaderboard.push(user);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    //clear all form elements
    var target = document.querySelector('#yourName');
    while (target.firstChild) {
        target.removeChild(target.firstChild);
    }
    buildLeaderboard();
};

function buildLeaderboard() {
    // Retrieve leaderboard array from local storage, sort it in descending order based on score value, and create a list with the top 4 scores
    leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    leaderboard.sort((a, b) => b.score - a.score);
    for (var i = 0; (i < leaderboard.length) && (i <4); i++) {
        var list = document.createElement('li');
        list.textContent = leaderboard[i].name + " : " + leaderboard[i].score;
        list.style = "font-size: .7em";
        container.appendChild(list);
    }
}; 