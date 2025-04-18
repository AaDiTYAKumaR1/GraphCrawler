

 
export interface singleCellInterface{
    row: number;
    col:number;
    iswall: boolean;
    isvisited: boolean;
    isstart: boolean;
    isend: boolean;
    ispath: boolean;
    pathsum: number;
    cellNumber: number;
    prevCell: singleCellInterface | null;
    isTarget:boolean;
    distanceFromStart: number;
}
export
 enum Algorithm {
    DFS = "DFS",
    BFS = "BFS",
    DIJKSTRA = "DIJKSTRA",
}