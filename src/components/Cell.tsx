import { getcurrent } from "../utils/helper";
import { singleCellInterface } from "../Interfaces/types";


const Cell = () => {
    let grid : singleCellInterface[][] =    getcurrent()
  return (
    <div className="w-4 h-4"
    >Cell</div>
  )
}

export default Cell