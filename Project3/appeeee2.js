// Enemies our player must avoid
var Enemy = function(corX, corY, velocity) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.corX = corX;
    this.corY = corY;
    this.velocity = velocity;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
let count = 0;
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.corX += this.velocity * dt;
    // console.log(`outterV`, this.corX,this.corY);
    if (this.corX > 610) {
        count += 1
        if (count < 4) {
            this.corX = Math.floor(Math.random()) * (-300);
            this.velocity = 400 + Math.floor(Math.random() * 300);
            // console.log(`1stset`, this.corX,this.corY); 
        }
        // delay the enemy at old number by 3sec;
        if (count % 2 == 0) {
            this.corX = -300;
            this.velocity = 0;
            setTimeout(() => {
                this.velocity = 393.5;
                // this.corX = -200;
            }, 3000);
        } else {
            this.corX = Math.floor(Math.random()) * (-300);
            // console.log(`others`, this.corX, this.corY);
            // console.log(count);
            this.velocity = 400 + Math.floor(Math.random() * 60);
        }
        if (count>9 &&count<25) {
            // count = 0;
            this.velocity *=2 ;
            this.corX = -200;
        }else if(count==25){
            //this.velocity +=300 ;
            count = 0;
        }else {count; console.log(count);}
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.corX, this.corY);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class PlayerImage extends Enemy {
    constructor(corX, corY, velocity=0) {
        super(corX, corY);
        // this.corX = corX;
        // this.corY = corY;
        this.velocity = velocity;
         this.sprite = 'images/char-pink-girl.png';
        // char-princess-girl.png char-pink-girl.png   char-boy.png char-horn-girl.png char-cat-girl.png
    }
    update() {
        // super.update();
        // console.log(`coordinate ${this.corX} ${this.corY}`)
        // reset();
        for (let i = 0; i < allEnemies.length; i++) {
            if (true) {
                let count = 0;
                count++;
                //{console.log(`y`, count,i)}
                if (allEnemies[i].corX >= this.corX -85 && allEnemies[i].corX <= this.corX+50 ) {
                    // console.log(`1stline`, count,i)
                    if (allEnemies[i].corY == 64 && (this.corY<145 && this.corY>0)) {
                        console.log(`1stline`, count, i)
                        for (let j = 0; j < 500; j += 100) {
                            console.log(j)
                            if (this.corX == j) {
                                this.corX = j;
                                this.corY = 435
                            }
                        }
                        // setTimeout(() => {
                        //     console.log(`1stline`, count,i)
                        // }, 1000);
                    } else if (allEnemies[i].corY == 147 && (this.corY<227 && this.corY>85)) {
                        console.log(`2ndline`, count, i)
                        for (let j = 0; j < 500; j += 100) {
                            console.log(j)
                            if (this.corX == j) {
                                this.corX = j;
                                this.corY = 435
                            }
                        }
                        // setTimeout(() => {
                        //     console.log(`2ndline`, count,i)
                        // }, 1000);
                    } else if (allEnemies[i].corY == 230 && (this.corY>168 && this.corY<310)) {
                        console.log(`3rdline`, count, i)
                        for (let j = 0; j < 500; j += 100) {
                            console.log(j)
                            if (this.corX == j) {
                                this.corX = j;
                                this.corY = 435
                            }
                        }
                        // setTimeout(() => {
                        //     console.log(`3rdline`, count,i)
                        // }, 1000);
                    } else { 
                         if (this.corY == -9) {
            console.log(`well done`);
            swal({
                title: "Good job! Congratulations!!!",
                text: "You made great effort! \n by completed the game after careful moves \n Well done!!!",
                icon: "success",
            });
            setTimeout(() => {
                this.corX = 200;
                this.corY = 435;
                count =0;
            }, 900);
        }
                        // player.corX != count ;
                        // player.corY !=count;
                    /*do nothing*/ }
                }
                // console.log(count,i, allEnemies[i].corY, allEnemies[i].corX)
            }
        }
       
    }


    render() {
        super.render();
        // ctx.drawImage(Resources.get(this.sprite), this.corX, this.corY);
    }
    handleInput(input) {
        if (input == "left") {
            // console.log(this.corX);
            if (this.corX > 0 && this.corX <= 400) {
                this.corX -= 100;
            }
        } else if (input == 'right') {
            // console.log(this.corX);
            if (this.corX >= 0 && this.corX < 400) {
                this.corX += 100;
            }
        } else if (input == 'down') {
            // console.log(this.corY);
            if ((this.corY >= -9) && this.corY < 411) {
                if (this.corY == 435) {
                    this.corY += 110;
                    // console.log(this.corY);
                } else if (this.corY == 73) {
                    this.corY += 82;
                    // console.log(this.corY);
                } else {
                    if (this.corY >= 400) {
                        //do thing
                    } else {
                        this.corY += 84;
                    }
                    // console.log(this.corY);
                }
            }
        } else if (input == 'up') {
            // console.log(this.corY);
            if ((this.corY > -9) && this.corY <= 435) {
                if (this.corY == 435) {
                    console.log(this.corX, this.corY);
                    this.corY -= 110;
                } else if (this.corY == 73) {
                    this.corY -= 82;
                    console.log(this.corX, this.corY);
                } else {
                    this.corY -= 84;
                    console.log(this.corX, this.corY);
                }
            }
        } else { /*do nothing for*/ }
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
//setting the array list for enemies
const allEnemies = [];
// Instantiate each enemy objects
const enemyOne = new Enemy(-100, 64, Math.random() * 700);
allEnemies.push(enemyOne),
    enemyTwo = new Enemy(-150, 147, Math.random() * 700),
    allEnemies.push(enemyTwo),
    enemyThree = new Enemy(-50, 230, Math.random() * 700),
    allEnemies.push(enemyThree),
    enemyFour = new Enemy(-300, 64, Math.random() * 700),
    allEnemies.push(enemyFour),
    enemyFive = new Enemy(-150, 230, Math.random() * 700),
    allEnemies.push(enemyFive);
// Place the player object in a variable called player
// Instantiate the player object
const player = new PlayerImage(200, 435);
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