import { useEffect, useRef, useState } from "react";
import { getcurrent, getPath } from "../utils/helper";
import { Algorithm, singleCellInterface } from "../Interfaces/types";
import Cell from "./Cell";
import { DFS } from "../algorithms/DFS";
import { BFS } from "../algorithms/BFS";
import { DIJKSTRA } from "../algorithms/Dijkstra";
const Grid = () => {
  const gridBoard = useRef<singleCellInterface[][]>(getcurrent());
  const grid = gridBoard.current;

  const [startPoint, setstartPoint] = useState<singleCellInterface | null>(
    null
  );
  const [endPoint, setendPoint] = useState<singleCellInterface | null>(null);
  const [, setrenderFlag] = useState<boolean>(false);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [foundPath, setfoundPath] = useState<singleCellInterface[] | null>(
    null
  );
  const [Algo, setAlgo] = useState<Algorithm | null>(null);
  const [currSpeed, setcurrSpeed] = useState<"slow" | "medium" | "fast">(
    "medium"
  );
  const [cellScanned, setcellScanned] = useState<number>(0);
  const [timeTaken, settimeTaken] = useState<number>(0);
  const [pathLength, setpathLength] = useState<number>(0);

  const getcurrentSpeed = () => {
    switch (currSpeed) {
      case "slow":
        return 100;
      case "medium":
        return 50;
      case "fast":
        return 10;
    }
  };

  const onMouseEnter = (row: number, col: number) => {
    if (!isMouseDown) return;
    // setrenderFlag(!renderFlag);
    const clickedCell = gridBoard.current[row][col];
    if (!clickedCell.isstart && !clickedCell.isend) {
      clickedCell.iswall = !clickedCell.iswall;
      setrenderFlag((prev) => !prev);
    }
  };

  const onCellClick = (
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
    if (startPoint && clickedCell.cellNumber === startPoint.cellNumber) {
      clickedCell.isstart = false;
      setstartPoint(null);
    }
    if (endPoint && clickedCell.cellNumber === endPoint.cellNumber) {
      clickedCell.isend = false;
      setendPoint(null);
    }
  };

  const animatePath = (path: singleCellInterface[]) => {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const cell = path[i];
        const item = document.getElementById(`${cell.row}-${cell.col}`);
        item!.className += " cell-path";
      }, 10 * i);
    }
  };
  const animateAlgo = (
    visitedCells: singleCellInterface[],
    path: singleCellInterface[]
  ) => {
    for (let i = 0; i < visitedCells.length; i++) {
      setTimeout(() => {
        const cell = visitedCells[i];
        const item = document.getElementById(`${cell.row}-${cell.col}`);
        if (cell.isTarget) {
          setfoundPath(path);
        }
        item!.className += " cell-visited";
        // item!.classList.add("bg-green-500")
      }, (getcurrentSpeed() || 10) * i);
    }
  };
  const handleVisualize = (
    startPoint: singleCellInterface | null,
    endPoint: singleCellInterface | null
  ) => {
    if (!Algo) {
      alert("Please select an algorithm first");
      return;
    }
    if (!startPoint || !endPoint) {
      alert("Please select start and end points");
      return;
    }
    const grid = gridBoard.current;
    let TimeTaken = 0;
    const startCell = grid[startPoint.row][startPoint.col];
    const endCell = grid[endPoint.row][endPoint.col];
    let visitedCells: singleCellInterface[] = [];
    switch (Algo) {
      case Algorithm.DFS:
        [visitedCells, TimeTaken] = DFS(startCell, endCell, grid);
        break;
      case Algorithm.BFS:
        [visitedCells, TimeTaken] = BFS(startCell, endCell, grid);
        break;
      case Algorithm.DIJKSTRA:
        [visitedCells, TimeTaken] = DIJKSTRA(startCell, endCell, grid);
        break;
    }
    const path = getPath(endCell);
    animateAlgo(visitedCells, path);
    setcellScanned(visitedCells.length);
    settimeTaken(TimeTaken);
    setpathLength(path.length);
  };
  useEffect(() => {
    if (foundPath && startPoint && endPoint) {
      animatePath(foundPath);
    }
  }, [foundPath]);

  const resetBoard = () => {
    document.querySelectorAll(".cell").forEach((cell) => {
      if (cell.classList.contains("cell-visited")) {
        cell.classList.remove("cell-visited");
      }
      if (cell.classList.contains("cell-path")) {
        cell.classList.remove("cell-path");
      }
    });
  };
  const clearGrid = () => {
    gridBoard.current = getcurrent(true, gridBoard.current);
    resetBoard();
  };

  return (
    <div className="lg:p-4 ">
      <div className=" p-4 bg-indigo-100 rounded-lg mb-4">
        <h1 className="text-2xl text-center font-bold mb-4">GraphCrawler</h1>
        <div className="flex lg:flex-row flex-col justify-center items-center mb-4">
          <select
            value={Algo || ""}
            onChange={(e) => setAlgo(e.target.value as Algorithm)}
            className="flex cursor-pointer  appearance-none lg:w-[50%] w-[70%] bg-gray-100 border border-gray-200 text-gray-700 py-3 lg:px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option className="hidden" defaultChecked value="">
              Select Algorithm
            </option>
            <option value="DFS">DFS</option>
            <option value="BFS">BFS</option>
            <option value="DIJKSTRA">DIJKSTRA</option>
          </select>
          <div className="flex md:flex-row flex-col ">
            <button
              className="bg-blue-800 cursor-pointer text-white px-4 py-2 rounded-lg m-2"
              onClick={() => {
                handleVisualize(startPoint, endPoint);
              }}
            >
              {Algo ? (
                <span className="flex items-center gap-2">
                  Visualize {Algo}
                </span>
              ) : (
                <span className="flex items-center gap-2">Select Algo </span>
              )}
            </button>
            <button
              onClick={() => clearGrid()}
              className=" cursor-pointer bg-red-500 text-white lg:px-4 py-2 rounded-lg m-2"
            >
              Clear
            </button>
            <button
              className=" cursor-pointer bg-green-500 text-white px-4 py-2 rounded-lg m-2"
              onClick={() => {
                return currSpeed === "fast"
                  ? setcurrSpeed("medium")
                  : currSpeed === "medium"
                  ? setcurrSpeed("slow")
                  : setcurrSpeed("fast");
              }}
            >
              Speed : {currSpeed}
            </button>
          </div>
        </div>
        <div className="flex justify-center md:flex-row flex-col ">
          <button className=" cursor-pointer bg-indigo-500 text-white px-4 py-2 rounded-lg m-2">
            Time Taken : {timeTaken}.00 ms
          </button>
          <button className=" cursor-pointer bg-indigo-500 text-white px-4 py-2 rounded-lg m-2">
            cell scanned : {cellScanned}
          </button>
          <button className=" cursor-pointer bg-indigo-500 text-white px-4 py-2 rounded-lg m-2">
            path length : {pathLength}
          </button>
          <a
            href="https://github.com/Addii155/GraphCrawler"
            target="_blank"
            className="  disabled:bg-gray-400  disabled:cursor-not-allowed inline-flex bg-gray-600 px-4 py-2 text-[15px] text-white items-center  rounded-md"
          >
            <img src="/assets/github.png" className="h-[18px] w-[18px] mr-2 " />{" "}
            Source code
          </a>
        </div>
      </div>
      <div
        className="flex justify-center "
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
                onCellClick(rowIndex, colIndex);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Grid;
