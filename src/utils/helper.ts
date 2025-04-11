import { singleCellInterface } from "../Interfaces/types";

export const singleCell: singleCellInterface = {
    row: 0,
    col: 0,
    iswall: false,
    isvisited: false,
    isstart: false,
    isend: false,
    ispath: false,
    pathsum: Infinity,
    cellNumber: 0,
    prevCell : null,
    isTarget: false,
    distanceFromStart: Infinity,
}


export const getcurrent =(
    isResest: boolean = false,
    gridCell?: singleCellInterface[][],
) 
: singleCellInterface[][] =>{
    const grid: singleCellInterface[][] = gridCell || [] ;
    let cellNumber=0;
    for(let rowInd=0;rowInd<20;rowInd++)
    {
        const currRow: singleCellInterface[] = [];
        for(let colInd =0;colInd<52;colInd++) {
            if (isResest && grid) {
                grid[rowInd][colInd].iswall = false;
                grid[rowInd][colInd].isvisited = false;
                grid[rowInd][colInd].ispath = false;
                grid[rowInd][colInd].pathsum = Infinity;
                grid[rowInd][colInd].prevCell = null;
                grid[rowInd][colInd].isTarget = false;
                grid[rowInd][colInd].cellNumber = cellNumber;
                grid[rowInd][colInd].row = rowInd;
                grid[rowInd][colInd].col = colInd;
                grid[rowInd][colInd].distanceFromStart = Infinity;
                cellNumber++;
                continue;
            }
            currRow.push({
                ...singleCell,
                row:rowInd,
                col:colInd,
                cellNumber:cellNumber,
            })
            cellNumber++;
        }
        grid.push(currRow);
    }
    return grid;
}

export const  getPath = (endCell: singleCellInterface): singleCellInterface[] => {
    const path : singleCellInterface[] = getShortestPath(endCell) || null;
    return path;
}

const getShortestPath = (endCell: singleCellInterface): singleCellInterface[] => {
    const pathCell = [];
    let currentCell: singleCellInterface | null = endCell;
    while (currentCell) {
        pathCell.push(currentCell);
        currentCell = currentCell.prevCell;
    }
    return pathCell;    
}

export const getcells=( grid : singleCellInterface[][]) : singleCellInterface[] => {
    const cellArray : singleCellInterface[] = [] ;
    [...grid].forEach((row)=>{
        [...row].forEach((cell)=>{
            cellArray.push(cell);
        })
    })
    return cellArray;
}