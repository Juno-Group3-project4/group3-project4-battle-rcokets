
// Grid Data for Cells in Each Column

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
const gridData = gridRows.map((row) => {
    return gridCols.map((col, index) => {
        return (
            {
                id: `${col.column}` + row,
                className: 'gridCell',
                x_value: `${index + 1}`,
                y_value: `${row}`
            }
        )
    })
})

export default gridData;
