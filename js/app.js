/* Constant */
const gameDimension =9;
const activeSymbol = [null, "X", "O"];
const activeDisplay =  []
const axisLength = Math.floor(Math.sqrt(gameDimension)) ;
const isThereP2 =  false;

/*Variabless */
let turn = 0;

/*Cached Variables */
const sectionElement = document.querySelector("section");
const refreshElement = document.querySelector("#refresh")
const resultElement  = document.querySelector("#outcome");
sectionElement.style.gridTemplateColumns = "auto ".repeat(axisLength);

/*Functions */
// the user changes a tile to their symbol
const nextSymbol = (event, symbol)=>{
    selectedBox = event.target.id;
    boxId =  selectedBox.split("_")[1];
    activeDisplay[boxId] = symbol;
    console.log(activeDisplay[boxId])
    event.target.textContent = activeSymbol[activeDisplay[boxId]];
    event.target.style.pointerEvents = "none";
}
//checking from the left corner going down to the right corner. all the grids along that axis have a matching value
const lrCheck = ()=>{
    const increment = axisLength+1;
    // console.log(increment)
    for(let i = 0; i<gameDimension; i+=increment){
        if(activeDisplay[i] !== activeDisplay[0]||activeDisplay[i]==0){
            return false
        }
        // console.log("so far so good")
    }
    return true
}

//checking from the right corner going down to the left corner. do all the grids along that axis have a matching value
const rlCheck = ()=>{
    const increment =  axisLength-1;
    for(let i = increment; i < gameDimension - increment; i+=increment){
        if(activeDisplay[i]!== activeDisplay[increment]||activeDisplay[i]==0){
            return false
        }
    }
    return true
}
//checking if there is a solution along a horizontal axis.
const horizontalCheck = ()=>{

    let xborder = 0;
    // let axisSolution = false;
    let rowMatch = false;
    for(let i =0; i < gameDimension+1; i++){
        // console.log(xborder)
        if(i<xborder ){
            if(rowMatch && activeDisplay[i]!==0){
                // console.log(activeDisplay[i], activeDisplay[i-1],activeDisplay[i] === activeDisplay[i-1]);
                rowMatch = activeDisplay[i] === activeDisplay[i-1];
            }else{
                rowMatch = false;
            }
        }else{
            if(rowMatch){
                return [true, xborder];
            }
            xborder+=axisLength;
            rowMatch = true;
        }
    }
    return false;
}
//checking if there is a solution along a vertical axis.
const verticalCheck = ()=>{
    let columnMatch = true;
    let i =axisLength;
    let nextColIdx = i;
    while(nextColIdx < 2*axisLength){
        // console.log(i)
        if(i<gameDimension-axisLength && columnMatch){
                columnMatch = activeDisplay[i] !== 0 && activeDisplay[i] === activeDisplay[i-axisLength] && activeDisplay[i]===activeDisplay[i+axisLength];
                i+=axisLength;
        }else{
            if(columnMatch){
                return [true, i]
            }else{
                nextColIdx+=1;
                i=nextColIdx;
                columnMatch = true
            }
        }    
    }
    return false
}

//check if the game should be declared over
const solutionCheck = ()=>{
    const lrdiagonal =  lrCheck();
    const rldiagonal = rlCheck();
    const row = horizontalCheck();
    const col =  verticalCheck();
    const tie = activeDisplay.every(((value)=> value!== 0));
    if(lrdiagonal){
        resultElement.textContent=   `${activeSymbol[activeDisplay[0]]} won with a crushing blow on the left to right diagonal.`;
        let i = 0;
        let increment =  axisLength+1; 
        while(i<gameDimension){
            document.querySelector(`#grid_${i}`).style.color = "red";
            i+=increment
        }
    }
    if(rldiagonal){
        resultElement.textContent = `${activeSymbol[activeDisplay[axisLength-1]]} won with a crushing blow on the right to left diagonal.`;
        let i = axisLength-1;
        let increment =  axisLength-1; 
        while(i<gameDimension-1){
            document.querySelector(`#grid_${i}`).style.color = "red";
            i+=increment
        }
    }
    if(row[0]){
        resultElement.textContent= `${activeSymbol[activeDisplay[row[1]-1]]} takes the win by storming row ${Math.floor(row[1]/axisLength)}.`;
        let i = row[1]-1;
        let increment = -1; 
        while(i>= row[1]-axisLength){
            document.querySelector(`#grid_${i}`).style.color = "red";
            i+=increment
        }
    }
    if(col[0]){
        resultElement.textContent= `Column ${(col[1]%axisLength)+1} proved pivotal in ${activeSymbol[activeDisplay[col[1]]]}'s win.`;
        let i = col[1];
        let increment = -axisLength; 
        while(i>=0){
            document.querySelector(`#grid_${i}`).style.color = "red";
            i+=increment;
        }
    }
    
    if(col[0] || row[0]|| lrdiagonal|| rldiagonal){
        return true;
    }else{
        if(tie){
            resultElement.textContent= `A hard fought battle with no clear victor, the result is a tie.`;
            return true;
        }
        return false;
    }

}

//the cpu adversary's play logic
const computerTurn = ()=>{
    const availableTiles = activeDisplay.map((symbol, index)=> index).filter((symbol)=> activeDisplay[symbol]===0)
    // console.log(availableTiles);
    const computerPlays = availableTiles[Math.floor(Math.random() * availableTiles.length)];
    // console.log(document.querySelector(`#grid_${computerPlays}`))
    
    activeDisplay[computerPlays] = 2;
    const playedTile = document.querySelector(`#grid_${computerPlays}`);
    playedTile.textContent = activeSymbol[activeDisplay[computerPlays]];
    playedTile.style.pointerEvents = "none";
}

//prevent user from changing selections
const freezeGameState =()=>{
    for(let i = 0; i < gameDimension; i++){
        document.querySelector(`#grid_${i}`).style.pointerEvents ="none";
    }
}
//allow  for freee selection on reset
const unfreezeGameState= ()=>{
    for(let i = 0; i < gameDimension; i++){
        document.querySelector(`#grid_${i}`).style.pointerEvents ="auto";
    }
}
//reset the game
const resetGameState = ()=>{
    resultElement.textContent = "";
    turn = 0;
    activeDisplay.forEach((tile, index)=>{
        activeDisplay[index] = 0
        gridElement= document.querySelector(`#grid_${index}`);
        gridElement.textContent ="";
        gridElement.style.color = "black";
    });
    unfreezeGameState();
    if(!isThereP2){
        computerTurn();
    }
}

/* Event listeners */
for(let i = 0; i < gameDimension; i++){
    const gridElement = document.createElement('div');
    gridElement.id = `grid_${i}`
    gridElement.classList.add("grid");
    document.querySelector("section").appendChild(gridElement);
    activeDisplay.push(0);
    
    console.log(Math.sqrt(gameDimension))
    gridElement.addEventListener("click",(event)=>{
        nextSymbol(event, turn+1);
        // console.log("survives up to here");
        if(solutionCheck() === false){
            if(isThereP2==false){
                computerTurn();
                if(solutionCheck()){
                    freezeGameState();
                }
            }else{
                turn = (turn+1)%2
            }
            
        }else{
            freezeGameState();
        }
    } )
    
}
refreshElement.addEventListener("click", ()=>{
    resetGameState();
})

if(!isThereP2){
    computerTurn();
}
