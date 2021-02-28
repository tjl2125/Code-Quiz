var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var counter = document.getElementById("counter");
var progress = document.getElementById("progress");
var showScore = document.getElementById("scoreContainer");
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
        choiceA : "Hypertext Markup Language",
        choiceB : "Wrong",
        choiceC : "Wrong",
        choiceD : "Wrong",
        correct : "A"
    },
    {
        question : "What does CSS stand for?",
        choiceA : "Wrong",
        choiceB : "Cascading Style Sheets",
        choiceC : "Wrong",
        choiceD : "Wrong",
        correct : "B"
    },
    {
        question : "What does JS stand for?",
        choiceA : "Wrong",
        choiceB : "Wrong",
        choiceC : "Javascript",
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
        choiceD: "D",
        correct: "D"  
    }

];

var lastQuestion = questions.length - 1;
var runQuestion = 0;
var count = 50; //countdown from 50s
var questionTime = 0; 
var timer;
var score = 0;

// produce the question
function produceQuestion(){
    let q = questions[runQuestion];
    
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
    startCounter();
    timer = setInterval(startCounter,1000); // 1000ms = 1s
    quizOver(); 
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

// start counter
function startCounter(){
    if(count >= questionTime){
        counter.innerHTML = count;
        count--;
    } 
}

// check if answer is right or wrong
function checkAnswer(answer){
    if( answer == questions[runQuestion].correct){
        // answer is correct
        score++;
        answerCorrect(); 
    }else{
        // answer is wrong
        answerWrong(); 
    }
    if(runQuestion < lastQuestion){
        runQuestion++;
        produceQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(timer);
        scoreRender();
        document.getElementById("playerName").style.display = "block"; 
    }
}; 

// answer is correct
function answerCorrect(){
    correct.innerHTML = "Correct!";
    window.setTimeout("disappearCorrect();", 900);
}

function disappearCorrect(){
    document.getElementById("correct").style.display = "none";
}

// answer is Wrong
function answerWrong(){
    wrong.innerHTML = "Wrong!"; 
    window.setTimeout("disappearWrong();", 900);
    if(runQuestion < lastQuestion){
        runQuestion++;
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
}; 

function disappearWrong() {
    document.getElementById("wrong").style.display = "none"; 
};

// score render
function scoreRender(){ 
    quiz.style.display = "none";
    showScore.style.display = "block";
    score;
    showScore.innerHTML += "<p>"+ score +"</p>";
} ; 

function quizOver() {
    var input = document.querySelector('#playerName');
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
    input.appendChild(form);
    form.appendChild(div);
    // div.appendChild(scoreText);
    div.appendChild(label);
    div.appendChild(field);
    input.appendChild(submit);
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
    var input = document.querySelector('#playerName');
    while (input.firstChild) {
        input.removeChild(input.firstChild);
    }
    constructLeaderboard();
};

function constructLeaderboard() {
    // get leaderboard array from local storage, sort it in descending order based on score value, and create a list with the top 4 scores
    leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    leaderboard.sort((a, b) => b.score - a.score);
    for (var i = 0; (i < leaderboard.length) && (i <10); i++) {
        var list = document.createElement('li');
        list.textContent = leaderboard[i].name + " : " + leaderboard[i].score;
        list.style = "font-size: .5em";
        container.appendChild(list);
    }
}; 

