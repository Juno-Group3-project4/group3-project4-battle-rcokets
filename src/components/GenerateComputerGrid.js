// import { useState } from 'react';
import BattleGrid from "./BattleGrid";
// import { useState } from "react";

const GenerateComputerGrid = ({ userRocketSizes, handleClick, readyToLaunch }) => {
    // generate rocket data for computer grid based on user's rocket selection (passed as props)
    const npcRocketData = userRocketSizes.map((rocketSize) => {
        return (
            {
                spaces: rocketSize,
                NPCGridRef: []
            }
        )
    })

    // variables
    const gridSize = 10;
    const gridCols = [
        { column: "A" }, { column: "B" },
        { column: "C" }, { column: "D" },
        { column: "E" }, { column: "F" },
        { column: "G" }, { column: "H" },
        { column: "I" }, { column: "J" }
    ];
    const gridRows = [
        1, 2,
        3, 4,
        5, 6,
        7, 8,
        9, 10
    ];

    // return grid data array
    const grid = gridRows.map((row) => {
        return gridCols.map((col) => {
            return (
                {
                    gridValue: `${col.column}` + row,
                    rocket: false
                }
            )
        })
    })

    let generateRandomNumber = Math.floor(Math.random() * gridSize);

    // function to generate random locations (x, y values & orientation)
    const generateRandomLocation = () => {
        // Reset the array before populating with new values
        newNPCGridRef.length = 0; 
        // variable to store orientations
        const orientations = ['vertical', 'horizontal'];

        // loop over each rocket object to return random location on grid
        npcRocketData.forEach((rocketObj) => {
            // randomize orientation
            let orientation = orientations[Math.floor(Math.random() * orientations.length)];
            // random x & y values
            let x = generateRandomNumber;
            let y = generateRandomNumber;

            // check if location is valid
            let validRocket = verifyLocation(orientation, x, y, rocketObj, grid);

            // console.log(orientation, x, y, validRocket);

            // if location not valid, find new coordinates:
            while (!validRocket) {
                orientation = orientations[Math.floor(Math.random() * orientations.length)];
                x = Math.floor(Math.random() * gridSize);
                y = Math.floor(Math.random() * gridSize);
                validRocket = verifyLocation(orientation, x, y, rocketObj, grid);
            }

            // if location valid, place ships on grid
            if (validRocket) {
                placeShip(orientation, x, y, grid, rocketObj);

                const valuesArray = rocketObj.NPCGridRef;

                for (let j = 0; j < valuesArray.length; j++) {
                    newNPCGridRef.push(valuesArray[j]);
                }
            }
        });
        // console.log(grid);
        console.log("newNPCGridRef", newNPCGridRef);
        return grid;
    }

    const verifyLocation = (orientation, x, y, rocketObj, grid) => {
        // if orientation is vertical
        if (orientation === 'vertical') {
            // loop over coordinates and check following:
            for (let i = 0; i < rocketObj.spaces; i++) {
                if (
                    // y value not off grid
                    y + i >= gridSize ||
                    // no rocket present
                    grid[y + i][x]?.rocket === true ||
                    // is not undefined
                    grid[y + i][x] === undefined
                ) return false;
            }
        } else if (orientation === 'horizontal') {
            // if orientation is horizontal, loop over coordinates to check:
            for (let i = 0; i < rocketObj.spaces; i++) {
                if (
                    // x value not off grid
                    x + i >= gridSize ||
                    // no rocket present
                    grid[y][x + i]?.rocket === true ||
                    // is not undefined
                    grid[y][x + i] === undefined
                ) return false;
            }
        }
        // if above parameters are met, then return true
        return true;
    };

    const placeShip = (orientation, x, y, grid, rocketObj) => {
        if (orientation === 'vertical') {
            for (let i = 0; i < rocketObj.spaces; i++) {
                grid[y + i][x].rocket = true;
                rocketObj.NPCGridRef.push(grid[y + i][x].gridValue);
            }
        } else if (orientation === 'horizontal') {
            for (let i = 0; i < rocketObj.spaces; i++) {
                grid[y][x + i].rocket = true;
                rocketObj.NPCGridRef.push(grid[y][x + i].gridValue);
            }
        }
        return grid;
    }


    // generateRandomLocation();
    

    return (
        <>
            <BattleGrid 
                handleClick={handleClick}
            />
        </>
    )
}

export const newNPCGridRef = [];
export default GenerateComputerGrid;
