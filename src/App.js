import React, {useState} from 'react';
import produce from "immer";

let rowNumber = 25
let colNumber = 25
let cell = {alive: 0, clickable: true, id : null}





const blankGrid = () => {
  let cellCounter = 1
  const rows = []
  for(let i = 0; i < rowNumber; i++){
    rows.push(Array.from(Array(colNumber), () => cell))
  }
  return rows
}

console.log(blankGrid())


function App() {
  const [grid, setGrid] = useState(() => {
    return blankGrid()
  })
  const [simOn, setSetOn] = useState(false);
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
    </div>
  );
}

export default App;
