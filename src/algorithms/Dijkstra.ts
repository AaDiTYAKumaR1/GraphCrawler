import { singleCellInterface } from "../Interfaces/types";
import { getcells } from "../utils/helper";

// Get the valid four-direction neighbors from the grid.
// Filters out cells that have already been visited.
const getNeighbors = (
  currentCell: singleCellInterface,
  grid: singleCellInterface[][],
): singleCellInterface[] => {
  const neighbors: singleCellInterface[] = [];
  const { col, row } = currentCell;

  // Left neighbor
  if (col > 0) {
    neighbors.push(grid[row][col - 1]);
  }

  // Right neighbor
  if (col < grid[0].length - 1) {
    neighbors.push(grid[row][col + 1]);
  }

  // Top neighbor
  if (row > 0) {
    neighbors.push(grid[row - 1][col]);
  }

  // Bottom neighbor
  if (row < grid.length - 1) {
    neighbors.push(grid[row + 1][col]);
  }

  // Only return neighbors that haven't been visited yet.
  return neighbors.filter((neighbor) => !neighbor.isvisited);
};

// Update each neighbor's distance if a shorter path is found
// This is where the core relaxation step of Dijkstra's algorithm happens.
const traverseFurtherInGrid = (
  currentCell: singleCellInterface,
  grid: singleCellInterface[][],
) => {
  const neighbors = getNeighbors(currentCell, grid);
  for (const neighbor of neighbors) {
    // Since we assume the grid's movement cost is uniform (i.e., 1),
    // the new distance is current cell's distance + 1.
    const newDistance = currentCell.distanceFromStart + 1;
    // Only update if the new distance is shorter than the neighbor's current distance.
    if (newDistance < neighbor.distanceFromStart) {
      neighbor.distanceFromStart = newDistance;
      neighbor.prevCell = currentCell;
    }
  }
};

// Implements Dijkstra's algorithm for grid traversal.
// Returns the order of visited cells. To reconstruct the actual shortest path,
// you can backtrack from the endCell using each cell's `prevCell` pointer.
export const DIJKSTRA = (
  startCell: singleCellInterface,
  endCell: singleCellInterface,
  grid: singleCellInterface[][],
): [singleCellInterface[],TimeTaken: number] => {
  // Get all cells from the grid as unvisited cells.
    const startTime = Date.now();
  const unvisitedCells = getcells(grid);
  // Start with the startCell distance of 0.
  startCell.distanceFromStart = 0;
  // Array to track the order of cells visited by the algorithm.
  const visitedCells: singleCellInterface[] = [];

  while (unvisitedCells.length > 0) {
    // Sort unvisited cells so that the one with the smallest distance comes first.
    unvisitedCells.sort(
      (cellA, cellB) => cellA.distanceFromStart - cellB.distanceFromStart,
    );
    // Remove the cell with the smallest distance.
    const currentCell = unvisitedCells.shift();

    // If no cell is found, break out (shouldn't normally happen).
    if (!currentCell) break;

    // Skip walls.
    if (currentCell.iswall) continue;

    // If the smallest distance remains Infinity, the remaining cells are unreachable.
    if (currentCell.distanceFromStart === Infinity) break;

    // Mark the cell as visited.
    currentCell.isvisited = true;
    visitedCells.push(currentCell);

    // If the target cell is reached, mark it and return the visited order.
    if (currentCell.cellNumber === endCell.cellNumber) {
      currentCell.isTarget = true;
      return [visitedCells, Date.now() - startTime];
    }

    // Relax the neighboring cells (update distances if a shorter path is found).
    traverseFurtherInGrid(currentCell, grid);
  }

  return [visitedCells, Date.now() - startTime];
};
