import { getcurrent } from "../utils/helper";
import { singleCellInterface } from "../Interfaces/types";

const Cell = ({
  cell,
  rowIndex,
  colIndex,
  ...props
}: {
  cell: singleCellInterface;
  rowIndex: number;
  colIndex: number;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
}) => {
  return (
    <div {...props} className={`lg:w-6 w-4 lg:h-6 h-4
       hover:bg-gray-400 cursor-pointer inline-flex justify-center
       items-center aspect-square border-[0.1px] border-indigo-300
       ${cell.isstart ? "bg-green-500" : ""}
       ${cell.isend ? "bg-red-500" : ""}
       ${cell.iswall ? "bg-gray-800" : ""}
      `}></div>
  );
};

export default Cell;
