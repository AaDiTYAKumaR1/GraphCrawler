import { singleCellInterface } from "../Interfaces/types";
import { ImLocation } from "react-icons/im";
import { FaTrophy } from "react-icons/fa";

const Cell = ({
  cell,
  ...props
}: {
  cell: singleCellInterface;
  rowIndex: number;
  colIndex: number;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
  id: string;
}) => {
  return (
    <div {...props} className={`lg:w-6 w-4 lg:h-6 h-4 cell
       hover:bg-gray-400 cursor-pointer inline-flex justify-center
       items-center aspect-square border-[0.1px] border-indigo-300
       ${cell.iswall ? "bg-gray-800" : ""}
      `}>
        {
          cell.isstart ? <ImLocation /> : null
        }
        {
          cell.isend ? <FaTrophy /> : null
        }
      </div>
  );
};

export default Cell;
