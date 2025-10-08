# Tic Tac Toe

## Game details
### Player Vs Computer
1. The computer goes first and should set a tile to the computer's symbol
2. The user is then expected to click on an empty tile, all non empty tiles will not be able to be interacted with
3. The tile is then set to the user's symbol
4. Steps 1-3 are then repeated until either the player is able to get their symbols a certain number of times in a striaght line (the number of times is depended on the dimension of the game board, i.e if a 3x3 board is used 3 symbols in a straight line will be required), the computer is,  or alternatively all spaces are filled without a winner being declared.
5. A text is displayed on the webpage stating the game outcome(if the player won, if the computer won, if it was a tie), and flavourtext describing the result.
6. All tiles are no longer able to be interacted with.
7. The reset game button is required to be pressed to reset the game board back to a start state for another game. Going back to step 1.
### Player Vs Player
1. All tile spaces are empty. The game is waiting for a click on a tile from one of the players. 
2. On click that player 1(the player that went first) symbol will fill into the tile, that tile will be rendered inoperable, no longer able to be selected.
3. The current turn is now changed from Player 1's turn to Player 2's turn
4. Player 2 is then able to click on any empty tile to play their move 
5. On click player 2's (the player that went second) symbol will fill into the tile, that tile will be rendered inoperable, no longer able to be selected.
6. The current turn is handed back to Player 1'.
7. Steps 2-6 are then repeated until either a player is able to get their symbols a certain number of times in a striaght line (the number of times is depended on the dimension of the game board, i.e if a 3x3 board is used 3 symbols in a straight line will be required), or alternatively all spaces are filled without a winner being declared.
8. A text is displayed on the webpage stating the outcome of the game, and a brief description.
9. All tiles are no longer able to be interacted with.
10. The reset game button is required to be pressed to reset the game board back to a start state for another game. Going back to step 1.

The boolean variable isThereP2 in ./js/app.js currently controls which game mode will be playable. 
## Computer Logic
The computer adversary works by selecting a random number between 0 and 1. This random number is then multiplied by the how many non empty tiles are available. The output is then used to the id of the corresponding tile, and that tile is then updated to show the computer's symbol.
## Game Dimension 
The numeric varaible gameDimension located in ./js/app.js, is intended to control the board dimension. A 3x3 board will have a gameDimension value of 9, a 4x4 board will have a gameDimension of 16. Game dimension should ideally be a square number, the game has not been tested to function for non square numbers.