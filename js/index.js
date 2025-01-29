
//game constants
let inputDir= {x:0,y:0};
let gameMusic= new Audio('music/music.mp3');
let foodsound= new Audio('music/food.mp3');
let movesound= new Audio('music/move.mp3');
let gameoversound= new Audio('music/gameover.mp3');
let speed = 12;
let score = 0;
let lastPaintTime = 0;             //last time frame painted
let snakeArr = [ {x:13, y:15} ]
 let food = {x:10, y:10}


//game functions
function main(ctime){
window.requestAnimationFrame(main);
if((ctime - lastPaintTime)/1000 < 1/speed){          // 1/speed is the seconds per frame . the speed is frame 
    return;                                       //skip painting this frame
     }
     lastPaintTime = ctime;                //else part of above if function
     gameEngine();
  
}


function isCollide(snake) {
    // if u bump into your self
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x=== snake[0].x && snake[i].y === snake[0].y ) {       
            return true;
        }
    }
        //snake collide to the wall
        if (snake[0].x > 18 || snake[0].x < 0 || snake[0].y > 18 || snake[0].y< 0 ) {
            return true;
            
        }       
}


function gameEngine(){
    
    if(isCollide(snakeArr)){
        gameoversound.play();
        gameMusic.pause();
        inputDir = {x:0,y:0};
        alert("game over!!!   press any key to play again ");
        snakeArr = [ {x:13, y:15} ];
        gameMusic.play();
        score = 0;
        scorecard.innerHTML = "score : " + score;

    }


    //if food has eaten ,increment the score and regenerate the food
    if (snakeArr[0].y=== food.y && snakeArr[0].x === food.x) {
        foodsound.play();
        score++;
        scorecard.innerHTML = "score : " + score;
        
        
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y  });    //to increment the snake array by food
         

        let a = 2;   // as the board is of 18*18 so we took a margin
        let b = 16;         //  of 2 to 16 for food generation 
        
        food = {x: Math.round(a + (b-a)* Math.random()) , y: Math.round(a + (b-a)* Math.random()) }  //to generate the random no bw a and b 
         
    }




    //moving the  snake
    //part1 : updating the snake array and food
    for (let i = snakeArr.length - 2; i>=0 ; i--){            //the last sec element in the snakeArray
        snakeArr[i+1] = {...snakeArr[i]};
       
    }

    snakeArr[0].x += inputDir.x;    //to move snake 
    snakeArr[0].y += inputDir.y;



   //part2 : display the snake and food
    // display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add("head");
        }
        else{
        snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });
    

    //display the food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add("food")
        board.appendChild(foodElement);
}


//all game logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", e=>{
    inputDir = {x:0,y:1}          //start the game
    movesound.play();
    switch (e.key) {

        case "ArrowUp":                      //for the directions check webpage x,y cartecian
             console.log("arrowup")
             inputDir.x = 0;
             inputDir.y = -1;
                break;

        case "ArrowDown":
            console.log("Arrowdown")
             inputDir.x = 0;
             inputDir.y = 1;
            break;
            
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        

    
        default:
            break;
    }
});







