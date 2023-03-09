// Game constants and variable
let inputDir={
    x:0, y:0
};

const moveSound= new Audio("move.mp3");
const foodSound= new Audio("food.mp3");
const gameOverSound= new Audio("gameover.mp3");
let speed= 8;
let lastPaintTime=0;
let snakeArr= [{x: 13, y:15}];
let food= {x: 6, y:7};
let score=0;

// Game functions
function main(ctime){
    window.requestAnimationFrame(main);
    
    if ((ctime-lastPaintTime)/1000 < (1/speed)) {
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function collide(snake){
    // if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x=== snake[0].x && snake[i].y=== snake[0].y){
            return true;
        }
        
    }

    //if bump into wall

    if(snake[0].x >=18 || snake[0].x<=0 || snake[0].y >=18 || snake[0].y<=0  ){
        return true;
    }
    return false;

}

function gameEngine()
{
    // part 1--> updating snake and food
    if(collide(snakeArr)){
        gameOverSound.play();
        inputDir={x: 0, y: 0};
        alert("Game over :( Press Ctrl +R to restart the game");
        snakeArr= [{x: 13, y:15}];
        
         
    }
    // regenerate the food

    if(snakeArr[0].y==food.y && snakeArr[0].x==food.x){
        foodSound.play();
        score++;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiScoreBox.innerHTML= "Hi score: " + hiscoreval;
        }

        scoreBox.innerHTML= "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a=2, b=16;
        food= {x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
    }

    // move the snake

    for (let i = snakeArr.length-2; i >=0; i--) {
        snakeArr[i+1]={...snakeArr[i]};
        
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // part2--> Display/Render snake and food
    playArea.innerHTML= "";
    snakeArr.forEach((e, index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart= e.y;
        snakeElement.style.gridColumnStart= e.x;
   

    if(index===0)
    {
        snakeElement.classList.add('head');
    }

    else{
        snakeElement.classList.add('snake')
    }
    playArea.appendChild(snakeElement);
    });

    //dipslay food
    foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart= food.x;
        foodElement.classList.add('food');

        playArea.appendChild(foodElement);
}

// Main logic

let hiscore= localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval= JSON.parse(hiscore);
    hiScoreBox.innerHTML= "Hi score: "+ hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir= {x:0, y:1};
    switch (e.key) {
        case ("ArrowUp"):
            inputDir.x=0;
            inputDir.y=-1;
            break;
            case ("ArrowDown"):
                inputDir.x=0;
                inputDir.y=1;
            break;
            case ("ArrowRight"):
                inputDir.x=1;
                inputDir.y=0;
            break;
            case ("ArrowLeft"):
                inputDir.x=-1;
                inputDir.y=0;
            break;
    
        default:
            break;
    }
})