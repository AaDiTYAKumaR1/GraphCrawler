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
}


export const getcurrent =(
    // grid?: singleCellInterface[][],
) 
: singleCellInterface[][] =>{
    const grid: singleCellInterface[][] = [];
    let cellNumber=0;
    for(let rowInd=0;rowInd<20;rowInd++)
    {
        const currRow: singleCellInterface[] = [];
        for(let colInd =0;colInd<52;colInd++) {
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
