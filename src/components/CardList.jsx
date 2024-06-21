import React from "react";
import Card from './Card'

const CardList = (props) => {
    const data = props.data
    return (
        <div className="card-list">
            {data.map(card  => (
              <Card title={card.title} description={card.rating} gif={card.gif} upvotes={card.upvotes} id={card.id}/>
            ))}
        </div>
    )
}

export default CardList;
