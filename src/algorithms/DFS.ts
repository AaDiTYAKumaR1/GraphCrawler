import { singleCellInterface } from "../Interfaces/types";

export const DFS = (
  startCell: singleCellInterface,
  endCell: singleCellInterface,
  grid: singleCellInterface[][]
): singleCellInterface[] => {
  const visitedCells: singleCellInterface[] = [];
  const unvisitedCells: singleCellInterface[] = [startCell];

  startCell.isvisited = true;

  while (unvisitedCells.length > 0) {
    const currentCell = unvisitedCells.pop();
    if (!currentCell) {
      return visitedCells;
    }

    const { cellNumber, row, col } = currentCell;

    // Optional: If you want to skip processing the start cell again,
    // this check may or may not be needed.
    // if(cellNumber === startCell.cellNumber && currentCell.isvisited) continue;

    // If we've reached the end cell, add it and return the list.
    if (cellNumber === endCell.cellNumber) {
        endCell.isTarget = true;
      visitedCells.push(currentCell);
      return visitedCells;
    }

    visitedCells.push(currentCell);

    // Check each of the four neighbors and add them if they are valid:
      // DOWN
      if (row + 1 < grid.length && !grid[row + 1][col].isvisited && !grid[row + 1][col].iswall) {
        grid[row + 1][col].isvisited = true;
        grid[row + 1][col].prevCell = currentCell;
        unvisitedCells.push(grid[row + 1][col]);
      }
    // LEFT
    if (col - 1 >= 0 && !grid[row][col - 1].isvisited && !grid[row][col - 1].iswall) {
        grid[row][col - 1].isvisited = true;
        grid[row][col - 1].prevCell = currentCell;
        unvisitedCells.push(grid[row][col - 1]);
    }
    // UP
    if (row - 1 >= 0 && !grid[row - 1][col].isvisited && !grid[row - 1][col].iswall) {
      grid[row - 1][col].isvisited = true;
      grid[row - 1][col].prevCell = currentCell;
      unvisitedCells.push(grid[row - 1][col]);
    }
  
    // RIGHT
    if (col + 1 < grid[0].length && !grid[row][col + 1].isvisited && !grid[row][col + 1].iswall) {
      grid[row][col + 1].isvisited = true;
      grid[row][col + 1].prevCell = currentCell;
      unvisitedCells.push(grid[row][col + 1]);
    }
  }

  return visitedCells;
};
