/*
**ARCADE GAME BY MR.PAUL(this content is licensed under the MIT license @https://opensource.or/licenses/mit-license.php)
*/


const myGameLogic = (function() {
  //initialize all required variables
   let idx, dx, dy, interval, interval1, interval2, difficulty ,level = 1, x = 1.75, heart = 4, init, star, key, stop, stone, win, interval3;
   const message = document.querySelector('.message');
   let defaultRender = function() {
        access.ctx.drawImage(Resources.get(this.sprite), 0, 53, 101, 108, this.dx, this.dy-31, access.imgWidth, access.imgHeight+22); 
      };

  //EnemyClass
    class Enemy {
        constructor() {
            this.sprite ='images/enemy-bug.png';
            this.dx = -access.imgWidth;
            this.dy = ( Math.floor(2.9 * Math.random()) + 1 ) * access.imgHeight;
            this.speed = (5*access.imgWidth) / ( Math.floor(1.9 * Math.random()) + 2 + this.random(0) + this.random(1));
        }

        update (dt) {
          if(stop === true) return;
          if (this.dx >= 5*access.imgWidth){
            this.dx = -access.imgWidth;
            this.dy = ( Math.floor(2.9 * Math.random()) + 1 ) * access.imgHeight;
            this.speed = (5*access.imgWidth) / ( Math.floor(1.9 * Math.random()) + 0.25 + x + this.random(0) + this.random(1));
          }else{

            this.dx += this.speed*dt;
          }

        }

        render () {
            access.ctx.drawImage(Resources.get(this.sprite), 0, 75, 101, 96, this.dx, this.dy, access.imgWidth, access.imgHeight);
        }

        random(num) {
          return num === 0 ? Math.floor(1.9 * Math.random())/2 : Math.floor(1.9 * Math.random())/4;
        }
    }

    //player class
    class Player {

       constructor(character = 'images/char-boy.png') {
        this.sprite = character;
        this.dx = 2*access.imgWidth;
        this.dy = 5*access.imgHeight;
       }

        handleInput(allowedKeys) {
            switch (allowedKeys) {
                case 'left':
                  if (this.dx === 0  || stone === 'left') break;
                  this.dx -= access.imgWidth;
                  break;
                case 'up':

                  if (this.dy === 0 || stone === 'up') break;
                  this.dy -= access.imgHeight;
                  break;
                case 'right':
                  if (this.dx === 4*access.imgWidth || stone === 'right') break;
                  this.dx += access.imgWidth;
                  break;
                case 'down':
                  if (this.dy === 5*access.imgHeight || stone === 'down') break;
                  this.dy += access.imgHeight;
            }

        }

        get activeTouches (){
          return this.touches;
        }

        set activeTouches (Array){
          this.touches = Array;
        }

        handleSwipes(e){

          e.preventDefault();
           const activeTouches = [];

          if (e.type === 'touchstart' ){

          for (const touch of e.changedTouches) {
            activeTouches.push(touch);
            }
            this.activeTouches = activeTouches;
            
          }else {

            for (const touch of e.changedTouches){

              for (const activeTouch of this.activeTouches) {

                if(touch.identifier === activeTouch.identifier){
                  
                  const dx = activeTouch.clientX - touch.clientX;
                  const dy = activeTouch.clientY - touch.clientY;
                  
                  if ((dx > dy && dx >= 50 ) && (dy < 50 && dy >= 0 || dy > -50 && dy <= 0)){
                    this.handleInput('left');
                  }else if((dx < dy && dx < -50 ) && ( dy < 50 && dy >= 0 || dy > -50 && dy <= 0)) {
                    this.handleInput('right');
                  }else if ((dy > dx && dy > 50) || (dy/dx === 1 && dy >= 50)) {
                    this.handleInput('up');
                  }else if ( (dy < dx && dy < -50) || (dy/dx === 1 && dy <= -50)) {
                    this.handleInput('down');
                  }else {
                    if (dx > dy && dx > 50 ){
                    this.handleInput('left');
                  }else if(dx < dy && dx < -50 ) {
                    this.handleInput('right');
                  }
                  }
                }
            }
            }
          }    
          }

        update () {

            if ( win === true ) return;
            for (const enemy of allEnemies){ 
              if (star === true || key === true) break; 
              if (enemy.dx+access.imgWidth > this.dx && this.dy === enemy.dy && this.dx > enemy.dx ||
                this.dx+access.imgWidth > enemy.dx && this.dy === enemy.dy && this.dx < enemy.dx ) {
                this.dx = 2*access.imgWidth;
                this.dy = 5*access.imgHeight;
                if (heart  === 1){
                  heart -= 1;
                  endGame();
                }else {
                   heart -= 1;
                  document.querySelector('.heart').firstElementChild.remove();
                }
              }
            }
            if(this.dy === 0){
              win = true;
              setTimeout(() => {
                this.dx = 2*access.imgWidth;
                this.dy = 5*access.imgHeight;
                win = false;
              }, 200)
              if (key === true) {
                  key = false;
                 startGemCountDown();
                }
              if(level === 11) {
                 endGame();
              }else {
                x -= 0.175;
                level += 1;
                updateScorePanel();
              }
            }
            if(this.render !== defaultRender && difficulty === 'easy' || difficulty === 'hard'){
              if(dx === this.dx && this.dy === dy && idx < 6){
                switch (idx) {
                  case 0 : 
                    x += 5;
                    interval3 = setTimeout(()=> x -= 5 , 3000);
                    break;
                  case 1 :
                    const img = new Image();
                    img.src = 'images/Heart.png';
                    document.querySelector('.scorepanel .heart').appendChild(img)
                    heart += 1;
                    break;
                  case 2 :
                    if(level === 11) endGame();
                    level += 1;
                    x -= 0.175;
                    updateScorePanel();
                    break;
                  case 3 : 
                    star = true;
                    setTimeout(()=> star = false , 3000);
                    break;
                  case 4: 
                    key = true;
                    Player.prototype.render = defaultRender;
                    clearInterval(interval);
                    if (difficulty === 'hard'){
                      idx= 6;
                      dy = ( Math.floor(2.9 * Math.random()) + 1 ) * access.imgHeight;
                      dx =  Math.floor(4.9 * Math.random()) * access.imgWidth;
                      randomStoneBlock();
                    }
                    return;
                  case 5: 
                    stop = true;
                    setTimeout(()=> stop = false , 3000);

                  }
                Player.prototype.render = defaultRender;
                if (difficulty === 'hard'){
                  idx= 6;
                  dy = ( Math.floor(2.9 * Math.random()) + 1 ) * access.imgHeight;
                  dx =  Math.floor(4.9 * Math.random()) * access.imgWidth;
                  randomStoneBlock();
                }
                clearInterval(interval);
                startGemCountDown();
              }else if(this.dx+access.imgWidth === dx && dx > this.dx && dy === this.dy && idx === 6){
                stone = 'right';
              }else if(dx+access.imgWidth === this.dx && dx < this.dx && dy === this.dy && idx === 6){
                stone = 'left';
              }else if(this.dy+access.imgHeight === dy && dy > this.dy && dx === this.dx && idx === 6){
                stone = 'down';
              }else if(dy+access.imgHeight === this.dy && dy < this.dy && dx === this.dx && idx === 6){
                stone = 'up';
              }else{
                stone = undefined;
              }
          }
        }

    }

  Player.prototype.render = defaultRender;
  window.player = new Player();
  window.allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];


    function gemPlacement() {
      let myObjects = [
        'images/Gem Orange.png',
        'images/Gem Green.png',
        'images/Gem Blue.png',
        'images/Star.png',
        'images/Key.png',
        'images/Selector.png',
        'images/Rock.png'];
     
      if (difficulty === 'hard') clearInterval(interval1);
      dy = ( Math.floor(2.9 * Math.random()) + 1 ) * access.imgHeight;
      dx =  Math.floor(4.9 * Math.random()) * access.imgWidth;
      idx = Math.floor(6.9 * Math.random());
      Player.prototype.render = function() {
        access.ctx.drawImage(Resources.get(myObjects[idx]), 0, 63, 101, 108, dx, dy-5, access.imgWidth, access.imgHeight-5);
        access.ctx.drawImage(Resources.get(this.sprite), 0, 53, 101, 108, this.dx, this.dy-31, access.imgWidth, access.imgHeight+22); 
      }

      interval = setTimeout(()=>{
          Player.prototype.render = defaultRender;
          if (difficulty === 'hard'){
            idx= 6;
            dy = ( Math.floor(2.9 * Math.random()) + 1 ) * access.imgHeight;
            dx =  Math.floor(4.9 * Math.random()) * access.imgWidth;
            randomStoneBlock();
          } 
          if (difficulty === 'easy') stone = undefined;
          startGemCountDown();
      }, 10000);

    }

    function randomTime() {
       return 3000*Math.random() + 10000;
    }

    function startGemCountDown() {
      interval2 = setTimeout(gemPlacement, randomTime());
    }

    function randomStoneBlock(){
      interval1 = setInterval(()=>{
          dy = ( Math.floor(2.9 * Math.random()) + 1 ) * access.imgHeight;
          dx =  Math.floor(4.9 * Math.random()) * access.imgWidth;
        }, 5000)
    }

    function endGame() {
      document.querySelector('.scorepanel').classList.add('hide');
      document.querySelector('canvas').classList.add('hide');
      const chars = document.querySelector('.message p').children;
      for (const char of chars ){
        char.remove();
      }
      if(level === 11 && heart > 0){
        message.firstElementChild.textContent = 'Congratulations!!!';
        message.firstElementChild.style.marginBottom = '0';
        message.firstElementChild.nextElementSibling.textContent = `you managed to cross the bug runway 
                                                                    alive only a few legends have done this!!!. 
                                                                    You've proved your competence and now crowned the rightful heir to the throne.`;

        let El = Resources.get(`${player.sprite}`);
        message.firstElementChild.nextElementSibling.prepend(El);
        document.querySelector('.message').classList.remove('hide');
      }else{
        message.firstElementChild.textContent = 'game over!!!';
        message.firstElementChild.style.marginBottom = '100px';
        message.firstElementChild.nextElementSibling.textContent = 'it wasn\'t ever easy, only a few legends have been able to cross the bug runway. You can be one, but you have to work harder';
        document.querySelector('.message').classList.remove('hide');
      }
    }

    function updateScorePanel(){
    const scorePanel = document.getElementsByClassName('scorepanel')[0];
    scorePanel.firstElementChild.textContent = `level: ${level}`;
    scorePanel.lastElementChild.previousElementSibling.textContent = `difficulty: ${difficulty}`
    const hearts = scorePanel.firstElementChild.nextElementSibling.children;
    if (init !== true){
        document.querySelector('.heart').textContent = ''
      for(const heart of hearts){
        heart.remove();
      }
      for(let i = 0; i < 4; i++){
        const img = new Image();
        img.src = 'images/Heart.png';
        document.querySelector('.heart').appendChild(img);
      }
      if(difficulty === 'easy') init = true; startGemCountDown();
      if(difficulty === 'hard' && init !== true ){
        defaultRender = function() {
          access.ctx.drawImage(Resources.get('images/Rock.png'), 0, 63, 101, 108, dx, dy-5, access.imgWidth, access.imgHeight-5);
          access.ctx.drawImage(Resources.get(this.sprite), 0, 53, 101, 108, this.dx, this.dy-31, access.imgWidth, access.imgHeight+22); 
        }
        Player.prototype.render = defaultRender;
        dy = ( Math.floor(2.9 * Math.random()) + 1 ) * access.imgHeight;
        dx =  Math.floor(4.9 * Math.random()) * access.imgWidth;
        idx = 6;
        init = true;
        randomStoneBlock();
      }
    }
    document.getElementsByClassName('scorepanel')[0].classList.remove('hide');
    document.getElementsByTagName('canvas')[0].classList.remove('hide');
  }

  function reset() {
    x = 1.75;
    init = false;
    level = 1;
    heart = 4;
    player.dx = 2*access.imgWidth;
    player.dy = 5*access.imgHeight;
    if (difficulty === 'hard') clearInterval(interval1);
    clearInterval(interval);
    clearInterval(interval1);
    clearInterval(interval2);
    clearInterval(interval3);
    Player.prototype.render = defaultRender;
    updateScorePanel();
    message.classList.add('hide');
  }

  function restart() {
    reset();
    document.querySelector('.scorepanel').classList.add('hide');
    document.querySelector('canvas').classList.add('hide');
    document.querySelector('.intro').removeAttribute('hidden');
  }




                      /*EVENT LISTENERS*/

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

document.getElementsByTagName('canvas')[0].addEventListener('touchstart', function(e){
  player.handleSwipes(e);
});

document.getElementsByTagName('canvas')[0].addEventListener('touchend', function(e){
    player.handleSwipes(e);
});


document.querySelector('.intro').addEventListener('click', function(e){
    if(e.target.tagName === 'IMG'){player = new Player(e.target.getAttribute('src'));
        document.getElementsByTagName('section')[0].setAttribute('hidden','');
        document.getElementsByTagName('section')[1].classList.remove('hide');}
  });

document.querySelector('.difficulty').addEventListener('click', function(e){
   if (e.target.tagName === 'BUTTON') {difficulty = e.target.textContent;
        document.getElementsByTagName('section')[1].classList.add('hide');
        reset();
        updateScorePanel();
      }
  });

document.querySelector('.scorepanel > button').addEventListener('click', reset);

document.querySelector('.message').addEventListener('click', function(e){
  if(e.target.classList.contains('restart')){
    restart();
  }else if(e.target.tagName === 'BUTTON'){
    reset();
  }else{return}
})})();





















let sprite;
let clock;
let sfx = true;
let greenGemAvailable = false;
let hour = $('.hour');
let minutes = $('.minutes');
let seconds = $('.seconds');
let sec = 0;
let mins = 0;
let hours = 0;

let starSfx = new Audio('./sfx/star-pick-up.mp3');
let move = new Audio('./sfx/move.wav');
let hit = new Audio('./sfx/player-hit.wav');
let powerUp = new Audio('./sfx/power-up.wav');
let levelUp = new Audio('./sfx/level-up.wav');
let crush = new Audio('./sfx/bug-kill.wav');


// SPRITE SELECTION SYSTEM
$('.character').click(function (e) {
    if ($(this).hasClass('alien-boy') === true) {
        $('.character').removeClass('selected');
        $(this).addClass('selected');
        sprite = 'images/char-boy.png';
    }
    else if ($(this).hasClass('cat-girl') === true) {
        $('.character').removeClass('selected');
        $(this).addClass('selected');
        sprite = 'images/char-cat-girl.png';
    }
    else if ($(this).hasClass('horn-girl') === true) {
        $('.character').removeClass('selected');
        $(this).addClass('selected');
        sprite = 'images/char-horn-girl.png';
    }
    else if ($(this).hasClass('pink-girl') === true) {
        $('.character').removeClass('selected');
        $(this).addClass('selected');
        sprite = 'images/char-pink-girl.png';
    }
    else if ($(this).hasClass('princess-girl') === true) {
        $('.character').removeClass('selected');
        $(this).addClass('selected');
        sprite = 'images/char-princess-girl.png';
    }
})

// START GAME BUTTON
$('#start').click(function (e) {
    e.preventDefault();
    if (sprite === undefined) {
        $('.tip').text('please pick a character by clicking or tapping it');
    }else {
        $('.modal-begin').addClass('close');
        window.gameInit();
    }
})


class Enemy {
    constructor(x, y) {
        this.x = x,
            this.y = y,
            this.character = 'images/enemy-bug.png';
        this.speed = Math.random() * 500;
    }

    update(dt) {
        if (player.hasOrangeGem === true) {
            this.speed = 30;
        } else {
            this.speed = Math.random() * 400 + (10 * tracker.level);
        }


        if (this.x > 500) {
            this.x = Math.random() * -800;
            this.speed = (Math.random() * 400) + (10 * tracker.level);;

        }

        // You should multiply any movement by the dt parameter
         // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;

        //handling collision with the Player
        if ((this.x + 50) >= player.x && (this.x - 50) <= player.x && player.hasBlueGem === false) {
            if (player.y === this.y) {
                if (player.hasRock === true) {
                    crush.play();
                    this.x = 3000;
                    player.hasRock = false;
                    player.hasItem = false;
                } else {
                    hit.play();
                    player.life--
                    player.x = 200;
                    player.y = 393.5;
                }
            }
        }
    };

    render() {
        if (player.hasGreenGem === true) {
            this.x = 3000;
            ctx.drawImage(Resources.get(this.character), this.x, this.y);
        } else {
            ctx.drawImage(Resources.get(this.character), this.x, this.y);
        }

    };

}

//PLAYER CONSTRUCTOR

class PlayerFunction {
    constructor(x, y,) {
        this.x = x;
        this.y = y;
        this.hasItem = false;
        this.hasBlueGem = false;
        this.hasOrangeGem = false;
        this.hasGreenGem = false;
        this.hasRock = false;
        this.life = 4;
    }
    update(dt) {
        // You should multiply any movement by the dt paramete
        // which will ensure the game runs at the same speed for
        // all computers.
        if (this.y <= 0) {
            if (tracker.starToPick === 0) {
                levelUp.play();
                tracker.starPresent = false;
                tracker.level += 1;
                tracker.starToPick = 3;
                tracker.itemAvailable = 3;
                tracker.starPicked = 0;

            }
            setTimeout(() => {
                this.y = 393.5;
                this.x = 200;
            }, 200);
        }

        $('.life').text(player.life);

        if (player.life === 0) {
            gameOver()
            //reset();
        }
    };

    render() {
        if (player.hasRock === true) {
            ctx.drawImage(Resources.get(rock.character), this.x, this.y);
            ctx.drawImage(Resources.get(sprite), this.x, this.y);
        }
        else if (player.hasBlueGem === true) {
            ctx.drawImage(Resources.get(blueGem.character), this.x, this.y);
            ctx.drawImage(Resources.get(sprite), this.x, this.y);
        }
        else if (player.hasOrangeGem === true) {
            ctx.drawImage(Resources.get(orangeGem.character), this.x, this.y);
            ctx.drawImage(Resources.get(sprite), this.x, this.y);
        }
        else if (player.hasGreenGem === true) {
            ctx.drawImage(Resources.get(greenGem.character), this.x, this.y);
            ctx.drawImage(Resources.get(sprite), this.x, this.y);
        }
        else{
            ctx.drawImage(Resources.get(sprite), this.x, this.y);
        }
    };


    handleInput(direction) {
        if (direction === 'left' && sfx === true) {
            move.play();
            if (this.x > 50) {
                this.x -= 101;
            }
        }

        if (direction === 'right' && sfx === true) {
            move.play();
            if (this.x < 350) {
                this.x += 101;
            }
        }

        if (direction === 'up' && sfx === true) {
            move.play();
            if (this.y <= 400) {
                this.y -= 83;
            }
        }

        if (direction === 'down' && sfx === true) {
            move.play();
            if (this.y < 390) {
                this.y += 83;
            }
        }
    }


}
// Now instantiate your objects.

let enemy1 = new Enemy(Math.random() * -700, 61.5);
let enemy2 = new Enemy(Math.random() * -700, 144.5);
let enemy3 = new Enemy(Math.random() * -700, 227.5);
let enemy4 = new Enemy(Math.random() * -700, 310.5);
let enemy5 = new Enemy(Math.random() * -700, 61.5);
let enemy6 = new Enemy(Math.random() * -700, 144.5);
let enemy7 = new Enemy(Math.random() * -700, 227.5);
let enemy8 = new Enemy(Math.random() * -700, 310.5);



// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8];

// Place the player object in a variable called player

let player = new PlayerFunction(200, 393.5);




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


// GEM CONSTRUCTOR

class itemConstructor {
    constructor(x, y, sprite) {
        this.x = x,
            this.y = y,
            this.character = sprite;
    }

    update() {
        // ITEM COLLECTION SYSTEM
            if ((this.x + 50) >= player.x && (this.x - 50) <= player.x) {
                if ((player.y === 310.5 && this.y === 373.5) || (player.y === 227.5 && this.y === 290.5) || (player.y === 144.5 && this.y === 207.5) || (player.y === 61.5 && this.y === 124.5)) {
                    // CHECK ITEM AND GIVE POWER UP
                    if (this === blueGem) {
                        powerUp.play();
                        player.hasBlueGem = true;
                        tracker.itempresent = false;
                        player.hasItem = true;
                        tracker.itemAvailable -= 1
                        setTimeout(() => {
                            player.hasBlueGem = false;
                            player.hasItem = false;
                        }, 10000);
                    }

                    if (this === orangeGem) {
                        powerUp.play();
                        player.hasOrangeGem = true;
                        tracker.itempresent = false;
                        player.hasItem = true;
                        tracker.itemAvailable -= 1;
                        setTimeout(() => {
                            player.hasOrangeGem = false;
                            player.hasItem = false;
                        }, 10000);
                    }

                    if (this === greenGem) {
                        powerUp.play();
                        player.hasGreenGem = true;
                        tracker.itempresent = false;
                        tracker.itemAvailable -= 1;
                        player.hasItem = true;
                        setTimeout(() => {
                            player.hasGreenGem = false;
                            player.hasItem = false;
                        }, 5000);
                    }

                    if (this === rock) {
                        powerUp.play();
                        player.hasRock = true;
                        tracker.itempresent = false;
                        player.hasItem = true;
                        tracker.itemAvailable -= 1;
                        setTimeout(() => {
                            player.hasRock = false;
                            player.hasItem = false;
                        }, 20000);
                    }

                    if (this === heart) {
                        powerUp.play();
                        tracker.itemAvailable -= 1;
                        tracker.itempresent = false;
                        player.life += 1;
                    }

                    if (this === star) {
                        starSfx.play();
                        if (tracker.starToPick > 0.5) {
                            tracker.starPresent = false;
                            tracker.starToPick -= 1;
                            tracker.starPicked += 1;
                            tracker.totalStar += 1;
                        }
                    }
                }
            };
    };

    render() {
        ctx.drawImage(Resources.get(this.character), this.x, this.y);
    };

}

// ITEM OBJECTS

let blueGem = new itemConstructor(0, 0, 'images/gem-blue.png');

let greenGem = new itemConstructor(0, 0, 'images/gem-green.png');

let orangeGem = new itemConstructor(0, 0, 'images/gem-orange.png');

let heart = new itemConstructor(0, 0, 'images/Heart.png');

let rock = new itemConstructor(0, 0, 'images/Rock.png');

let star = new itemConstructor(0, 0, 'images/Star.png');

// GEM ARRAY 

var allItems = [blueGem, orangeGem, heart, rock];

// ITEM TRACKING OBJECT 

var tracker = {
    itempresent: false,
    itemAvailable: 3,
    starPresent: false,
    starToPick: 3,
    starPicked: 0,
    level: 1,
    totalStar: 0,
    update: function () {
        $('.level').text(`${this.level}`);
        $('.star-count').text(`${this.starPicked}`);
        $('.total-star-count').text(`${this.totalStar}`);

        if (this.level >= 15 && greenGemAvailable === false) {
            greenGemAvailable = true;
            allItems.push(greenGem);
        }
    }
}

// mobile view controls

var up = document.getElementById('up'),
    down = document.getElementById('down'),
    left = document.getElementById('left'),
    right = document.getElementById('right');


// CONTROLS FOR MOBILE PLAYERS
up.addEventListener('click', function (e) {
    player.handleInput('up');
});

down.addEventListener('click', function (e) {
    player.handleInput('down');
});

left.addEventListener('click', function (e) {
    player.handleInput('left');
});

right.addEventListener('click', function (e) {
    player.handleInput('right');
});



// TIMER FUNCTION
function timer() {
    sec++;

    if (sec === 60) {
        sec = 0;
        mins++;
        if (mins === 60) {
            mins = 0;
            hours++;
        }
    }

    // update seconds
    seconds.text(function () {
        if (sec > 9) {
            return sec;
        } else {
            return `0${sec}`;
        }
    })

    // update minutes
    minutes.text(function () {
        if (mins > 9) {
            return `${mins}`;
        } else {
            return `0${mins}`;
        }
    })

    // update hour
    hour.text(function () {
        if (hours > 9) {
            return `${hours}`;
        } else {
            return `0${hours}`;
        }
    })

    count();
}

function count() {
    // start timer
    clock = setTimeout(timer, 1000);
}


// RESET FUNCTION THAT JUST RELOADS THE PAGE
function reset() {
    location = location;
}

// GAME OVER FUNCTION THAT THROWS A RENCH INTO THE ENGINE I DONT KNOW WHY IT WORKS
function gameOver () {
    sfx = false;
    clearInterval(clock);
    $('.modal-end').addClass('open');
    tracker.totalStar = 0;
    window.gameInit();
}

//PLAY AGAIN OPTION
$('.yes-play').click(function (e) {
    reset()
});

// PLAY AGAIN OPTION
$('.no-play').click(function (e) {
    reset()
});