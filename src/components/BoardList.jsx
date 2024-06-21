import React from "react";
import { useState } from "react";
import Board from "./Board";
import '../styles/BoardList.css'


const BoardList = (props) => {
    const data = props.data
    return (
        <div className="board-list">
            {data.map(board  => (
              <Board title={board.title} description={board.rating} image={board.image} author={board.author} id={board.id}/>
            ))}
        </div>
    )
}

export default BoardList;
