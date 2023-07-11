// SHIPDATAARRAY array of objects of the rockets
import shipOneImg from '../assets/falcon1-shipOne.png';
import shipTwoImg from '../assets/falcon9-shipTwo.png';
import shipThreeImg from '../assets/falconHeavy-shipThree.png';
import shipFourImg from '../assets/starShip-shipFour.png';

// set rocket ship grid data, which is exported to playerGrid.js
const shipDataArray = [
    {
        'stringName': 'Falcon 1',
        'image': shipOneImg,
        'shipName': 'Falcon1',
        'spaces': 3,
        'orientation': 'vertical',
        'playerGridRef': [],
        'NPCGridRef': [],
        'attackedGridCells': []
    },
    {
        'stringName': 'Falcon 9',
        'image': shipTwoImg,
        'shipName': 'Falcon9',
        'spaces': 4,
        'orientation': 'vertical',
        'playerGridRef': [],
        'NPCGridRef': [],
        'attackedCells': []

    },
    {
        'stringName': 'Falcon Heavy',
        'image': shipThreeImg,
        'shipName': 'FalconHeavy',
        'spaces': 4,
        'orientation': 'vertical',
        'playerGridRef': [],
        'NPCGridRef': [],
        'attackedCells': []
    },
    {
        'stringName': 'Starship',
        'image': shipFourImg,
        'shipName': 'Starship',
        'spaces': 5,
        'orientation': 'vertical',
        'playerGridRef': [],
        'NPCGridRef': [],
        'attackedCells': []
    },
];

export default shipDataArray;