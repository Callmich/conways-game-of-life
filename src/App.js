import React, {useState} from 'react';

let rowNumber = 25
let colNumber = 25
let cell = {alive: 0, clickable: true}



const newGrid = () => {
  const rows = []
  for(let i = 0; i < rowNumber; i++){
    rows.push(Array.from(Array(colNumber), () => cell))
  }
  return rows
}

console.log(newGrid())


function App() {
  return (
    <div>
      <h1> Conways's Game of Life </h1>
    </div>
  );
}

export default App;
