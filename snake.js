const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');
const size = Math.round(canvas.width / 50);
const xEnd = Math.round(canvas.width / size) * size;
const yEnd = Math.round(canvas.height / size) * size;
let directionLock = false;
var score;

var requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame||
                            window.webkitRequestAnimationFrame||
                            window.msRequestAnimationFrame;
                            
//States 
const snake = [{x: 0, y: 0}];
const apple = {};
let direction = 'right';
let speed = 200;
let lockDirection = false;

function random(min, max){
    return Math.random() * (max - min) + min;
}

function setApple(){
    apple.x = Math.round(random(size, canvas.width - size) / size) * size;
    apple.y = Math.round(random(size, canvas.height - size) / size) * size;
}

function insertText(){
    var points = document.getElementById('points').innerHTML;
    score = parseInt(points) + 1;
    document.getElementById('points').innerHTML = score;
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, size, size);
    /*context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, size, size);  */
  
    for (let i = 0; i < snake.length; i += 1){
      const s = snake[i];
      context.fillStyle = '#fff';
      context.fillRect(s.x, s.y, size, size);
    }
    requestAnimationFrame(draw);
  }
  
function tick(){
    for(let i = snake.length-1; i >= 0; i--){
        if(i === 0 && snake[i].x === apple.x && snake[i].y === apple.y){
            insertText();
            snake.push({})
            setApple();
        }
    }
    for(let i = snake.length-1; i >= 0; i--){
        const s = snake[i];
        if(i == 0){
            switch(direction){
                case 'right':
                    if(s.x > canvas.width) s.x = 0;
                    else s.x += size;
                break;

                case 'left':
                    if(s.x < 0)s.x = xEnd;
                    else s.x -= size;
                break;

                case 'up':
                    if(s.y < 0) s.y = yEnd;
                    else s.y -= size;
                break;

                case 'down':
                    if(s.y > canvas.height )s.y = 0;
                    else s.y += size;
                break;
            }
            for(let j = 1; j < snake.length; j += 1){
                if(snake[0].x === snake[j].x && snake[0].y === snake[j].y){
                    alert("GAME OVER");
                    window.location.reload();
                }
            }
        }else{
            snake[i].x = snake[i-1].x;
            snake[i].y = snake[i-1].y;
        }
    }
    window.setTimeout(tick, speed);
    lockDirection = false;
}
function onKeyDown(keyPressed){
    if(!lockDirection){
        lockDirection = true;
        const newDirection = keyPressed.key.substr(5).toLowerCase();

        
    if (direction === 'left' && newDirection !== 'right') direction = newDirection;
    if (direction === 'up' && newDirection !== 'down') direction = newDirection;
    if (direction === 'down' && newDirection !== 'up') direction = newDirection;
    if (direction === 'right' && newDirection !== 'left') direction = newDirection;
    }
}
setApple();
window.addEventListener('keydown', onKeyDown);
window.setTimeout(tick, speed);
requestAnimationFrame(draw);