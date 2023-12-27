const platform = document.getElementById("platform");
const ball = document.getElementById("ball");
const startButton = document.getElementById("startButton");
const scoreDiv = document.getElementById("score");
const recordDiv = document.getElementById("record");

let score, platformX, ballX, ballY, step, record;
let game = false; record = 0;

window.addEventListener("DOMContentLoaded", event => {
    const audio = document.querySelector("audio");
    audio.volume = 0.2;
    audio.loop = true;
    audio.play();
  });

window.addEventListener("keypress", (event) => {
    if (event.key==' ' && !game) gameStart();} );

startButton.addEventListener('click', () => {if (!game) gameStart()});

function movePlatform(event){
    switch(true){
        case (event.key == "ArrowLeft") || (event.keyCode == 65):
            platformX = (platformX - 15) < 0 ? 0 : platformX - 15;
            platform.style.left = platformX + 'px';
            break;
        case (event.key == "ArrowRight") || (event.keyCode == 68):
            platformX = (platformX + 15) > 400 ? 400 : platformX + 15;
            platform.style.left = platformX + 'px';
            break;
    }
}

function moveBall(){
    timerId = setInterval(frame, 5);
    let moveX = Boolean(score % 2);  // true denotes move to the right
    let moveY = true;                // true denotes move to the down
    let cooldown = new Date();
    cooldown = cooldown.getSeconds();

    function frame(){
        determineDirection();
        changeCords();
        ball.style.left = ballX + "px";
        ball.style.top = ballY + "px";       
    }
    function determineDirection(){
        if (ballY > 580) {
            clearInterval(timerId);
            gameOver();
        }

        // ball collides with platform:
        if (new Date().getSeconds() - cooldown > 0.1 &&
            (520 - 7.5 <= ballY  && ballY <= 520 + 7.5) && (platformX-30 <= ballX  && ballX <= platformX + 130)){
            moveX = Boolean(Math.round(Math.random()));
            moveY = !moveY;
            score ++;
            scoreDiv.innerHTML = `Score: ${score}`;
            step += (score % 3 == 0) ? 0.25 : 0;
            cooldown = new Date().getSeconds();
        } 
        // ball hits right wall:
        if (ballX + 30 >= 500) moveX = false; 

        // ball hits left wall:
        if (ballX - 7.5 <= 0) moveX = true;

        // ball hits the ceil:
        if (ballY - 7.5 <= 0)
            moveY = true;
    }
    function changeCords(){
        if (moveX) ballX += step;
        if (!moveX) ballX -= step;
        if (moveY) ballY += step;
        if (!moveY) ballY -= step;
    }
}

function gameOver(){
    record = (record > score) ? record : score;
    recordDiv.innerHTML = `Record: ${record}`;
    gameReset();
}

function gameStart(){   
    gameReset();
    game = true;
    window.addEventListener("keydown", movePlatform);
    moveBall(); 
}
function gameReset(){
    platformX = 200;
    ballX = 235;
    ballY = 20;
    score = 0;
    step = 1.5;

    scoreDiv.innerHTML = `Score: ${score}`;
    platform.style.left = platformX + 'px';
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";  
    game = false;
    window.removeEventListener('keydown', movePlatform);
}

class example{
    a;
    constructor(a){
        this.a = a;
    }
}

let a  = new example();
a.r = false;
console.log(a.r);
