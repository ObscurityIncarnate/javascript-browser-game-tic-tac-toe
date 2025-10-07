const gameDimension =9;
const activeSymbol = [null, "X", "O"];
const activeDisplay =  []
const axisLength = Math.sqrt(gameDimension) ;



/*Cached Variables */
const sectionElement = document.querySelector("section");
const refreshElement = document.querySelector("#refresh")
const resultElement  = document.querySelector("#outcome");
sectionElement.style.gridTemplateColumns = "auto ".repeat(axisLength);

/*Functions */
const nextSymbol = (event)=>{
    selectedBox = event.target.id;
    boxId =  selectedBox.split("_")[1];
    activeDisplay[boxId] = (activeDisplay[boxId] +1 )%3
    console.log(activeDisplay[boxId])
    event.target.textContent = activeSymbol[activeDisplay[boxId]];
}
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

//checking from the right corner going down to the let corner. do all the grids along that axis have a matching value
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
            rowMatch = true
        }
    }
    return false
}

const verticalCheck = ()=>{

    let yborder = 0;
    // let axisSolution = false;
    let columnMatch = true;
    // for(let i =axisLength; i < gameDimension-axisLength; i++){
    //     // console.log(xborder)
    //     if(i<xborder ){
    //         if(rowMatch && activeDisplay[i]!==0){
    //             // console.log(activeDisplay[i], activeDisplay[i-1],activeDisplay[i] === activeDisplay[i-1]);
    //             rowMatch = activeDisplay[i] === activeDisplay[i-1];
    //         }else{
    //             rowMatch = false;
    //         }
    //     }else{
    //         if(rowMatch){
    //             return [true, xborder];
    //         }
    //         xborder+=axisLength;
    //         rowMatch = true
    //     }
    // }
    // return false
    let i =axisLength;
    let nextColIdx = i;
    while(nextColIdx < 2*axisLength){
        // console.log(i)
        if(i<gameDimension-axisLength && columnMatch){
            // if(columnMatch){
                // console.log(activeDisplay[i] !== 0,activeDisplay[i] === activeDisplay[i-axisLength],activeDisplay[i]===activeDisplay[i+axisLength])
                columnMatch = activeDisplay[i] !== 0 && activeDisplay[i] === activeDisplay[i-axisLength] && activeDisplay[i]===activeDisplay[i+axisLength];
                i+=axisLength;
            // }else{
                // columnMatch =  false;
            // }
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
const solutionCheck = ()=>{
    // const xMoves = []
    // const oMoves = []
    // const emptySpaces = []
    // activeDisplay.forEach((grid, index) => {
    //     if(grid === 1){
    //         xMoves.push(index);
    //     }else if(grid === 2){
    //         oMoves.push(index)
    //     }else{
    //         emptySpaces.push(index)
    //     }
    // })
    const lrdiagonal =  lrCheck();
    const rldiagonal = rlCheck();
    const row = horizontalCheck();
    const col =  verticalCheck();
    // console.log(lrCheck());
    // console.log(rlCheck());
    // console.log(horizontalCheck());
    // console.log(verticalCheck())
    
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
        while(i<gameDimension){
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
            i+=increment
        }
    }

    // console.log("these are x's moves", xMoves)
    // activeDisplay.for
}
const resetGameState = ()=>{
    resultElement.textContent = "";
    activeDisplay.forEach((tile, index)=>{
        activeDisplay[index] = 0
        gridElement= document.querySelector(`#grid_${index}`);
        gridElement.textContent ="";
        gridElement.style.color = "black";
    });

}
for(let i = 0; i < gameDimension; i++){
    const gridElement = document.createElement('div');
    gridElement.id = `grid_${i}`
    gridElement.classList.add("grid");
    document.querySelector("section").appendChild(gridElement);
    activeDisplay.push(0);
    /* Event listener */
    console.log(Math.sqrt(gameDimension))
    gridElement.addEventListener("click",(event)=>{
        nextSymbol(event);
        // console.log("survives up to here");
        solutionCheck();
    } )
    
}
refreshElement.addEventListener("click", ()=>{
    resetGameState();
})

