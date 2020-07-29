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




function App() {
  let rowNumber = 25
  let colNumber = 25
  const [grid, setGrid] = useState(() => {
    return blankGrid()
  })
  
  const [simOn, setSimOn] = useState(false);
  const [faster, setFaster] = useState(false);
  const [size, setSize] = useState({rowNumber: 11, colNumber: 10})
  const [changeGridSize, setChangeGridSize] = useState(false);
  let cell = {alive: 0, id : id}

  const runningRef = useRef(simOn);
  runningRef.current = simOn;

  const runIt = (oldGrid) => {
    console.log("CGS",changeGridSize)
    console.log("faster", faster)
    if(!changeGridSize){
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
            console.log("simcount!!!!!!",i,m,simCount)
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
    }else if (changeGridSize){
      console.log("og1", oldGrid)
      return produce(oldGrid, (copy) => {
        console.log(oldGrid)
        for(let i = 0; i < size.rowNumber; i++){
          for (let m = 0; m < size.colNumber; m++){
            let simCount = 0
            neighbors.forEach(([x,y]) => {
              const newI = i + x
              const newM = m + y
              if (newI >= 0 && newI < size.rowNumber && newM >= 0 && newM < size.colNumber){
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
  }

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

 

  return (
    <div>
      <div>
        <h1>Conway's Game of Life</h1>
      </div>
      <div
        className="grid"
        style={!changeGridSize ? {
          display: "grid",
          gridTemplateColumns: `repeat(${colNumber},30px)`,
        } : {display: "grid",
        gridTemplateColumns: `repeat(${size.colNumber},30px)`,}}
      >
        {grid.map((rows, k) =>
          rows.map((columns, e) => (
            <div
              key={`${k}-${e}`}
              onClick={() => {
                console.log(changeGridSize)
                if (!simOn) {
                  const newGrid = produce(grid, (copy) => {
                    if(copy[k][e].alive === 0){
                      copy[k][e].alive = 1
                    }
                    else{
                      copy[k][e].alive = 0
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
                backgroundColor: grid[k][e].alive ? "red" : "black",
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
          const rows = []
          for(let i = 0; i < size.rowNumber; i++){
            rows.push(Array.from(Array(size.colNumber), () => cell))}
            console.log("R#", size.rowNumber, "C#", size.colNumber)
            console.log(rows)
          console.log("before",changeGridSize)
          setGrid(rows)
          setChangeGridSize(true)
          setFaster(true)
          console.log("after",changeGridSize)
        }}
      >
        Make Grid bigger
      </button>
      
    </div>
  );
}

export default App;


