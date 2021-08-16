/*
1. When user clicks start hide the start div
*/
const startGame = document.querySelector("#start");
const startButton = document.querySelector("#start__button");
const boardSquares= document.querySelectorAll(".board__square");
const board = document.querySelector("#board");
const textScreen = document.querySelector("#textScreen");

startButton.addEventListener("click", () => {
 // Remove add the start hidden class 
    startGame.classList.add("start--hide");
    textScreen.classList.remove("screen");
    textScreen.classList.add("screen--hide");
    board.classList.remove("screen--hide");
    board.classList.add("screen");

// Add the divs to the game board 
    //Set up for a for loop to run 625 (25*25) times to add the divs to the board
    // for (let i = 0; i < 625; i++) {
    // let squareNumber = [i];
    // let squareHTML = `<div class = "board__square" id = "${squareNumber}"></div>`;
    // board.innerHTML += squareHTML; 
    // };
});


/*2. Create new apple in a random location*/

let getAppleLocation = (boardSquaresNodeList) => {
    let appleRandomIndex = Math.floor(Math.random() * 626);
    let appleLocation = boardSquaresNodeList[appleRandomIndex]; 
    appleLocation.classList.add


}


/*- Style with CSS classes using svg as bg
Use square id number to identify location of the apple 
3.Create the static snake
- Set size as 1 col/row width
- Add stying 
- For the head have a seperate class with an svg bg image

4. Logic of how the snake will move
- Every second the snake will move based on last button pressed by user  
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