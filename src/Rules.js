import React from "react";
import './App.css';

export default function Rules(){


    return (
        <div>
            <div>
                <h1>Rules For Conway's Game Of life</h1>
                <h3>When live (red cells) are on the page and the game is run - those cells will follow the below
                    <br/> rules and repeat over and over until there are no cells or the rules will allow no other changes.</h3>
                <h4>1. Any live cell with two or three live neighbours survives</h4>
                <h4>2. Any dead cell with three live neighbours becomes a live cell</h4>
                <h4>3. All other live cells die in the next generation. Similarly, all other dead cells stay dead</h4>
            </div>
            <br/>
            <div>
                <h2>How To Play</h2>
                <h4>-To shrink the grid down to 10x10 click the Shrink to 10x10 button</h4>
                <h4>-While the game is not playing you can click on the black cells to turn them alive</h4>
                <h4>-After setting a patern you like click the Run Program button</h4>
                <h4>-Click the Stop Program button to stop the growth algorithm</h4>
                <h4>-While the game is stopped you can choose between two speeds with the Lightspeed and Slow It Down buttons.</h4>
                <h4>-To reset the grid to a blank 25x25 grid click the Clear button</h4>
                <h4>-To create a random pattern on the 25x25 grid click the Random Grid button</h4>
            </div>
            <br/>
            <div>
                <h2>How Does It Work?</h2>
                <h4>This game runs with an algorithm that takes the previous version the current display of the grid and applies the<br/> rules to create a new grid which is displayed. That new grid is then put through the algorithm and the process<br/> is repeated until the program is stopped.</h4>
            </div>
        </div>
    )
}