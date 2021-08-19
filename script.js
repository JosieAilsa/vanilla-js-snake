//Get DOM refs
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
const levelButton = document.querySelectorAll(".level__button");
const level = document.querySelector(".level");

//Declare gloabl vars 
// let snakeBody = [];
// let snakeLocation = {
//     head:  0,
//     body: snakeBody,

let snakeArray = [];
let lastButton = "";
let snakeSpeed = 0;  
let currentApple;


///Get random apple function 
let getAppleLocation = (boardSquares) => {
    //Create a random number between 0-625
    let getAppleRandomIndex = Math.floor(Math.random() * 626);
    //Set this to the apple location 
    let appleLocation = boardSquares[getAppleRandomIndex]; 
    //Add a class to this location 
    appleLocation.classList.add("apple");
    currentApple = getAppleRandomIndex;
}
// Get starting 
let getStartingSnake = () => {
    //Identify the center square 
    let boardCenter = 312
    snakeArray.push(boardCenter);
    let startingSnake = boardSquares[boardCenter];
    //Put the snake class on the center peice 
    startingSnake.classList.add("snake--head");
    return snakeArray;
}

//Game setup
levelButton.forEach((button) => {
    button.addEventListener(("change"), event => {
        return snakeSpeed = event.target.value;
    });
});

startButton.addEventListener("click", () => {
    if (snakeSpeed >= 1) {
// Remove the difficuty error if showing 
        level.classList.remove("level--error")
    // Remove add the start hidden class 
        startGame.classList.add("start--hide");
        textScreen.classList.remove("screen");
        textScreen.classList.add("screen--hide");
        //Show the new game board 
        board.classList.remove("screen--hide");
        board.classList.add("screen");
        //Add the static starting locations for the snake & apple
        getAppleLocation(boardSquares);
        getStartingSnake(snakeArray, boardSquares);
    } else {
    level.classList.add("level--error")
    }
});


// 2. Set up the logic for the moving snake 

let snakeLoopId; 

    up.addEventListener("click", () => {
        if (lastButton === "left" || lastButton === "right" || lastButton === "") {
        window.clearInterval(snakeLoopId);
        let upSnake = () => {
        return snakeMove( 25, "up");
        };
        snakeLoopId = window.setInterval(upSnake,(1000/snakeSpeed));
        }
    });
    
    left.addEventListener("click", () => {
        if (lastButton === "up" || lastButton === "down" || lastButton === "" ) {
            window.clearInterval(snakeLoopId);
            let leftSnake = () => {
                return snakeMove( 1, "left");
            };
        snakeLoopId = window.setInterval(leftSnake,(1000/snakeSpeed));
        }
    });
    
    right.addEventListener("click", () => {
        if (lastButton === "up" || lastButton === "down" || lastButton === "") {
            window.clearInterval(snakeLoopId);
            let rightSnake = () => {
                return snakeMove( -1, "right");
            };
        snakeLoopId = window.setInterval(rightSnake, (1000/snakeSpeed));
        };
    });

    down.addEventListener("click", () => {
        if (lastButton === "left" || lastButton === "right" || lastButton === "") {
            window.clearInterval(snakeLoopId);
            let downSnake = () => {
                return snakeMove( -25, "down");
            };
        snakeLoopId = window.setInterval(downSnake,(1000/snakeSpeed));
        };
    });
    //Each time there is a win create a new key pair for the snakeObject
    let checkForWin = (currentSnakeHead,currentApple, snakeArray) => {
    
    //if the snake head is the same as the apple
        if (boardSquares[currentSnakeHead] == boardSquares[currentApple]) {
    //add the current snake head position to the snake body array 
            snakeArray.push(currentSnakeHead);
            boardSquares[currentApple].classList.remove("apple")
            getAppleLocation(boardSquares)
           
        }
       
    }


let snakeMove = (directionValue, direction) =>  {
    //Check the new location to move to 
    let currentSnakeHead = snakeArray[0];
    checkForWin(currentSnakeHead,currentApple, snakeArray)
    let newSnakeHead = currentSnakeHead - directionValue;
    //Push this new value to the start of the snake array
    snakeArray.unshift(newSnakeHead);
    console.log(snakeArray)
    //This now gives an array that is now one too long so delete the last item but hold it in a new var
    let lastSnakePart = snakeArray.pop()
    snakeArray.forEach((part) => {
       let eachPartIndex = boardSquares[part]
       eachPartIndex.classList.add("snake--head");
     });
    console.log(lastSnakePart)
    //Now remove the snake value from the value in the final array
    boardSquares[lastSnakePart].classList.remove("snake--head");
    lastButton = `${direction}`;
    return snakeArray;
    };

//Every time there is a win a key value pair body part is created in the snake 


//Winnning the round//

// //Ending the game//

//     If the snake hits x or y coordinate of 1 or 25 = game over
//     if snakeHead === x & y of other snake body also game over 

//     Show play again loop

//     Push score to high scores array. Use .filter to find IF high score and add to innnerHTML on game UI 

//     Show the play again div

// 5. Create an array for high score and variable for current score. Each time snake eats apple score += points. 





