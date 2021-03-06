//Get DOM refs
const startGame = document.querySelector("#start");
const endGame = document.querySelector("#end");
const startButton = document.querySelector("#start__button");
const boardSquares= document.querySelectorAll(".board__square");
const loseSquares = document.querySelectorAll(".lose__square")
const board = document.querySelector("#board");
const textScreen = document.querySelector("#textScreen");
const up = document.querySelector("#up");
const left = document.querySelector("#left");
const right = document.querySelector("#right");
const down = document.querySelector("#down");
const levelButton = document.querySelectorAll(".level__button");
const level = document.querySelector(".level");
const replay = document.querySelector("#replay");
const replayButton = document.querySelector("#replay");
const currentScoreText = document.querySelector("#current-score__value");
const highScore = document.querySelector("#high-score__value");
const levelErrorMsg = document.querySelector("#error-msg");

//Declare gloabl vars 
// let snakeBody = [];
// let snakeLocation = {
//     head:  0,
//     body: snakeBody,

let snakeArray = [];
let lastButton = "";
let snakeSpeed = 0;  
let currentApple;
let currentScore = 0;
let highScoreArray = [];


///Get random apple function 
let getAppleLocation = (boardSquares, getAppleRandomIndex, appleLocation ) => {
    //Create a random number between 0-625
    getAppleRandomIndex = Math.floor(Math.random() * 626);
    //Set this to the apple location 
    appleLocation = boardSquares[getAppleRandomIndex]; 
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
    startingSnake.classList.add("snake");
    return snakeArray;
}
let runGame = () => {
    // Remove the difficuty error if showing 
    level.classList.remove("level--error")
    levelErrorMsg.classList.add("level--errormsg-hide");
    levelErrorMsg.classList.remove("level--errormsg");
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
}

let showStartError = () => {
    level.classList.add("level--error")
    levelErrorMsg.classList.remove("level--errormsg-hide");
    levelErrorMsg.classList.add("level--errormsg");
}

//Game setup
levelButton.forEach((button) => {
    button.addEventListener(("change"), event => {
        return snakeSpeed = event.target.value;
    });
});

startButton.addEventListener("click", () => {
    if (snakeSpeed >= 1) {
        runGame();
    } else {
        showStartError();
    }
});

replayButton.addEventListener("click", () => {
    //Hide the board screen 
    textScreen.classList.remove("screen")
    //Show the replay screen 
    replay.classList.add("replay--hide");
    replay.classList.remove("replay");
    board.classList.remove("screen--hide");
    board.classList.add("screen");
    snakeArray = [];
    lastButton = ""; 
    currentApple = 0;
    getAppleLocation(boardSquares);
    getStartingSnake(snakeArray, boardSquares);
})
// 2. Set up the logic for the moving snake 

let snakeLoopId; 

    up.addEventListener("click", () => {
        if (snakeSpeed < 1) {
            showStartError();
            return;
        }
        if (lastButton === "left" || lastButton === "right" || lastButton === "") {
        window.clearInterval(snakeLoopId);
        let upSnake = () => {
        return snakeMove( 25, "up");
        };
        snakeLoopId = window.setInterval(upSnake,(1000/snakeSpeed));
        }
    });
    
    left.addEventListener("click", () => {
        if (snakeSpeed < 1) {
            showStartError();
            return;
        }
        if (lastButton === "up" || lastButton === "down" || lastButton === "" ) {
            window.clearInterval(snakeLoopId);
            let leftSnake = () => {
                return snakeMove( 1, "left");
            };
        snakeLoopId = window.setInterval(leftSnake,(1000/snakeSpeed));
        }
    });
    
    right.addEventListener("click", () => {
        if (snakeSpeed < 1) {
            showStartError();
            return;
        }
        if (lastButton === "up" || lastButton === "down" || lastButton === "") {
            window.clearInterval(snakeLoopId);
            let rightSnake = () => {
                return snakeMove( -1, "right");
            };
        snakeLoopId = window.setInterval(rightSnake, (1000/snakeSpeed));
        };
    });

    down.addEventListener("click", () => {
        if (snakeSpeed < 1) {
            showStartError();
            return;
        }
        if (lastButton === "left" || lastButton === "right" || lastButton === "") {
            window.clearInterval(snakeLoopId);
            let downSnake = () => {
                return snakeMove( -25, "down");
            };
        snakeLoopId = window.setInterval(downSnake,(1000/snakeSpeed));
        };
    });
    //Each time there is a win create a new key pair for the snakeObject
    let checkIfWin = (currentSnakeHead,currentApple, snakeArray) => {
    
    //if the snake head is the same as the apple
        if (boardSquares[currentSnakeHead] == boardSquares[currentApple]) {
    //add the current snake head position to the snake body array 
            snakeArray.push(currentSnakeHead);
            boardSquares[currentApple].classList.remove("apple")
            getAppleLocation(boardSquares)
            currentScore += (10 * snakeSpeed)
            currentScoreText.innerHTML = `${currentScore}`;
        }
    }
     
 

    let updateLose = () => {
        highScoreArray.push(currentScore);
        board.classList.add("screen--hide");
        textScreen.classList.remove("screen--hide")
        textScreen.classList.add("screen")
        replay.classList.remove("replay--hide");
        replay.classList.add("replay");
        clearInterval(snakeLoopId);
        boardSquares[currentApple].classList.remove("apple");
        currentApple = 0;
        for (let i = 0; i < boardSquares.length; i++ ){
            boardSquares[i].classList.remove("snake")
            boardSquares[i].classList.remove("apple")
        }
        snakeArray.forEach((part) => {
            let eachPartIndex = boardSquares[part]
            eachPartIndex.classList.remove("snake");
          });
        snakeArray = [];
        currentSnakeHead = 0;
        directionValue = 0;
        newSnakeHead = 0;
        currentApple = 0;
        currentScore = 0;
        getStartingSnake(snakeArray, boardSquares);
        highScore.innerHTML = `${getHighScore()}`;
        currentScoreText.innerHTML = `${currentScore}`;
    } 

    let checkIfSnakeOverlap = (newSnakeHead) => {
     let isOverlap;
     snakeArray.forEach((part) => {
                if (part === newSnakeHead) {
                    isOverlap = true; 
                }
            });
        return isOverlap;
        };
        
    let checkIfLose = (newSnakeHead, currentSnakeHead) => {
    //If the snake touches the top or bottom lines or itself return true 
        if (checkIfSnakeOverlap(newSnakeHead) === true) { 
            return true;
        } else if ((newSnakeHead > 625) || (newSnakeHead < 0)) {
            return true;
        } else if (boardSquares[currentSnakeHead].classList.contains("lose__square") 
        && boardSquares[newSnakeHead].classList.contains("lose__square")) { 
            return true;
        };
    };

let snakeMove = (directionValue, direction) =>  {
    //Check the new location to move to 
    let currentSnakeHead = snakeArray[0];
    let newSnakeHead = currentSnakeHead - directionValue;
    let ifLose = checkIfLose(newSnakeHead, currentSnakeHead);
    if (ifLose === true) {
        updateLose()
        //Return to exit out of function 
        return
    }
    checkIfWin(currentSnakeHead,currentApple, snakeArray);
    //Push this new value to the start of the snake array
    snakeArray.unshift(newSnakeHead);
    console.log(snakeArray)
    //This now gives an array that is now one too long so delete the last item but hold it in a new var
    let lastSnakePart = snakeArray.pop();
    snakeArray.forEach((part) => {
       let eachPartIndex = boardSquares[part]
       eachPartIndex.classList.add("snake");
     });
    console.log(lastSnakePart)
    //Now remove the snake value from the value in the final array
    boardSquares[lastSnakePart].classList.remove("snake");
    lastButton = `${direction}`;
    return snakeArray;
    };

let getHighScore = () => {
    if (highScoreArray.length > 1) {
    let highScoreValue = highScoreArray.reduce(function(a,b) {
        return Math.max(a,b);
    },0)
    return highScoreValue;
    } else {
    return highScoreArray [0];
}
};


//     If the snake hits x or y coordinate of 1 or 25 = game over
//     if snakeHead === x & y of other snake body also game over 

//     Show play again loop

//     Push score to high scores array. Use .filter to find IF high score and add to innnerHTML on game UI 

//     Show the play again div

// 5. Create an array for high score and variable for current score. Each time snake eats apple score += points. 





