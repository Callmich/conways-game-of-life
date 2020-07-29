import React, {useState} from 'react';
import produce from "immer";

let rowNumber = 25
let colNumber = 25
let id = 0
let cell = {alive: 0, clickable: true, id : id}

const neighbors = [
  [1,-1],
  [1,0],
  [1,1],
  [-1,-1],
  [-1,0],
  [-1,1],
  [0,-1],
  [0,1],
];

const blankGrid = () => {
  const rows = []
  for(let i = 0; i < rowNumber; i++){
    rows.push(Array.from(Array(colNumber), () => cell))
  }
  return rows
}

console.log(blankGrid())

const simulation = (oldGrid) => {
  return produce(oldGrid, (copy) => {
    for(let i = 0; i < rowNumber; i++){
      for (let m = 0; m < colNumber; m++){
        let simCount = 0
        neighbors.forEach(([x,y]) => {
          let newI = i + x
          let newM = m + y
          if (newI > 0 && newI < rowNumber && newM >= 0 && newM < colNumber){
            console.log(oldGrid[newI][newM].alive)
          }
        })
        if (simCount < 2 || simCount > 3){
          copy[i][m].alive = 0
        } 
        else if(oldGrid[i][m].alive === 0 && simCount === 3){
          copy[i][m].alive = 1
        }
      }
    }
  })
}


function App() {
  const [grid, setGrid] = useState(() => {
    return blankGrid()
  })
  const [simOn, setSimOn] = useState(false);
  return (
    <div>
      <div>
        <h1>Conway's Game of Life</h1>
      </div>
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${colNumber},30px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((columns, m) => (
            <div
              key={`${i}-${m}`}
              onClick={() => {
                if (!simOn) {
                  const newGrid = produce(grid, (copy) => {
                    if(copy[i][m].alive == 0){
                      copy[i][m].alive = 1
                    }
                    else{
                      copy[i][m].alive = 0
                    }
                  });
                  setGrid(newGrid);
                  console.log(newGrid)
                } else {
                  return null;
                }
              }}
              style={{
                width: 30,
                height: 30,
                backgroundColor: grid[i][m].alive ? "red" : "black",
                border: "dotted 1px white",
              }}
            ></div>
          ))
        )}
      </div>
      <button
        onClick={() => {
          setSimOn(true);
          if (simOn == false){
            simulation()
          }
          else{
            simOn(false)
          }
        }}
      >
        Run Program
      </button>
    </div>
  );
}

export default App;
