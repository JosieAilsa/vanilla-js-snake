/*
1. When user clicks start hide the start div

2. Create new apple in a random location
- Create a div in the random location using appendChild 
- Style with CSS classes using svg as bg
- Use grid col/row start to generate random values (using mathRandom) then +1 to each number to get apple location

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