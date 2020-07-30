import React, {useState, useCallback, useRef} from 'react';
import produce from "immer";
import Rules from "./Rules";
import './App.css'


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

const randomGrid = () => {
  const rows = []
  for(let i = 0; i < rowNumber; i++){
    rows.push(Array.from(Array(colNumber), () => ({alive: Math.round(Math.random())})))
  }
  return rows
}

// console.log(blankGrid())




function App() {
  let rowNumber = 25
  let colNumber = 25
  const [grid, setGrid] = useState(() => {
    return blankGrid()
  })
  let count = 0
  const [simOn, setSimOn] = useState(false);
  const [faster, setFaster] = useState(false);
  const [size, setSize] = useState({rowNumber: 10, colNumber: 10})
  const [changeGridSize, setChangeGridSize] = useState(false);
  const [genCounter, setGenCounter] = useState(count)
  let cell = {alive: 0, id : id}
  
  const runningRef = useRef(simOn);
  runningRef.current = simOn;

  const runIt = (oldGrid) => {
    // console.log("CGS",changeGridSize)
    // console.log("faster", faster)
    if(!changeGridSize){
      // console.log("og1", oldGrid)
      return produce(oldGrid, (copy) => {
        // console.log(oldGrid)
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
            // console.log("simcount!!!!!!",i,m,simCount)
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
      // console.log("og1", oldGrid)
      return produce(oldGrid, (copy) => {
        // console.log(oldGrid)
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
            // console.log("simcount",i,m,simCount)
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
    // console.log('running sim')
    if (!runningRef.current) {
      return;
    }
    setGrid((oldGrid) => {
      return runIt(oldGrid);
    });
    // console.log(genCounter)
    count = count + 1
    setGenCounter(count)

    setTimeout(runSimulation, faster ? 300 : 1000);
  }, [faster]);

 

  return (
    <div class="flex">
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
                // console.log(changeGridSize)
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
                  // console.log(newGrid)
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
        <p>Generation: {genCounter}</p>
      </div>

      <button
        class="buttons"
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
        class="buttons"
        onClick={() => {
          setSimOn(false);
        }}
      >
        Stop Program
      </button>

      <button
        class="buttons"
        onClick={() => {
          setFaster(true);
        }}
        
      >
        LightSpeed
      </button>

      <button
        class="buttons"
        onClick={() => {
          setFaster(false);
        }}
      >
        Slow It Down
      </button>

      <button
        class="buttons"
        onClick={() => {
          setChangeGridSize(false)
          setFaster(!faster)
          setGrid(blankGrid());
          
        }}
      >
        Clear
      </button>

      <button
        class="buttons"
        onClick={() => {
          const rows = []
          for(let i = 0; i < size.rowNumber; i++){
            rows.push(Array.from(Array(size.colNumber), () => cell))}
          //   console.log("R#", size.rowNumber, "C#", size.colNumber)
          //   console.log(rows)
          // console.log("before",changeGridSize)
          setGrid(rows)
          setChangeGridSize(true)
          setFaster(true)
          // console.log("after",changeGridSize)
        }}
      >
        Shrink to 10x10
      </button>

      <button
      class="buttons"
        onClick={() => {
          setChangeGridSize(false)
          setFaster(!faster)
          setGrid(randomGrid());
        }}
      >
        Random Grid
      </button>
    </div>
    <div class="Rules">
      <Rules />
    </div>
    </div>
  );
}

export default App;


