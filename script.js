/*
1. When user clicks start hide the start div
*/
const startGame = document.querySelector("#start");
const endGame = document.querySelector("#end");
const startButton = document.querySelector("#start__button");
const replayButton = document.querySelector("#start__button");
const boardSquares= document.querySelectorAll(".board__square");
const board = document.querySelector("#board");
const textScreen = document.querySelector("#textScreen");
const up = document.querySelector("#up");
const left = document.querySelector("#left");
const right = document.querySelector("#right");
const down = document.querySelector("#down");
let snakeLocation = {
    head:  0,
};
let boardCenter = 312;
let lastButton = "";

///Get random apple function 
let getAppleLocation = (boardSquares) => {
    //Create a random number between 0-625
    let appleRandomIndex = Math.floor(Math.random() * 626);
    //Set this to the apple location 
    let appleLocation = boardSquares[appleRandomIndex]; 
    //Add a class to this location 
    appleLocation.classList.add("apple");
}
// Get starting 
let getStartingSnake = (boardSquares) => {
    //Identify the center square 
    snakeLocation.head = boardCenter;
    let startingSnake = boardSquares[boardCenter];
    //Put the snake class on the center peice 
    startingSnake.classList.add("snake--head");
}

//Game setup
startButton.addEventListener("click", () => {
 // Remove add the start hidden class 
    startGame.classList.add("start--hide");
    textScreen.classList.remove("screen");
    textScreen.classList.add("screen--hide");
    //Show the new game board 
    board.classList.remove("screen--hide");
    board.classList.add("screen");
    //Add the static starting locations for the snake & apple
    getAppleLocation(boardSquares);
    getStartingSnake(boardSquares);


});
boardSquares.forEach((square, index ) => {
    let squareNumber = index;
    square.setAttribute(`id`, `${squareNumber}`)
});



// 2. Set up the logic for the moving snake 
// Set up the repeating function that will check to see if a key has been pressed

let snakeMove = (boardSquares, currentSnake, directionValue, direction) =>  {
    let currentSnakeIndex = boardSquares[currentSnake];
    currentSnakeIndex.classList.remove("snake--head");
    currentSnake = currentSnake - directionValue;
    currentSnakeIndex = boardSquares[currentSnake];
    currentSnakeIndex.classList.add("snake--head")
    lastButton = `${direction}`;
    return snakeLocation.head = currentSnake;
    };

let snakeLoopId; 

    up.addEventListener("click", () => {
        if (lastButton === "left" || lastButton === "right" || lastButton === "") {
        window.clearInterval(snakeLoopId);
        let upSnake = () => {
            let currentSnake = snakeLocation.head;
            return snakeMove(boardSquares, currentSnake, 25, "up");
            };
        snakeLoopId = window.setInterval(upSnake,500);
        }
    });
    
    left.addEventListener("click", () => {
        if (lastButton === "up" || lastButton === "down" || lastButton === "" ) {
            window.clearInterval(snakeLoopId);
            let leftSnake = () => {
                let currentSnake = snakeLocation.head;
                return snakeMove(boardSquares, currentSnake, 1, "left");
            };
        snakeLoopId = window.setInterval(leftSnake,500);
        }
    });
    
    right.addEventListener("click", () => {
        if (lastButton === "up" || lastButton === "down" || lastButton === "") {
            window.clearInterval(snakeLoopId);
            let rightSnake = () => {
                let currentSnake = snakeLocation.head;
                return snakeMove(boardSquares, currentSnake, -1, "right");
            };
        snakeLoopId = window.setInterval(rightSnake, 500);
        };
    });

    down.addEventListener("click", () => {
        if (lastButton === "left" || lastButton === "right" || lastButton === "") {
            window.clearInterval(snakeLoopId);
            let downSnake = () => {
                let currentSnake = snakeLocation.head;
                return snakeMove(boardSquares, currentSnake, -25, "down");
            };
        snakeLoopId = window.setInterval(downSnake,500);
        };
    });

    
    
    

/*- Every second the snake will move based on last button pressed by user  
    If the previous key was up/down :
        Will move +1(right) or -1(left) x
    If the previous key was left or right:
        Can move +1(down) or -1(up) y 
setInterval - milliseconds 
setTimeOut - delay
//Winnning the round//

    if snakeHead === x&y of apple = +50 points added to score value


//Ending the game//

    If the snake hits x or y coordinate of 1 or 25 = game over
    if snakeHead === x & y of other snake body also game over 

    Show play again loop

    Push score to high scores array. Use .filter to find IF high score and add to innnerHTML on game UI 

    Show the play again div

5. Create an array for high score and variable for current score. Each time snake eats apple score += points. 






*/