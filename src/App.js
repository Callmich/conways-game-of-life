import React, {useState, useCallback, useRef} from 'react';
import produce from "immer";


let rowNumber = 25
let colNumber = 25
let id = 0
let cell = {alive: 0, id : id}

const neighbors = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const blankGrid = () => {
  const rows = []
  for(let i = 0; i < rowNumber; i++){
    rows.push(Array.from(Array(colNumber), () => cell))
  }
  return rows
}

console.log(blankGrid())

const runIt = (oldGrid) => {
  console.log("og1", oldGrid)
  return produce(oldGrid, (copy) => {
    console.log(oldGrid)
    for(let i = 0; i < rowNumber; i++){
      for (let m = 0; m < colNumber; m++){
        let simCount = 0
        neighbors.forEach(([x,y]) => {
          const newI = i + x
          const newM = m + y
          if (newI >= 0 && newI < rowNumber && newM >= 0 && newM < colNumber){
            simCount += (oldGrid[newI][newM]).alive
          }
        })
        console.log("simcount",i,m,simCount)
        if(oldGrid[i][m].alive == 0 && simCount == 3){
          copy[i][m].alive = 1
        }else if(simCount < 2 || simCount > 3){
          copy[i][m].alive = 0
        }else{
          copy[i][m] = oldGrid[i][m]
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
  const [faster, setFaster] = useState(false);
  const [size, setSize] = useState({colNumber: 10, rowNumber: 10})
  let cell = {alive: 0, id : id}

  const runningRef = useRef(simOn);
  runningRef.current = simOn;

  const runSimulation = useCallback(() => {
    console.log('running sim')
    if (!runningRef.current) {
      return;
    }
    setGrid((oldGrid) => {
      return runIt(oldGrid);
    });

    setTimeout(runSimulation, faster ? 300 : 1000);
  }, [faster]);
 

  const resizeGrid = () => {
    const rows = []
    for(let i = 0; i < size.rowNumber; i++){
      rows.push(Array.from(Array(size.colNumber), () => cell))
    }
    return rows
  }
 

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
                    if(copy[i][m].alive === 0){
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
          if (!simOn){
            runningRef.current = true
            runSimulation()
          }
          
        }}
      >
        Run Program
      </button>
      <button
        onClick={() => {
          setSimOn(false);
        }}
      >
        stop Program
      </button>
      <button
        onClick={() => {
          setFaster(true);
        }}
      >
        LightSpeed
      </button>
      <button
        onClick={() => {
          setFaster(false);
        }}
      >
        Slow it down
      </button>
      <button
        onClick={() => {
          setGrid(blankGrid());
        }}
      >
        Clear
      </button>
      <button
        onClick={() => {
          setGrid(resizeGrid());
        }}
      >
        Make Grid bigger
      </button>
      
    </div>
  );
}

export default App;


