import { singleCellInterface } from "../Interfaces/types";

export const BFS = (
    startCell:singleCellInterface,
    endCell:singleCellInterface,
    grid:singleCellInterface[][]
): singleCellInterface[] => {
    const visitedCells : singleCellInterface[] = [];
    const queue : singleCellInterface[] = [startCell];
    startCell.isvisited = true;
    while(queue.length > 0) {
        const currentCell = queue.shift();
        if(!currentCell) {
            return visitedCells;
        }
        visitedCells.push(currentCell);
        const { cellNumber, row, col } = currentCell;
        if(cellNumber === endCell.cellNumber) {
            endCell.isTarget = true;
            return visitedCells;
        }
        // Check each of the four neighbors and add them if they are valid:
        // DOWN
        if(row + 1 < grid.length && !grid[row + 1][col].isvisited && !grid[row + 1][col].iswall) {
            grid[row + 1][col].isvisited = true;
            grid[row + 1][col].prevCell = currentCell;
            queue.push(grid[row + 1][col]);
        }
        // LEFT
        if(col - 1 >= 0 && !grid[row][col - 1].isvisited && !grid[row][col - 1].iswall) {
            grid[row][col - 1].isvisited = true;
            grid[row][col - 1].prevCell = currentCell;
            queue.push(grid[row][col - 1]);
        }
        // UP
        if(row - 1 >= 0 && !grid[row - 1][col].isvisited && !grid[row - 1][col].iswall) {
            grid[row - 1][col].isvisited = true;
            grid[row - 1][col].prevCell = currentCell;
            queue.push(grid[row - 1][col]);
        }
        // RIGHT
        if(col + 1 < grid[0].length && !grid[row][col + 1].isvisited && !grid[row][col + 1].iswall) {
            grid[row][col + 1].isvisited = true;
            grid[row][col + 1].prevCell = currentCell;
            queue.push(grid[row][col + 1]);
        }
    }
    return visitedCells;
}