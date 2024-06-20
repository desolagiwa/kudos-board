import React from "react";
import { useState } from "react";
import Board from "./Board";
import './styles/BoardList.css'


const BoardList = (props) => {
    return (
        <div className="board-list">
            <Board title="Board 1" author="Me" description="Board 1 description" image ="" category="Thank You"/>
            <Board title="Board 2" author="Me" description="Board 2 description" image ="" category="Celebration"/>
            <Board title="Board 3" author="Me" description="Board 3 description" image ="" category="Inspiration"/>
            <Board title="Board 4" author="Me" description="Board 4 description" image ="" category="Thank You"/>
        </div>
    )
}

export default BoardList;
