// let stringLevel = document.querySelector('.level');
// let level = 0;
let sound = new Howl({
    src: [`audio/tick.mp3`]
  });

let laugh = new Howl({
    src: [`audio/laughter.mp3`]
  });

let clap = new Howl({
    src: [`audio/clap.mp3`]
  });

let time = 5;

class Enemy {
    constructor(x, y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
       
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        if(this.x > 700) {
            this.x = -50;
            this.speed = 100 + Math.floor(Math.random() * 220); 
        }
        if(player.x < this.x + 80 && 
        player.x + 80 > this.x && 
        player.y < this.y + 60 &&
        60 + player.y > this.y){
            laugh.play();
            reset();
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

function reset(){
    player.x = 202;
    player.y = 405;
}

class Player {
    constructor(x, y) {
        setInterval(() => {
            time--
          }, 1000);

        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
        setInterval(() => {
            if(player.y <= 60){
                // level++;
                // stringLevel.textContent = level;
                clap.play();
                reset();
            }
            console.log('scoop added!');
          }, 1000);
    }

    update() {

    }
 
    render() {
        ctx.font = '90px Arial';
        
        if(time < 1){
            time = ``
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }
        ctx.fillText(`${time}`,230,350);
    } 

    handleInput(keyPress) {
        switch (keyPress) {
            case 'left':
                if (this.x > 0) {
                     this.x -= 102
                }
                sound.play();
                break;
            
            case 'right':
                if (this.x < 400) {
                    this.x += 102
                }
                sound.play();
                break;    
            
            case 'up':
                if (this.y > 0) {
                    this.y -= 83
                }
                sound.play();
                break; 

            case 'down':
                if (this.y < 405) {
                    this.y += 83
                }
                sound.play();
                break;
        } 

    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [
    new Enemy(0, 60, 60 + Math.random()* 100),
    new Enemy(0, 145, 50 + Math.random()* 100),
    new Enemy(0, 225, 80 + Math.random()* 100),
    new Enemy(-98, 160, 45 + Math.random()* 100),
    new Enemy(-98, 80, 70 + Math.random()* 100),
    new Enemy(-98, 225, 50 + Math.random()* 100)
];


// Place the player object in a variable called player
const player = new Player(202, 405);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
