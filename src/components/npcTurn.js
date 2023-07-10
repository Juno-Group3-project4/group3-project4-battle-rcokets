// function to generate random computer guesses
export const npcTurn = () => {
    const randomRowNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const generateRandomLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const randomNumber = () => {
        let generateRandomNumber = Math.floor(Math.random() * 10);
        return generateRandomNumber;
    };
    let NPCRandomCellGuess = `${generateRandomLetter[randomNumber()]}${randomRowNumber[randomNumber()]}`;
    return NPCRandomCellGuess;
};

