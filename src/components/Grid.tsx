import { useEffect, useRef, useState } from "react";
import { getcurrent, getPath } from "../utils/helper";
import { singleCellInterface } from "../Interfaces/types";
import Cell from "./Cell";
import { DFS } from "../algorithms/DFS";
import { BFS } from "../algorithms/BFS";

const Grid = () => {
  const gridBoard = useRef<singleCellInterface[][]>(getcurrent());
  const grid = gridBoard.current;

  const [startPoint, setstartPoint] = useState<singleCellInterface | null>(
    null
  );
  const [endPoint, setendPoint] = useState<singleCellInterface | null>(null);
  const [renderFlag, setrenderFlag] = useState<boolean>(false)
  const [isMouseDown, setIsMouseDown] = useState(false);
  // const [TargetFound, setTargetFound] = useState(false)
  const [foundPath, setfoundPath] = useState<singleCellInterface[] | null>(null)

  const onMouseEnter=(row:number, col:number)=>{
    if(!isMouseDown) return;
    // setrenderFlag(!renderFlag);
    const clickedCell = gridBoard.current[row][col];
    if (!clickedCell.isstart && !clickedCell.isend ) {
      clickedCell.iswall = !clickedCell.iswall;
      setrenderFlag((prev) => !prev);
    }
  }

  const onCellClick = (
    cell: singleCellInterface,
    rowIndex: number,
    colIndex: number
  ) => {
    const clickedCell = gridBoard.current[rowIndex][colIndex];
    if (!startPoint) {
      setstartPoint({
        ...clickedCell,
        isstart: true,
      });
      clickedCell.isstart = true;
      return;
    } else if (!endPoint) {
      setendPoint({
        ...clickedCell,
        isend: true,
      });
      clickedCell.isend = true;
      return;
    } else if (!clickedCell.isstart && !clickedCell.isend) {
      clickedCell.iswall = !clickedCell.iswall;
    }
  };

  const animatePath = (path: singleCellInterface[]) => {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const cell = path[i];
        const item = document.getElementById(`${cell.row}-${cell.col}`);
        item!.className += " cell-path";
        // item?.classList.remove("bg-green-500");
        // item!.className += " bg-gray-500";
      }, 10 * i);
    }
  }
  const animateAlgo = (
    visitedCells: singleCellInterface[],
    path : singleCellInterface[]
  )=>{
    for(let i=0;i<visitedCells.length;i++){
      setTimeout(() => {
        const cell = visitedCells[i];
        const item = document.getElementById(`${cell.row}-${cell.col}`);
        if(cell.isTarget){
          setfoundPath(path)
        }
        item.className += " cell-visited";
        // item!.classList.add("bg-green-500")

      }, 10 * i);
    }
  }
  const handleVisualize = (
    startPoint: singleCellInterface | null,
    endPoint: singleCellInterface | null
  ) => {
    if(!startPoint || !endPoint){
      alert("Please select start and end points")
      return;
    }
    const grid = gridBoard.current;
    const startCell= grid[startPoint.row][startPoint.col];
    const endCell = grid[endPoint.row][endPoint.col];
    let visitedCells: singleCellInterface[] = [];
    visitedCells = BFS(startCell, endCell, grid);
    const path = getPath(endCell);
    // console.log(path)
    animateAlgo(visitedCells,path)
    
  }
  useEffect(() => {
    if (foundPath && startPoint && endPoint) {
      animatePath(foundPath);
    }
  }, [foundPath])
  
  return (
    <div className="p-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg m-2"
        onClick={() => {
          handleVisualize(startPoint, endPoint);
        }}
        >Visualize</button>
      <div
        className="grid "
        style={{
          gridTemplateColumns: "repeat(52, 0fr)",
          display: "grid",
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              id={`${rowIndex}-${colIndex}`}
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              rowIndex={rowIndex}
              colIndex={colIndex}
              onMouseEnter={() => onMouseEnter(rowIndex, colIndex)}
              onMouseDown={() => setIsMouseDown(true)}
              onMouseUp={() => setIsMouseDown(false)}
              onClick={() => {
                onCellClick(cell, rowIndex, colIndex);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Grid;
