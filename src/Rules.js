import React from "react";
import './App.css';

export default function Rules(){


    return (
        <div>
            <div>
                <h2>Rules for COnways Game of life</h2>
                <h4>Any live cell with two or three live neighbours survives</h4>
                <h4>Any dead cell with three live neighbours becomes a live cell</h4>
                <h4>All other live cells die in the next generation. Similarly, all other dead cells stay dead</h4>
            </div>
        </div>
    )
}