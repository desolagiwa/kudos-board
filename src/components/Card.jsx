import React from "react";

const Card = (props) => {
    return (
        <div className="card">
            <div className='title'>{props.title}</div>
            <img className='gif' src={props.gif} />
            <div className='description'>{props.description}</div>
            <div className='upvotes'>{props.upvotes}</div>
        </div>
    )
}

export default Card;
