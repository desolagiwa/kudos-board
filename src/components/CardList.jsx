import React from "react";
import Card from './Card'
import '../styles/CardList.css'

const CardList = ({data, fetchBoardData, boardId}) => {
    return (
        <div className="card-list">
            {data.map(card  => (
              <Card title={card.title} description={card.rating} gif={card.gif} upvotes={card.upvotes} id={card.id} fetchBoardData={fetchBoardData} boardId={boardId}/>
            ))}
        </div>
    )
}

export default CardList;
