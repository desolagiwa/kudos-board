import React from "react";
import { useState } from "react";
import Board from "./Board";
import '../styles/BoardList.css'


const BoardList = ({data, fetchBoardList}) => {
    const [boards, setBoards] = useState([])

    return (
        <div className="board-list">
            {data.map(board  => (
              <Board key={board.id} title={board.title} description={board.description} image={board.image} author={board.author} id={board.id} fetchBoardList={fetchBoardList}/>
            ))}
        </div>
    )
}

export default BoardList;
