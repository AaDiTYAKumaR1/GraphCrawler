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
}


export const getcurrent =(
    // grid?: singleCellInterface[][],
) 
: singleCellInterface[][] =>{
    const grid: singleCellInterface[][] = [];
    let cellNumber=0;
    for(let rowInd=0;rowInd<20;rowInd++)
    {
        for(let colInd =0;colInd<52;colInd++) {
            grid[rowInd][colInd] ={
                ...singleCell,
                row:rowInd,
                col:colInd,
                cellNumber:cellNumber,
            }
            cellNumber++;
        }
    }
    return grid;
}