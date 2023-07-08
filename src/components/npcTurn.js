
const npcTurn = (playerGridDivRef, allCellDivs) => {
    // console.log( 'COMPUTERS TURN BEGINS' );
    // console.log('playerGridDivRef=>>',playerGridDivRef);

    setTimeout(() => {
        const randomGrid = () => {
            const randomRowNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const generateRandomLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
            const randomNumber = () => {
                let generateRandomNumber = Math.floor(Math.random() * 10);
                return generateRandomNumber;
            };
            let NPCRandomCellGuess = `${generateRandomLetter[randomNumber()]}${randomRowNumber[randomNumber()]}`;
            // console.log('NPCRandomCellGuess', NPCRandomCellGuess);
            return NPCRandomCellGuess;
        };

        const computerGuess = randomGrid();
        // console.log(allCellDivs);

        allCellDivs.forEach((gridDivRef) => {
            if(gridDivRef.id === computerGuess && gridDivRef.style.backgroundColor === "blue") {
                gridDivRef.style.backgroundColor = "red";
                
                // console.log('yes');
            } else if (gridDivRef.id === computerGuess && gridDivRef.style.backgroundColor !== "blue"){
                gridDivRef.style.backgroundColor = "yellow";
                // console.log('nope');
            }
        })
        
    }, 2500);
    // compare it to newPlayerGridRef

        // => if hit => filter through allCellDivs & find div with matching id and change bg colour to red
            // => if miss => filter thru allcelldivs & target div with matching id and change bg colour to yellow
    
    // console.log('...END COMPUTERS TURN...');
}

export default npcTurn;