window.addEventListener('beforeunload',function () {
  localStorage.highScore = JSON.stringify(highScore);
})
  if (localStorage.highScore) {
    var highScore = JSON.parse(localStorage.highScore)

  }else{
    var highScore = [];
   
  }

let level1Container = document.querySelector('.level1-container');
let level2Container = document.querySelector('.level2-container');
let lvlCounter = 1;
let startGameBox = document.querySelector('.start-game-box');
let startBtn = document.querySelector('.start-btn');
let tBody = document.querySelector('.tbody');
let username;
let rand;
let counter = 0;
let clicked = [];
let width;
let timeBox = document.querySelector('.time');
let timeLeft = document.querySelector('.time-left');
let extraSeconds = document.querySelector('.extra-time');
let extraSecondsCounter = 0;
let gameOver = document.querySelector('.game-over');
let scoreBox = document.querySelector('.score-box');
let playerName = document.querySelector('.player-name');
let playerScore = 0;
let bonusScore = 0;
let startCount = document.querySelector('.start-count');
let soundBtn = document.querySelector('.sound-btn');
let soundBtnOff = document.querySelector('.sound-btn-off');
let loop;
let timeLoop;
let highScoreBox = document.querySelector('.high-score-box');

highScore.length = 0;



// sounds
var gameSong = new Audio("sound/game-song.mp3");
var startBtnSound = new Audio("sound/start-btn.wav");
var pointSound = new Audio("sound/point.wav");
var countdownSound = new Audio("sound/countdown.wav");
var colectScore = new Audio("sound/colect-score.wav");

 gameSong.play();


// 1 Create grid
   function start() {

    makeGrid();
   createHighScore()


let boxes = document.querySelectorAll('.box');
 console.log(boxes.length);


startBtn.addEventListener('click', startGame);
window.addEventListener('keypress', function(e) {
    if (e.keyCode == 13) {
        startGame();
        startBtnSound.play();
    }
});

soundBtnOff.addEventListener('click', function() {
    gameSong.pause();
    soundBtnOff.style.display = "none";
    soundBtn.style.display = "block";
})
soundBtn.addEventListener('click', function() {
    gameSong.play();
    soundBtnOff.style.display = "block";
    soundBtn.style.display = "none";
})


function startGame() {

    startBtnSound.play();
    startGameBox.style.display = "none";
    highScoreBox.style.display = "none";
    username = document.getElementById('username-box').value;
    scoreCount();
    startCountdown();
   setTimeout(function() {
          time();
    boxes.forEach(function(el) {
        el.style.display = "block";
        el.addEventListener('click', flip)
    })
   },4000)
}

function flip() {
    this.removeEventListener('click', flip)
    counter++;
    clicked.push(this);
    let front = this.children[1];
    let back = this.children[0];
    front.style.display = "none";
    back.style.display = "block";
    if (counter == 2) {
        removeClicks();
        checkTiles();
    }

};

function checkTiles() {
    let back1 = clicked[0].children[0];
    let front1 = clicked[0].children[1];
    let front2 = clicked[1].children[1];
    let back2 = clicked[1].children[0];
    
    if (back1.innerHTML == back2.innerHTML) {
        // pogodak
        extraSecondsCounter++
        clicked[0].classList.add('checked');
        clicked[1].classList.add('checked');
        extraTime();
        returnClicks();
        pointSound.play();
        clicked.length = 0;
        counter = 0;
        playerScore += 5;
        scoreCount();
        LevelEnd();
        
       
    } else {
        setTimeout(function() {
            front1.style.display = "block";
            front2.style.display = "block";
            back1.style.display = "none";
            back2.style.display = "none";
            clicked.length = 0;
            counter = 0;
            returnClicks();
        }, 700)
    }


};

function makeGrid() {
    let text = '';
    if (lvlCounter == 1) {
          for (var i = 0; i < 24; i++) {
        rand = Math.floor(Math.random() * iconsLvl1.length);

        text += '<div class="box">';
        text += '<div class="back">' + iconsLvl1[rand] + '</div>'
        text += '<div class="front"></div>'
        text += '</div>';
        iconsLvl1.splice(rand, 1)

    }
    level1Container.innerHTML = text;
     level1Container.style.display = "block";


    };


     if (lvlCounter == 2) {
        let text = '';
          for (var i = 0; i < 48; i++) {
        rand = Math.floor(Math.random() * iconsLvl2.length);

        text += '<div class="box">';
        text += '<div class="back">' + iconsLvl2[rand] + '</div>'
        text += '<div class="front"></div>'
        text += '</div>';
        iconsLvl2.splice(rand, 1)
       

    }
    level1Container.style.display = "none";
    level2Container.innerHTML = text;
    level2Container.style.display = "block";
    };



}




function removeClicks() {
    boxes.forEach(function(e) {
        e.removeEventListener('click', flip);
    })

}

function returnClicks() {
    let boxes = document.querySelectorAll('.box:not(.checked)')
    boxes.forEach(function(e) {
        e.addEventListener('click', flip);
    })

}

function time() {
    clearInterval(loop);
    timeBox.style.display = "block";
    width = 100;
    loop = setInterval(function() {
        width--;
        if (width < 20) {
            timeLeft.style.background = "#ec6409";
            timeBox.style.border = "2px solid #ec6409";
        }
        if (width < 10) {
            timeLeft.style.background = "#ec3609";
            timeBox.style.border = "2px solid #ec3609";
        }
        if (width == 0) {
            gameOver.style.display = "block";
            clearInterval(loop);
        }
        timeLeft.style.width = width + "%";

    }, 600)

};

function extraTime() {
    if (extraSecondsCounter == 2 && width <= 97) {
        width += 3;
        extraSecondsCounter = 0;
        extraSeconds.style.display = "block";
        setTimeout(function() {
            extraSeconds.style.display = "none";
        }, 1000);
    }

};

function scoreCount() {
    scoreBox.style.display = "block";
    scoreBox.innerHTML = playerScore;
    playerName.innerHTML = username;

};

function startCountdown() {
    let startCounter = 4;
    let loop = setInterval(function() {
        countdownSound.play();
        startCount.style.display = "block";
        startCounter--
        startCount.innerHTML = startCounter;
        if (startCounter <= 0) {
            clearInterval(loop);
            startCount.style.display = "none";


        }
    }, 1000)
}

function  LevelEnd() {
  let checked = document.querySelectorAll(".checked")
  console.log(checked);
  if (lvlCounter == 2) {

     checked.forEach(function(el) {
        el.classList.remove('checked');
    })
  }
   

  console.log(checked.length);
 
 console.log(boxes.length);
  if (boxes.length == checked.length) {
     console.log(boxes.length);
    console.log('radi');
    clearInterval(loop);
    bonusScore = width;
    timeLeft.style.background = "#16ae7c";
    timeBox.style.border = "2px solid #16ae7c";
     timeLoop = setInterval(function(){
      width--;
      timeLeft.style.width = width + "%";
      scoreBox.innerHTML = playerScore++;
      colectScore.playbackRate = 15;
      colectScore.play();
       if (width == 0) {
           scoreBox.innerHTML = playerScore;
           timeLeft.style.background = " #fee004";
            timeBox.style.border = "2px solid  #fee004";
          clearInterval(timeLoop);
          addToHighScore(); 
          lvlCounter++;
          // highScoreBox.style.display = "block";    SCORE TABLAPOSLE SVAKOG NIVOA
           makeGrid();
            createHighScore()
            boxes = document.querySelectorAll('.box');
            startGame()
          console.log('radi');
      }
     },30)

  }

};


function createHighScore() {

    let text = "";
    highScore.forEach(function(el){
      text +=   '<tr>'
      text +=   '<td>'+el.name+'</td>'
      text +=  '<td>'+el.score+'</td>'
      text +=  '</tr>'
    })
    tBody.innerHTML = text;

}

function addToHighScore() {

           
           highScore.push({
            name: username,
            score: playerScore
        });
            highScore = highScore.slice(0);
            highScore.sort(function(a,b) {
            return b.score - a.score;
            });

             if (highScore.length >= 3) {
                highScore.length = 3
            }

            

    createHighScore();

}

   }



start()
